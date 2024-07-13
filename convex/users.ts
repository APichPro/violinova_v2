import { ConvexError, v } from "convex/values";
import { internalMutation, MutationCtx, query, QueryCtx } from "./_generated/server";
import { getUserId } from "./util";

export const getUserById = query({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), args.clerkId))
      .unique();

    if (!user) {
      throw new ConvexError("User not found");
    }

    return user;
  },
});

export function getFullUser(ctx: QueryCtx | MutationCtx, userId: string) {
  return ctx.db
    .query("users")
    .withIndex("by_clerkId", (q) => q.eq("clerkId", userId))
    .first();
}

export const isUserSubscribed = async (ctx: QueryCtx | MutationCtx) => {
  const userId = await getUserId(ctx);

  if (!userId) {
    return false;
  }

  const userToCheck = await getFullUser(ctx, userId );

  return (userToCheck?.endsOn ?? 0) > Date.now();
};

export const getSubscriptionByClerkId = query({
  args: { clerkId: v.string() },
  handler: async (ctx, args) : Promise<{ subscriptionId: string | undefined, endsOn: number | undefined, plan: string | undefined, customerId: string | undefined} | null | undefined> =>
  {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), args.clerkId))
      .first();

    if (!user) {
      return null;
    }

    return {
      subscriptionId: user.subscriptionId,
      endsOn: user.endsOn,
      plan: user.plan,
      customerId: user.customerId,
    };
  },
});

export const updateSubscription = internalMutation({
  args: {
    subscriptionId: v.optional(v.string()),
    userId: v.string(),
    endsOn: v.number(),
    plan: v.string(),
    customerId: v.optional(v.string())
  },
  handler: async (ctx, args) => {
    const user = await getFullUser(ctx, args.userId);

    if (!user) {
      throw new Error("no user found with that user id");
    }

    await ctx.db.patch(user._id, {
      subscriptionId: args.subscriptionId,
      endsOn: args.endsOn,
      plan: args.plan,
      customerId: args.customerId,
    });
  },
});

export const updateSubscriptionBySubId = internalMutation({
  args: {
    subscriptionId: v.optional(v.string()),
    endsOn: v.optional(v.number()),
    customerId: v.optional(v.string()),
    plan: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_subscriptionId", (q) =>
        q.eq("subscriptionId", args.subscriptionId)
      )
      .first();

    if (!user) {
      throw new Error("no user found with that user id");
    }

    await ctx.db.patch(user._id, {
      subscriptionId: args.subscriptionId,
      endsOn: args.endsOn,
      customerId: args.customerId,
      plan: args.plan,
    });
  },
});


export const createUser = internalMutation({
  args: {
    email: v.string(),
    clerkId: v.string(),
    name: v.string(),
    subscription: v.optional(v.string()),
    phone: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
  }, handler: async(ctx, args) => {
    await ctx.db.insert("users", {
      email: args.email,
      clerkId: args.clerkId,
      name: args.name,
      phone: args.phone,
      imageUrl: args.imageUrl,
      stared: []
    })
  }
})

export const updateUser = internalMutation({
  args: {
    clerkId: v.string(),
    imageUrl: v.string(),
    email: v.string(),
  },
  async handler(ctx, args) {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), args.clerkId))
      .unique();

    if (!user) {
      throw new ConvexError("User not found");
    }

    await ctx.db.patch(user._id, {
      imageUrl: args.imageUrl,
      email: args.email,
    });
  },
});

export const deleteUser = internalMutation({
  args: { clerkId: v.string() },
  async handler(ctx, args) {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), args.clerkId))
      .unique();

    if (!user) {
      throw new ConvexError("User not found");
    }

    await ctx.db.delete(user._id);
  },
});


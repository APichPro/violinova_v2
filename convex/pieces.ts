import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getPieceById = query({
  args: { _id: v.string() },
  handler: async (ctx, args) => {
    const piece = await ctx.db
      .query("pieces")
      .filter((q) => q.eq(q.field("_id"), args._id))
      .unique();

    if (!piece) {
      throw new ConvexError("Piece not found");
    }

    return piece;
  },
});

export const getAllPieces = query({
  handler: async (ctx) => {
    return await ctx.db.query("pieces").collect();
  },
});

export const publishPiece = mutation({
  args: { 
    title: v.string(),
    description: v.string(),
    abc: v.string(),
    private: v.boolean(), 
  },
  handler: async (ctx, args) => {
    const identity  = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("You must be logged in to publish!");
    }

    if (!identity.emailVerified) {
      throw new Error("You must have a verified email to publish!");
    }

    // if (!args.plan) {
    //   throw new Error("You must provide a plan to publish to!");
    // }

    const user = await ctx.db
    .query("users")
    .filter((q) => q.eq(q.field("email"), identity.email))
    .collect();

    if (user.length === 0) {
      throw new ConvexError("User not found");
    }

    return await ctx.db.insert("pieces", {
      user: user[0]._id,
      title: args.title,
      description: args.description,
      abc: args.abc,
      subscriptionLevel: 0,
      audioDuration: 3,
      difficulty:0,
      views: 0,
      stared: 0,
      private: args.private,
    });
   
  },
});
import { ConvexError, v } from "convex/values";
import { internalMutation, query } from "./_generated/server";

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
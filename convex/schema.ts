import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema ({
  pieces: defineTable({
    user: v.id("users"),
    title: v.string(),
    description: v.string(),
    abc: v.string(),
    subscriptionLevel: v.string(),
    audioUrl: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    audioStorageId: v.optional(v.id("_storage")),
    imageStorageId: v.optional(v.id("_storage")),
    audioDuration: v.number(),
    difficulty: v.string(),
    views: v.number(),
  })
  .searchIndex("search_user", {searchField: "user"})
  .searchIndex("search_title", {searchField: "title"})
  .searchIndex("search_difficulty", {searchField: "difficulty"}),
  users: defineTable({
    email: v.string(),
    clerkId: v.string(),
    name: v.string(),
    phone: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    subscription: v.optional(v.string()),
  })
})
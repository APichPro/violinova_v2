import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema ({
  pieces: defineTable({
    user: v.id('users'),
    title: v.string(),
    description: v.string(),
    abc: v.string(),
    subscriptionLevel: v.number(),
    audioUrl: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    audioStorageId: v.optional(v.id("_storage")),
    imageStorageId: v.optional(v.id("_storage")),
    audioDuration: v.number(),
    difficulty: v.number(),
    views: v.number(),
    stared: v.number(),
  })
  .searchIndex("search_title", {searchField: "title"})
  .searchIndex("search_difficulty", {searchField: "difficulty"}),
  users: defineTable({
    email: v.string(),
    clerkId: v.string(),
    name: v.string(),
    phone: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    subscriptionId: v.optional(v.string()),
    customerId: v.optional(v.string()),
    endsOn: v.optional(v.number()),
    plan: v.optional(v.string()),
    stared: v.optional(v.array(v.id("pieces")))
  })
  .index("by_clerkId", ["clerkId"])
  .index("by_subscriptionId", ["subscriptionId"]),
  courses: defineTable({
    title: v.string(),
    content: v.string(),
    subscriptionLevel: v.string(),
    difficulty: v.string(),
    views: v.number(),
    related: v.array(v.id("pieces")),
    stared: v.number(),
  }),
  notes: defineTable({
    user: v.array(v.id("users")),
    date: v.string(),
    content: v.string(),
    views: v.number(),
    related: v.array(v.id("pieces")),
    stared: v.number(),
  }),
  payments: defineTable({
    stripeId: v.optional(v.string()),
    customerId: v.optional(v.string()),
    userId: v.optional(v.string()),
  }).index("stripeId", ["stripeId"]),
})
import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

const schema = defineSchema({
  ...authTables,
  design: defineTable({
    title: v.string(),
    userId: v.string(),
    json: v.any(),
    height: v.float64(),
    width: v.float64(),
    thumbnailUrl: v.optional(v.string()),
    isTemplate: v.boolean(),
    category: v.string(),
    isPro: v.boolean(),
  }),
  images: defineTable({
    userId: v.string(),
    images: v.array(v.string()),
  }),
});

export default schema;

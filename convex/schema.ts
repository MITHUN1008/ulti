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
    category: v.string(),
    isPro: v.boolean(),
<<<<<<< HEAD
    published: v.boolean(),
=======
    published: v.optional(v.boolean()),
>>>>>>> 07eb10da9bf9fb4e10a3f252977cdd3d721286f1
  }),
  images: defineTable({
    userId: v.string(),
    images: v.array(v.string()),
  }),
});

export default schema;

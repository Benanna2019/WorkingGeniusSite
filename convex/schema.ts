import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

export default defineSchema({
  ...authTables,
  users: defineTable({
    name: v.optional(v.string()),
    image: v.optional(v.string()),
    email: v.optional(v.string()),
    emailVerificationTime: v.optional(v.number()),
    phone: v.optional(v.string()),
    phoneVerificationTime: v.optional(v.number()),
    isAnonymous: v.optional(v.boolean()),
    role: v.optional(v.union(v.literal("admin"), v.literal("user"))),
  }).index("email", ["email"]),
  companies: defineTable({
    name: v.string(),
    description: v.optional(v.string()),
    website: v.optional(v.string()),
    logo: v.optional(v.string()),
    location: v.optional(v.string()),
    industry: v.optional(v.string()),
    size: v.optional(v.string()), // e.g., "1-10", "11-50", "51-200", etc.
    foundedYear: v.optional(v.number()),
    userId: v.id("users"), // The user who created/owns the company
    createdAt: v.number(),
  })
    .index("userId", ["userId"])
    .index("name", ["name"]),
  jobPostings: defineTable({
    title: v.string(),
    description: v.string(),
    requirements: v.optional(v.string()),
    location: v.optional(v.string()),
    jobType: v.optional(
      v.union(
        v.literal("full-time"),
        v.literal("part-time"),
        v.literal("contract"),
        v.literal("internship"),
        v.literal("remote")
      )
    ),
    salaryMin: v.optional(v.number()),
    salaryMax: v.optional(v.number()),
    currency: v.optional(v.string()),
    status: v.union(
      v.literal("draft"),
      v.literal("published"),
      v.literal("closed")
    ),
    companyId: v.id("companies"),
    userId: v.id("users"), // The user who created the job posting
    publishedAt: v.optional(v.number()),
    closedAt: v.optional(v.number()),
    createdAt: v.number(),
  })
    .index("companyId", ["companyId"])
    .index("userId", ["userId"])
    .index("status", ["status"])
    .index("publishedAt", ["publishedAt"])
    .index("jobType", ["jobType"]),
  tasks: defineTable({
    text: v.string(),
    isCompleted: v.boolean(),
  }),
  posts: defineTable({
    slug: v.string(),
    title: v.string(),
    text: v.string(),
    excerpt: v.string(),
    featureImage: v.optional(v.string()),
    status: v.union(v.literal("draft"), v.literal("published")),
    publishedAt: v.optional(v.number()),
    userId: v.id("users"),
  })
    .index("slug", ["slug"])
    .index("status", ["status"])
    .index("publishedAt", ["publishedAt"])
    .index("userId", ["userId"]),
  comments: defineTable({
    postId: v.id("posts"),
    userId: v.id("users"),
    text: v.string(),
  })
    .index("postId", ["postId"])
    .index("userId", ["userId"]),
  reactions: defineTable({
    postId: v.id("posts"),
    userId: v.id("users"),
    type: v.string(), // e.g., "like", "love", "laugh", etc.
  })
    .index("postId", ["postId"])
    .index("userId", ["userId"]),
});

import { i } from "@instantdb/react";

const _schema = i.schema({
  entities: {
    // System entities
    $files: i.entity({
      id: i.string().unique().indexed(),
      path: i.string().unique().indexed(),
      url: i.any(),
    }),
    $users: i.entity({
      id: i.string().unique().indexed(),
      email: i.string().unique().indexed(),
    }),

    // User Management
    users: i.entity({
      createdAt: i.date().indexed(),
      username: i.string(),
      email: i.string().indexed(),
      avatar: i.string(),
      updatedAt: i.date(),
      role: i.string().indexed(), // 'BLOCKED', 'USER', 'ADMIN'
      banned: i.boolean(),
      banReason: i.string(),
      banExpires: i.date(),
    }),

    // Organization Management
    organizations: i.entity({
      name: i.string(),
      slug: i.string().unique().indexed(),
      description: i.string(),
      logo: i.string(),
      website: i.string(),
      createdAt: i.date().indexed(),
      updatedAt: i.date(),
      ownerId: i.string().indexed(),
      isActive: i.boolean().indexed(),
      settings: i.json(), // Organization-specific settings
    }),

    organizationMemberships: i.entity({
      userId: i.string().indexed(),
      organizationId: i.string().indexed(),
      role: i.string().indexed(), // 'OWNER', 'ADMIN', 'MEMBER', 'VIEWER'
      createdAt: i.date().indexed(),
      updatedAt: i.date(),
      invitedBy: i.string().indexed(), // User ID who invited this member
      joinedAt: i.date(),
      isActive: i.boolean().indexed(),
    }),

    organizationInvites: i.entity({
      email: i.string().indexed(),
      organizationId: i.string().indexed(),
      invitedBy: i.string().indexed(), // User ID who sent the invite
      role: i.string().indexed(), // Role they'll have when they accept
      token: i.string().unique().indexed(), // Unique invite token
      expiresAt: i.date().indexed(),
      createdAt: i.date().indexed(),
      acceptedAt: i.date(),
      revokedAt: i.date(),
      status: i.string().indexed(), // 'PENDING', 'ACCEPTED', 'EXPIRED', 'REVOKED'
      message: i.string(), // Optional personal message
    }),

    // Content Management (now organization-aware)
    bookmarks: i.entity({
      createdAt: i.date().indexed(),
      updatedAt: i.date(),
      url: i.string().unique().indexed(),
      host: i.string().indexed(),
      title: i.string(),
      image: i.string(),
      description: i.string(),
      faviconUrl: i.string(),
      organizationId: i.string().indexed(), // Associate with organization
      userId: i.string().indexed(), // Creator
      isPublic: i.boolean().indexed(), // Visible to all org members
    }),

    questions: i.entity({
      createdAt: i.date().indexed(),
      updatedAt: i.date(),
      title: i.string(),
      description: i.string(),
      userId: i.string().indexed(),
      organizationId: i.string().indexed(), // Associate with organization
      isPublic: i.boolean().indexed(),
    }),

    comments: i.entity({
      createdAt: i.date().indexed(),
      updatedAt: i.date(),
      text: i.string(),
      userId: i.string().indexed(),
      organizationId: i.string().indexed(), // Associate with organization
      bookmarkId: i.string().indexed(),
      questionId: i.string().indexed(),
      postId: i.string().indexed(),
    }),

    audio: i.entity({
      createdAt: i.date().indexed(),
      updatedAt: i.date(),
      plays: i.number(),
      waveform: i.json(),
      url: i.string(),
      transcription: i.string(),
      commentId: i.string().unique().indexed(),
    }),

    posts: i.entity({
      createdAt: i.date().indexed(),
      updatedAt: i.date(),
      publishedAt: i.date().indexed(),
      slug: i.string().unique().indexed(),
      title: i.string(),
      text: i.string(),
      excerpt: i.string(),
      featureImage: i.string(),
      userId: i.string().indexed(),
      organizationId: i.string().indexed(), // Associate with organization
      isPublic: i.boolean().indexed(),
    }),

    postEdits: i.entity({
      createdAt: i.date().indexed(),
      text: i.string(),
      title: i.string(),
      excerpt: i.string(),
      featureImage: i.string(),
      postId: i.string().indexed(),
    }),

    tags: i.entity({
      name: i.string().unique().indexed(),
      organizationId: i.string().indexed(), // Organization-specific tags
      color: i.string(), // Tag color for UI
    }),

    reactions: i.entity({
      createdAt: i.date().indexed(),
      userId: i.string().indexed(),
      commentId: i.string().indexed(),
      bookmarkId: i.string().indexed(),
      questionId: i.string().indexed(),
      postId: i.string().indexed(),
    }),

    // Legacy profile entity (keeping for compatibility)
    profiles: i.entity({
      createdAt: i.date(),
      image: i.string(),
      name: i.string(),
      updatedAt: i.date(),
    }),
  },
  links: {
    // System user links
    users$user: {
      forward: {
        on: "users",
        has: "one",
        label: "$user",
        onDelete: "cascade",
      },
      reverse: {
        on: "$users",
        has: "one",
        label: "user",
      },
    },

    // Organization relationships
    organizationsOwner: {
      forward: {
        on: "organizations",
        has: "one",
        label: "owner",
        onDelete: "cascade",
      },
      reverse: {
        on: "users",
        has: "many",
        label: "ownedOrganizations",
      },
    },

    organizationMembershipsUser: {
      forward: {
        on: "organizationMemberships",
        has: "one",
        label: "user",
        onDelete: "cascade",
      },
      reverse: {
        on: "users",
        has: "many",
        label: "organizationMemberships",
      },
    },

    organizationMembershipsOrganization: {
      forward: {
        on: "organizationMemberships",
        has: "one",
        label: "organization",
        onDelete: "cascade",
      },
      reverse: {
        on: "organizations",
        has: "many",
        label: "memberships",
      },
    },

    organizationMembershipsInviter: {
      forward: {
        on: "organizationMemberships",
        has: "one",
        label: "inviter",
        onDelete: "cascade",
      },
      reverse: {
        on: "users",
        has: "many",
        label: "sentMemberships",
      },
    },

    organizationInvitesOrganization: {
      forward: {
        on: "organizationInvites",
        has: "one",
        label: "organization",
        onDelete: "cascade",
      },
      reverse: {
        on: "organizations",
        has: "many",
        label: "invites",
      },
    },

    organizationInvitesInviter: {
      forward: {
        on: "organizationInvites",
        has: "one",
        label: "inviter",
        onDelete: "cascade",
      },
      reverse: {
        on: "users",
        has: "many",
        label: "sentInvites",
      },
    },

    // Content relationships (updated for organizations)
    bookmarksOrganization: {
      forward: {
        on: "bookmarks",
        has: "one",
        label: "organization",
        onDelete: "cascade",
      },
      reverse: {
        on: "organizations",
        has: "many",
        label: "bookmarks",
      },
    },

    bookmarksCreator: {
      forward: {
        on: "bookmarks",
        has: "one",
        label: "creator",
        onDelete: "cascade",
      },
      reverse: {
        on: "users",
        has: "many",
        label: "createdBookmarks",
      },
    },

    questionsOrganization: {
      forward: {
        on: "questions",
        has: "one",
        label: "organization",
        onDelete: "cascade",
      },
      reverse: {
        on: "organizations",
        has: "many",
        label: "questions",
      },
    },

    questionsAuthor: {
      forward: {
        on: "questions",
        has: "one",
        label: "author",
        onDelete: "cascade",
      },
      reverse: {
        on: "users",
        has: "many",
        label: "questions",
      },
    },

    commentsOrganization: {
      forward: {
        on: "comments",
        has: "one",
        label: "organization",
        onDelete: "cascade",
      },
      reverse: {
        on: "organizations",
        has: "many",
        label: "comments",
      },
    },

    commentsAuthor: {
      forward: {
        on: "comments",
        has: "one",
        label: "author",
        onDelete: "cascade",
      },
      reverse: {
        on: "users",
        has: "many",
        label: "comments",
      },
    },

    commentsBookmark: {
      forward: {
        on: "comments",
        has: "one",
        label: "bookmark",
        onDelete: "cascade",
      },
      reverse: {
        on: "bookmarks",
        has: "many",
        label: "comments",
      },
    },

    commentsQuestion: {
      forward: {
        on: "comments",
        has: "one",
        label: "question",
        onDelete: "cascade",
      },
      reverse: {
        on: "questions",
        has: "many",
        label: "comments",
      },
    },

    commentsPost: {
      forward: {
        on: "comments",
        has: "one",
        label: "post",
        onDelete: "cascade",
      },
      reverse: {
        on: "posts",
        has: "many",
        label: "comments",
      },
    },

    audioComment: {
      forward: {
        on: "audio",
        has: "one",
        label: "comment",
        onDelete: "cascade",
      },
      reverse: {
        on: "comments",
        has: "one",
        label: "audio",
      },
    },

    postsOrganization: {
      forward: {
        on: "posts",
        has: "one",
        label: "organization",
        onDelete: "cascade",
      },
      reverse: {
        on: "organizations",
        has: "many",
        label: "posts",
      },
    },

    postsAuthor: {
      forward: {
        on: "posts",
        has: "one",
        label: "author",
        onDelete: "cascade",
      },
      reverse: {
        on: "users",
        has: "many",
        label: "posts",
      },
    },

    postEditsPost: {
      forward: {
        on: "postEdits",
        has: "one",
        label: "post",
        onDelete: "cascade",
      },
      reverse: {
        on: "posts",
        has: "many",
        label: "history",
      },
    },

    tagsOrganization: {
      forward: {
        on: "tags",
        has: "one",
        label: "organization",
        onDelete: "cascade",
      },
      reverse: {
        on: "organizations",
        has: "many",
        label: "tags",
      },
    },

    reactionsUser: {
      forward: {
        on: "reactions",
        has: "one",
        label: "user",
        onDelete: "cascade",
      },
      reverse: {
        on: "users",
        has: "many",
        label: "reactions",
      },
    },

    reactionsComment: {
      forward: {
        on: "reactions",
        has: "one",
        label: "comment",
        onDelete: "cascade",
      },
      reverse: {
        on: "comments",
        has: "many",
        label: "reactions",
      },
    },

    reactionsBookmark: {
      forward: {
        on: "reactions",
        has: "one",
        label: "bookmark",
        onDelete: "cascade",
      },
      reverse: {
        on: "bookmarks",
        has: "many",
        label: "reactions",
      },
    },

    reactionsQuestion: {
      forward: {
        on: "reactions",
        has: "one",
        label: "question",
        onDelete: "cascade",
      },
      reverse: {
        on: "questions",
        has: "many",
        label: "reactions",
      },
    },

    reactionsPost: {
      forward: {
        on: "reactions",
        has: "one",
        label: "post",
        onDelete: "cascade",
      },
      reverse: {
        on: "posts",
        has: "many",
        label: "reactions",
      },
    },

    // Many-to-many relationship for bookmark tags
    bookmarksTags: {
      forward: {
        on: "bookmarks",
        has: "many",
        label: "tags",
      },
      reverse: {
        on: "tags",
        has: "many",
        label: "bookmarks",
      },
    },

    // Legacy profile relationship (keeping for compatibility)
    profilesUser: {
      forward: {
        on: "profiles",
        has: "one",
        label: "user",
        onDelete: "cascade",
      },
      reverse: {
        on: "users",
        has: "one",
        label: "profile",
      },
    },
  },
});

// This helps TypeScript display nicer intellisense
type _AppSchema = typeof _schema;
interface AppSchema extends _AppSchema {}
const schema: AppSchema = _schema;

export type { AppSchema };
export default schema;

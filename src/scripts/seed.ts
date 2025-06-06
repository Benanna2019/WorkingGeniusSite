import { defineScript } from "rwsdk/worker";
import { db, setupDb } from "@/db";
import { env } from "cloudflare:workers";

export default defineScript(async () => {
  await setupDb(env);

  // Clear existing data
  await db.$executeRawUnsafe(`\
    DELETE FROM Reaction;
    DELETE FROM Audio;
    DELETE FROM Comment;
    DELETE FROM PostEdit;
    DELETE FROM Post;
    DELETE FROM Question;
    DELETE FROM Tag;
    DELETE FROM Bookmark;
    DELETE FROM Credential;
    DELETE FROM Session;
    DELETE FROM Account;
    DELETE FROM Verification;
    DELETE FROM User;
    DELETE FROM sqlite_sequence;
  `);

  // Create test users
  const user1 = await db.user.create({
    data: {
      id: "user-1",
      name: "John Doe",
      email: "john@example.com",
      emailVerified: true,
      image: "https://example.com/avatar1.jpg",
      updatedAt: new Date(),
      role: "USER",
    },
  });

  const user2 = await db.user.create({
    data: {
      id: "user-2",
      name: "Jane Smith",
      email: "jane@example.com",
      emailVerified: true,
      image: "https://example.com/avatar2.jpg",
      updatedAt: new Date(),
      role: "ADMIN",
    },
  });

  const user3 = await db.user.create({
    data: {
      id: "user-3",
      name: "Bob Wilson",
      email: "bob@example.com",
      emailVerified: false,
      updatedAt: new Date(),
      role: "USER",
    },
  });

  // Create tags
  const tag1 = await db.tag.create({
    data: {
      name: "javascript",
    },
  });

  const tag2 = await db.tag.create({
    data: {
      name: "react",
    },
  });

  const tag3 = await db.tag.create({
    data: {
      name: "web-development",
    },
  });

  // Create bookmarks
  const bookmark1 = await db.bookmark.create({
    data: {
      url: "https://react.dev",
      host: "react.dev",
      title: "React - The library for web and native user interfaces",
      description: "The library for web and native user interfaces",
      image: "https://react.dev/images/og-home.png",
      faviconUrl: "https://react.dev/favicon.ico",
      tags: {
        connect: [{ id: tag2.id }, { id: tag3.id }],
      },
    },
  });

  const bookmark2 = await db.bookmark.create({
    data: {
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
      host: "developer.mozilla.org",
      title: "JavaScript | MDN",
      description:
        "JavaScript (JS) is a lightweight interpreted programming language",
      image: "https://developer.mozilla.org/mdn-social-share.png",
      faviconUrl: "https://developer.mozilla.org/favicon.ico",
      tags: {
        connect: [{ id: tag1.id }, { id: tag3.id }],
      },
    },
  });

  // Create questions
  const question1 = await db.question.create({
    data: {
      title: "How to handle state in React components?",
      description:
        "I'm new to React and wondering about the best practices for managing component state.",
      userId: user1.id,
    },
  });

  const question2 = await db.question.create({
    data: {
      title: "What's the difference between let and const in JavaScript?",
      description:
        "Can someone explain when to use let vs const in modern JavaScript?",
      userId: user3.id,
    },
  });

  // Create posts
  const post1 = await db.post.create({
    data: {
      slug: "getting-started-with-react",
      title: "Getting Started with React in 2024",
      text: "React continues to be one of the most popular frontend frameworks. In this post, we'll explore the basics of React and how to get started with your first component.",
      excerpt: "Learn the fundamentals of React and build your first component",
      featureImage: "https://example.com/react-post.jpg",
      publishedAt: new Date(),
      userId: user2.id,
    },
  });

  const post2 = await db.post.create({
    data: {
      slug: "javascript-best-practices",
      title: "JavaScript Best Practices for Modern Development",
      text: "Writing clean, maintainable JavaScript is crucial for any web developer. Here are some best practices to follow in your JavaScript projects.",
      excerpt:
        "Essential JavaScript best practices every developer should know",
      featureImage: "https://example.com/js-post.jpg",
      publishedAt: new Date(),
      userId: user1.id,
    },
  });

  // Create comments
  const comment1 = await db.comment.create({
    data: {
      text: "Great explanation! This really helped me understand React hooks better.",
      userId: user1.id,
      postId: post1.id,
    },
  });

  const comment2 = await db.comment.create({
    data: {
      text: "You should use useState for local component state and useEffect for side effects.",
      userId: user2.id,
      questionId: question1.id,
    },
  });

  const comment3 = await db.comment.create({
    data: {
      text: "This is a fantastic resource for learning React. Bookmarked!",
      userId: user3.id,
      bookmarkId: bookmark1.id,
    },
  });

  // Create audio for a comment
  await db.audio.create({
    data: {
      plays: 5,
      waveform: [0.1, 0.3, 0.7, 0.4, 0.2, 0.8, 0.6, 0.3],
      url: "https://example.com/audio/comment-audio.mp3",
      transcription: "This is a great explanation of React concepts",
      commentId: comment1.id,
    },
  });

  // Create reactions
  await db.reaction.create({
    data: {
      userId: user1.id,
      postId: post1.id,
    },
  });

  await db.reaction.create({
    data: {
      userId: user2.id,
      postId: post2.id,
    },
  });

  await db.reaction.create({
    data: {
      userId: user3.id,
      bookmarkId: bookmark1.id,
    },
  });

  await db.reaction.create({
    data: {
      userId: user1.id,
      questionId: question1.id,
    },
  });

  await db.reaction.create({
    data: {
      userId: user2.id,
      commentId: comment1.id,
    },
  });

  // Create post edit history
  await db.postEdit.create({
    data: {
      text: "React continues to be one of the most popular frontend frameworks. In this post, we'll explore React basics.",
      title: "Getting Started with React",
      excerpt: "Learn React fundamentals",
      featureImage: "https://example.com/react-post-old.jpg",
      postId: post1.id,
    },
  });

  // Create credentials for user authentication
  await db.credential.create({
    data: {
      userId: user1.id,
      credentialId: "cred-123-abc",
      publicKey: Buffer.from("mock-public-key-data"),
      counter: 1,
    },
  });

  // Create sessions
  await db.session.create({
    data: {
      id: "session-1",
      token: "session-token-123",
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      createdAt: new Date(),
      updatedAt: new Date(),
      ipAddress: "192.168.1.1",
      userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
      userId: user1.id,
    },
  });

  // Create accounts
  await db.account.create({
    data: {
      id: "account-1",
      accountId: "google-123456",
      providerId: "google",
      userId: user1.id,
      accessToken: "access-token-123",
      refreshToken: "refresh-token-123",
      scope: "email profile",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  console.log("🌱 Finished seeding database with comprehensive test data");
  console.log("📊 Created:");
  console.log("  - 3 users (1 admin, 2 regular users)");
  console.log("  - 2 bookmarks with tags");
  console.log("  - 2 questions");
  console.log("  - 2 posts with edit history");
  console.log("  - 3 comments (1 with audio)");
  console.log("  - 5 reactions");
  console.log("  - 1 credential");
  console.log("  - 1 session");
  console.log("  - 1 account");
});

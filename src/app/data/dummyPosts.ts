// @ts-nocheck
import { Post } from "@generated/prisma";

export const dummyPosts: Post[] = [
  {
    id: "clp1234567890abcdef123456",
    createdAt: Date("2024-01-15T10:00:00Z"),
    updatedAt: Date("2024-01-15T10:00:00Z"),
    publishedAt: Date("2024-01-15T10:00:00Z"),
    slug: "getting-started-with-react-hooks",
    title: "Getting Started with React Hooks",
    text: `# Getting Started with React Hooks

React Hooks have revolutionized the way we write React components. In this comprehensive guide, we'll explore the most commonly used hooks and how they can simplify your React development workflow.

## useState Hook

The useState hook allows you to add state to functional components:

\`\`\`jsx
const [count, setCount] = useState(0);
\`\`\`

## useEffect Hook

The useEffect hook lets you perform side effects in functional components:

\`\`\`jsx
useEffect(() => {
  document.title = \`Count: \${count}\`;
}, [count]);
\`\`\`

React Hooks make your code more readable and easier to test. Start using them in your next project!`,
    excerpt:
      "Learn how to use React Hooks to write cleaner, more maintainable React components with practical examples.",
    featureImage:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop",
    userId: "user123456789",
  },
  {
    id: "clp2345678901bcdef234567",
    createdAt: Date("2024-01-10T14:30:00Z"),
    updatedAt: Date("2024-01-12T09:15:00Z"),
    publishedAt: Date("2024-01-12T09:15:00Z"),
    slug: "typescript-best-practices-2024",
    title: "TypeScript Best Practices for 2024",
    text: `# TypeScript Best Practices for 2024

TypeScript continues to evolve, and with it, the best practices for writing maintainable, type-safe code. Here are the essential practices every TypeScript developer should follow.

## Use Strict Mode

Always enable strict mode in your tsconfig.json:

\`\`\`json
{
  "compilerOptions": {
    "strict": true
  }
}
\`\`\`

## Prefer Type Inference

Let TypeScript infer types when possible:

\`\`\`typescript
// Good
const user = { name: 'John', age: 30 };

// Avoid
const user: { name: string; age: number } = { name: 'John', age: 30 };
\`\`\`

## Use Union Types

Union types are powerful for modeling data that can be one of several types:

\`\`\`typescript
type Status = 'loading' | 'success' | 'error';
\`\`\`

Following these practices will make your TypeScript code more robust and maintainable.`,
    excerpt:
      "Essential TypeScript best practices to write better, more maintainable code in 2024.",
    featureImage:
      "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=400&fit=crop",
    userId: "user123456789",
  },
  {
    id: "clp3456789012cdef345678",
    createdAt: Date("2024-01-08T16:45:00Z"),
    updatedAt: Date("2024-01-08T16:45:00Z"),
    publishedAt: Date("2024-01-08T16:45:00Z"),
    slug: "building-scalable-web-applications",
    title: "Building Scalable Web Applications",
    text: `# Building Scalable Web Applications

Scalability is crucial for modern web applications. As your user base grows, your application needs to handle increased load without compromising performance.

## Key Principles

### 1. Modular Architecture
Break your application into smaller, manageable modules:

\`\`\`typescript
// Feature-based structure
src/
  features/
    auth/
    dashboard/
    profile/
\`\`\`

### 2. Database Optimization
- Use proper indexing
- Implement connection pooling
- Consider read replicas for heavy read workloads

### 3. Caching Strategies
Implement caching at multiple levels:
- Browser caching
- CDN caching
- Application-level caching
- Database query caching

### 4. Load Balancing
Distribute traffic across multiple servers to prevent bottlenecks.

## Performance Monitoring

Always monitor your application's performance:
- Response times
- Error rates
- Resource utilization
- User experience metrics

Building scalable applications requires careful planning and continuous optimization.`,
    excerpt:
      "Learn the fundamental principles and strategies for building web applications that can scale with your growing user base.",
    featureImage:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
    userId: "user987654321",
  },
  {
    id: "clp4567890123def456789",
    createdAt: Date("2024-01-05T11:20:00Z"),
    updatedAt: Date("2024-01-05T11:20:00Z"),
    publishedAt: null, // Draft post
    slug: "modern-css-techniques-draft",
    title: "Modern CSS Techniques You Should Know",
    text: `# Modern CSS Techniques You Should Know

CSS has evolved significantly in recent years. Here are some modern techniques that will improve your styling workflow.

## CSS Grid Layout

CSS Grid provides a powerful way to create complex layouts:

\`\`\`css
.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
}
\`\`\`

## CSS Custom Properties (Variables)

Use CSS variables for maintainable stylesheets:

\`\`\`css
:root {
  --primary-color: #3b82f6;
  --spacing-unit: 1rem;
}

.button {
  background-color: var(--primary-color);
  padding: var(--spacing-unit);
}
\`\`\`

## Container Queries

Container queries allow you to style elements based on their container's size:

\`\`\`css
@container (min-width: 400px) {
  .card {
    display: flex;
  }
}
\`\`\`

These modern CSS features will help you create more responsive and maintainable designs.`,
    excerpt:
      "Discover modern CSS techniques including Grid, Custom Properties, and Container Queries to enhance your styling workflow.",
    featureImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop",
    userId: "user987654321",
  },
  {
    id: "clp5678901234ef567890",
    createdAt: Date("2024-01-03T08:00:00Z"),
    updatedAt: Date("2024-01-03T08:00:00Z"),
    publishedAt: Date("2024-01-03T08:00:00Z"),
    slug: "introduction-to-web-performance",
    title: "Introduction to Web Performance Optimization",
    text: `# Introduction to Web Performance Optimization

Web performance directly impacts user experience and business metrics. A slow website can lead to higher bounce rates and lower conversions.

## Core Web Vitals

Google's Core Web Vitals are essential metrics to track:

### Largest Contentful Paint (LCP)
Measures loading performance. Aim for LCP to occur within 2.5 seconds.

### First Input Delay (FID)
Measures interactivity. Aim for FID of less than 100 milliseconds.

### Cumulative Layout Shift (CLS)
Measures visual stability. Aim for CLS of less than 0.1.

## Optimization Techniques

### Image Optimization
- Use modern formats (WebP, AVIF)
- Implement lazy loading
- Serve responsive images

### Code Splitting
Break your JavaScript into smaller chunks:

\`\`\`javascript
const LazyComponent = React.lazy(() => import('./LazyComponent'));
\`\`\`

### Minimize HTTP Requests
- Combine CSS and JavaScript files
- Use CSS sprites for icons
- Implement resource bundling

## Tools for Performance Testing

- Lighthouse
- WebPageTest
- Chrome DevTools
- GTmetrix

Regular performance audits help maintain optimal user experience.`,
    excerpt:
      "Learn the fundamentals of web performance optimization and discover tools and techniques to make your websites faster.",
    featureImage:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
    userId: "user456789123",
  },
];

import type { BlogPostMetadata } from "./types"

// Mock metadata for development
export const mockBlogMetadata: BlogPostMetadata[] = [
  {
    id: "getting-started-with-nextjs-14",
    title: "Getting Started with Next.js 14",
    description:
      "Learn how to build modern web applications with Next.js 14 and take advantage of its powerful features.",
    date: "2023-12-01T00:00:00.000Z",
    author: "Aashish Singhal",
    slug: "getting-started-with-nextjs-14",
    tags: ["Next.js", "React", "Web Development"],
    thumbnail: "/images/nextjs-thumbnail.jpg",
    filename: "getting-started-with-nextjs-14.md",
  },
  {
    id: "typescript-best-practices",
    title: "TypeScript Best Practices for 2023",
    description: "Discover the latest TypeScript best practices to improve your code quality and developer experience.",
    date: "2023-11-15T00:00:00.000Z",
    author: "Aashish Singhal",
    slug: "typescript-best-practices",
    tags: ["TypeScript", "JavaScript", "Programming"],
    thumbnail: "/images/typescript-thumbnail.jpg",
    filename: "typescript-best-practices.md",
  },
  {
    id: "building-a-blog-with-nextjs",
    title: "Building a Blog with Next.js and Markdown",
    description: "Learn how to create a blog using Next.js and Markdown files for content management.",
    date: "2023-10-20T00:00:00.000Z",
    author: "Aashish Singhal",
    slug: "building-a-blog-with-nextjs",
    tags: ["Next.js", "Markdown", "Blog"],
    thumbnail: "/images/blog-thumbnail.jpg",
    filename: "building-a-blog-with-nextjs.md",
  },
  {
    id: "exploring-japan",
    title: "Exploring Japan: A Developer's Journey",
    description: "My experiences traveling through Japan as a software developer and the tech scene I encountered.",
    date: "2023-09-05T00:00:00.000Z",
    author: "Aashish Singhal",
    slug: "exploring-japan",
    tags: ["Travel", "Japan", "Tech Culture"],
    thumbnail: "/images/travel-thumbnail.jpg",
    filename: "exploring-japan.md",
  },
  {
    id: "understanding-react-server-components",
    title: "Understanding React Server Components",
    description: "A deep dive into React Server Components and how they change the way we build React applications.",
    date: "2023-08-12T00:00:00.000Z",
    author: "Aashish Singhal",
    slug: "understanding-react-server-components",
    tags: ["React", "Server Components", "Web Development"],
    thumbnail: "/images/server-components-thumbnail.jpg",
    filename: "understanding-react-server-components.md",
  },
  {
    id: "custom-react-hooks",
    title: "5 Custom React Hooks Every Developer Should Know",
    description: "Learn how to create and use custom React hooks to improve code reusability and organization.",
    date: "2023-07-20T00:00:00.000Z",
    author: "Aashish Singhal",
    slug: "custom-react-hooks",
    tags: ["React", "Hooks", "JavaScript"],
    thumbnail: "/images/hooks-thumbnail.jpg",
    filename: "custom-react-hooks.md",
  },
]

// Sample Markdown content for each blog post
export const sampleMarkdownContent: Record<string, string> = {
  "getting-started-with-nextjs-14.md": `---
title: Getting Started with Next.js 14
description: Learn how to build modern web applications with Next.js 14 and take advantage of its powerful features.
date: 2023-12-01
author: Aashish Singhal
tags: 
- Next.js
- React
- Web Development
thumbnail: /images/nextjs-thumbnail.jpg
---

# Getting Started with Next.js 14

Next.js is a React framework that enables server-side rendering, static site generation, and more.

## Why Next.js?

Next.js provides a great developer experience with features like:

- Server-side rendering
- Static site generation
- API routes
- File-based routing
- Built-in CSS and Sass support
- Fast refresh
- TypeScript support

## Getting Started

To create a new Next.js app, run:

\`\`\`bash
npx create-next-app@latest
\`\`\`
`,
  "typescript-best-practices.md": `---
title: TypeScript Best Practices for 2023
description: Discover the latest TypeScript best practices to improve your code quality and developer experience.
date: 2023-11-15
author: Aashish Singhal
tags: 
- TypeScript
- JavaScript
- Programming
thumbnail: /images/typescript-thumbnail.jpg
---

# TypeScript Best Practices for 2023

TypeScript continues to grow in popularity, and for good reason. Here are some best practices to follow in 2023.

## Use Strict Mode

Always enable strict mode in your TypeScript configuration:

\`\`\`json
{
  "compilerOptions": {
    "strict": true
  }
}
\`\`\`

## Prefer Interfaces Over Types

Interfaces are often more flexible and can be extended more easily:

\`\`\`typescript
interface User {
  id: string;
  name: string;
}

interface AdminUser extends User {
  permissions: string[];
}
\`\`\`
`,
  "building-a-blog-with-nextjs.md": `---
title: Building a Blog with Next.js and Markdown
description: Learn how to create a blog using Next.js and Markdown files for content management.
date: 2023-10-20
author: Aashish Singhal
tags: 
- Next.js
- Markdown
- Blog
thumbnail: /images/blog-thumbnail.jpg
---

# Building a Blog with Next.js and Markdown

In this tutorial, we'll build a blog using Next.js and Markdown files for content.

## Why Markdown?

Markdown is a lightweight markup language that's easy to write and read. It's perfect for blog content because:

- It's simple to learn
- It converts easily to HTML
- It's widely supported
- It works well with version control

## Setting Up the Project

First, create a new Next.js project:

\`\`\`bash
npx create-next-app@latest my-blog
cd my-blog
\`\`\`
`,
  "exploring-japan.md": `---
title: Exploring Japan - A Developer's Journey
description: My experiences traveling through Japan as a software developer and the tech scene I encountered.
date: 2023-09-05
author: Aashish Singhal
tags: 
- Travel
- Japan
- Tech Culture
thumbnail: /images/travel-thumbnail.jpg
---

# Exploring Japan - A Developer's Journey

Japan is a fascinating country with a unique blend of traditional culture and cutting-edge technology. As a developer, I was particularly interested in exploring the tech scene.

## Tokyo's Tech Hubs

Tokyo is home to numerous tech hubs and co-working spaces. Some of the most notable include:

- Shibuya Scramble Square
- Roppongi Hills
- Tokyo Midtown

## Developer Meetups

I attended several developer meetups during my stay, including:

- Tokyo JavaScript Meetup
- React Tokyo
- NodeJS Japan
`,
  "understanding-react-server-components.md": `---
title: Understanding React Server Components
description: A deep dive into React Server Components and how they change the way we build React applications.
date: 2023-08-12
author: Aashish Singhal
tags: 
- React
- Server Components
- Web Development
thumbnail: /images/server-components-thumbnail.jpg
---

# Understanding React Server Components

React Server Components represent a paradigm shift in how we build React applications.

## What Are Server Components?

Server Components are a new kind of component that runs only on the server. They:

- Can access server-side resources directly
- Don't increase your JavaScript bundle size
- Keep sensitive data and logic on the server

## Client vs. Server Components

Here's a comparison:

| Feature | Server Component | Client Component |
|---------|-----------------|------------------|
| Runs on | Server only | Client |
| Access to | Backend resources | Browser APIs |
| Bundle size | Zero impact | Increases bundle |
| Interactivity | No | Yes |
`,
  "custom-react-hooks.md": `---
title: 5 Custom React Hooks Every Developer Should Know
description: Learn how to create and use custom React hooks to improve code reusability and organization.
date: 2023-07-20
author: Aashish Singhal
tags: 
- React
- Hooks
- JavaScript
thumbnail: /images/hooks-thumbnail.jpg
---

# 5 Custom React Hooks Every Developer Should Know

Custom hooks are a powerful feature in React that allow you to extract component logic into reusable functions.

## 1. useLocalStorage

\`\`\`typescript
function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.log(error);
    }
  };
  return [storedValue, setValue] as const;
}
\`\`\`
`,
}


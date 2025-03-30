---
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

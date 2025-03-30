---
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

```typescript
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
```

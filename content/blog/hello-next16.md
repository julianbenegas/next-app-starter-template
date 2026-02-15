---
title: "Hello Next.js 16 + Streamdown"
description: "Why this blog renders Markdown with Streamdown."
date: "2026-02-10"
tags: ["nextjs", "markdown", "streamdown"]
---

# Hello Next.js 16 + Streamdown

This is the first post in the new **Streamdown-powered** blog section.

## Why this setup?

- Content lives in-repo for a simple Git-based workflow.
- Markdown is rendered with `streamdown`.
- Syntax highlighting is handled by the `@streamdown/code` plugin.
- Static routing keeps pages fast and SEO-friendly.

```tsx
export default function Example() {
  return <p>Markdown code fences are highlighted with Streamdown.</p>;
}
```

You can now add more posts under `content/blog/*.md` and they will appear in `/blog`.

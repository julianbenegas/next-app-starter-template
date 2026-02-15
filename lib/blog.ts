import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import type { BlogPost, BlogPostMetadata } from "@/types/blog";

const postsDirectory = path.join(process.cwd(), "content/blog");

export async function getBlogPosts(): Promise<BlogPost[]> {
  const entries = await readdir(postsDirectory, { withFileTypes: true });

  const posts = await Promise.all(
    entries
      .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
      .map(async (entry) => {
        const slug = entry.name.replace(/\.md$/, "");
        return getBlogPost(slug);
      }),
  );

  return posts.sort((a, b) => b.metadata.date.localeCompare(a.metadata.date));
}

export async function getBlogPost(slug: string): Promise<BlogPost> {
  const filePath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = await readFile(filePath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    metadata: data as BlogPostMetadata,
    content,
  };
}

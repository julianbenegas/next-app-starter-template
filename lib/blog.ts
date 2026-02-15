import fs from "node:fs";
import path from "node:path";

export type BlogPostMetadata = {
  title: string;
  description: string;
  date: string;
  tags: string[];
};

export type BlogPost = {
  slug: string;
  metadata: BlogPostMetadata;
};

export type BlogSlug = string;

/**
 * Dynamically discover all MDX files in the content/blog directory
 */
function getBlogSlugs(): string[] {
  const blogDir = path.join(process.cwd(), "content", "blog");

  if (!fs.existsSync(blogDir)) {
    return [];
  }

  const files = fs.readdirSync(blogDir);

  return files
    .filter((file) => file.endsWith(".mdx") || file.endsWith(".md"))
    .map((file) => file.replace(/\.mdx?$/, ""));
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const slugs = getBlogSlugs();

  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const mod = await import(`@/content/blog/${slug}.mdx`);

      return {
        slug,
        metadata: mod.metadata as BlogPostMetadata,
      };
    }),
  );

  return posts.sort((a, b) => b.metadata.date.localeCompare(a.metadata.date));
}

export async function getBlogPostModule(slug: BlogSlug) {
  return import(`@/content/blog/${slug}.mdx`);
}

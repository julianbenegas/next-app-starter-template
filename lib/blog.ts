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

type BlogFileInfo = {
  slug: string;
  filename: string;
};

/**
 * Dynamically discover all MDX files in the content/blog directory
 */
function getBlogFiles(): BlogFileInfo[] {
  const blogDir = path.join(process.cwd(), "content", "blog");

  if (!fs.existsSync(blogDir)) {
    return [];
  }

  const files = fs.readdirSync(blogDir);

  return files
    .filter((file) => file.endsWith(".mdx") || file.endsWith(".md"))
    .map((file) => ({
      slug: file.replace(/\.mdx?$/, ""),
      filename: file,
    }));
}

/**
 * Validate that a slug is safe and exists in the blog directory
 */
function isValidSlug(slug: string, validFiles: BlogFileInfo[]): boolean {
  // Check for path traversal attempts
  if (slug.includes("..") || slug.includes("/") || slug.includes("\\")) {
    return false;
  }

  // Check that slug exists in our list of files
  return validFiles.some((file) => file.slug === slug);
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const blogFiles = getBlogFiles();

  const posts = await Promise.all(
    blogFiles.map(async (file) => {
      const mod = await import(`@/content/blog/${file.filename}`);

      return {
        slug: file.slug,
        metadata: mod.metadata as BlogPostMetadata,
      };
    }),
  );

  return posts.sort((a, b) => b.metadata.date.localeCompare(a.metadata.date));
}

export async function getBlogPostModule(slug: BlogSlug) {
  const blogFiles = getBlogFiles();

  if (!isValidSlug(slug, blogFiles)) {
    throw new Error(`Invalid or unknown blog slug: ${slug}`);
  }

  const file = blogFiles.find((f) => f.slug === slug);
  if (!file) {
    throw new Error(`Blog post not found: ${slug}`);
  }

  return import(`@/content/blog/${file.filename}`);
}

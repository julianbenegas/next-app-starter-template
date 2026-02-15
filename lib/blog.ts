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

let cachedBlogFiles: BlogFileInfo[] | null = null;

/**
 * Dynamically discover all MDX files in the content/blog directory
 * Results are cached after first call
 */
function getBlogFiles(): BlogFileInfo[] {
  if (cachedBlogFiles) {
    return cachedBlogFiles;
  }

  const blogDir = path.join(process.cwd(), "content", "blog");

  if (!fs.existsSync(blogDir)) {
    cachedBlogFiles = [];
    return cachedBlogFiles;
  }

  const files = fs.readdirSync(blogDir);

  cachedBlogFiles = files
    .filter((file) => file.endsWith(".mdx") || file.endsWith(".md"))
    .map((file) => ({
      slug: file.replace(/\.mdx?$/, ""),
      filename: file,
    }));

  return cachedBlogFiles;
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

  // Normalize and validate the slug to prevent path traversal
  const normalizedSlug = path.normalize(slug);
  if (
    normalizedSlug !== slug ||
    normalizedSlug.includes("..") ||
    normalizedSlug.includes("/") ||
    normalizedSlug.includes("\\")
  ) {
    throw new Error(`Invalid blog slug: ${slug}`);
  }

  const file = blogFiles.find((f) => f.slug === normalizedSlug);

  if (!file) {
    throw new Error(`Blog post not found: ${slug}`);
  }

  return import(`@/content/blog/${file.filename}`);
}

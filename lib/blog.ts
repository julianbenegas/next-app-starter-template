import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "content");

export type BlogFrontmatter = {
  title: string;
  description: string;
  date: string;
  author?: string;
};

export type BlogPost = BlogFrontmatter & {
  slug: string;
};

export function getBlogSlugs(): string[] {
  return fs
    .readdirSync(contentDir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getBlogPostSource(slug: string): string {
  const filePath = path.join(contentDir, `${slug}.mdx`);
  return fs.readFileSync(filePath, "utf-8");
}

export function getAllPosts(): BlogPost[] {
  const slugs = getBlogSlugs();

  return slugs
    .map((slug) => {
      const source = getBlogPostSource(slug);
      const { data } = matter(source);
      return {
        slug,
        title: data.title ?? slug,
        description: data.description ?? "",
        date: data.date ?? "",
        author: data.author,
      };
    })
    .sort((a, b) => (a.date > b.date ? -1 : 1));
}

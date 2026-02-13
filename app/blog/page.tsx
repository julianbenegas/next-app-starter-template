import { getAllPosts } from "@/lib/blog";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog",
  description: "Read the latest posts.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="py-16">
      <h1 className="mb-2 text-3xl font-bold tracking-tight">Blog</h1>
      <p className="mb-10 text-muted-foreground">
        Thoughts on web development, design, and technology.
      </p>
      <div className="flex flex-col gap-1">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group -mx-3 rounded-lg px-3 py-4 transition-colors hover:bg-muted"
          >
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
              <h2 className="font-medium group-hover:text-primary">
                {post.title}
              </h2>
              <time className="shrink-0 text-sm tabular-nums text-muted-foreground">
                {formatDate(post.date)}
              </time>
            </div>
            <p className="mt-1 text-sm text-muted-foreground line-clamp-1">
              {post.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

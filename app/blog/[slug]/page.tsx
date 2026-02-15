import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ComponentType } from "react";
import {
  type BlogPostMetadata,
  type BlogSlug,
  getBlogPostModule,
  getBlogPosts,
} from "@/lib/blog";

type BlogPostModule = {
  default: ComponentType;
  metadata: BlogPostMetadata;
};

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export const dynamicParams = false;

async function resolvePost(slug: string): Promise<BlogPostModule | null> {
  try {
    return (await getBlogPostModule(slug as BlogSlug)) as BlogPostModule;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await resolvePost(slug);

  if (!post) {
    return { title: "Post not found" };
  }

  return {
    title: post.metadata.title,
    description: post.metadata.description,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await resolvePost(slug);

  if (!post) notFound();

  const Post = post.default;

  return (
    <main className="py-12">
      <Link href="/blog" className="text-sm text-zinc-600 hover:underline">
        ← Back to blog
      </Link>
      <article className="mt-5">
        <p className="text-sm text-zinc-500">{post.metadata.date}</p>
        <Post />
      </article>
    </main>
  );
}

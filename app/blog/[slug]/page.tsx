import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogPost, getBlogPosts } from "@/lib/blog";
import { MarkdownRenderer } from "./markdown-renderer";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export const dynamicParams = false;

async function resolvePost(slug: string) {
  try {
    return await getBlogPost(slug);
  } catch (error) {
    console.error(`[Blog] Failed to resolve post for slug "${slug}":`, error);
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

  return (
    <main className="py-12">
      <Link href="/blog" className="text-sm text-zinc-600 hover:underline">
        ← Back to blog
      </Link>
      <article className="mt-5">
        <p className="text-sm text-zinc-500">{post.metadata.date}</p>
        <MarkdownRenderer content={post.content} />
      </article>
    </main>
  );
}

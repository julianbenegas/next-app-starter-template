import { getBlogPostSource, getBlogSlugs } from "@/lib/blog";
import type { BlogFrontmatter } from "@/lib/blog";
import { mdxComponents } from "@/lib/mdx-components";
import type { Metadata } from "next";
import { compileMDX } from "next-mdx-remote/rsc";
import Link from "next/link";
import remarkGfm from "remark-gfm";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return getBlogSlugs().map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const source = getBlogPostSource(slug);
  const { frontmatter } = await compileMDX<BlogFrontmatter>({
    source,
    options: { parseFrontmatter: true },
  });

  return {
    title: frontmatter.title,
    description: frontmatter.description,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;
  const source = getBlogPostSource(slug);

  const { content, frontmatter } = await compileMDX<BlogFrontmatter>({
    source,
    components: mdxComponents,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
      },
    },
  });

  return (
    <article className="py-16">
      <header className="mb-8">
        <Link
          href="/blog"
          className="mb-6 inline-flex items-center text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          &larr; Back to blog
        </Link>
        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          {frontmatter.title}
        </h1>
        <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
          {frontmatter.author && <span>{frontmatter.author}</span>}
          {frontmatter.author && frontmatter.date && (
            <span aria-hidden="true">&middot;</span>
          )}
          {frontmatter.date && (
            <time dateTime={frontmatter.date}>
              {new Date(frontmatter.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          )}
        </div>
      </header>
      <div>{content}</div>
    </article>
  );
}

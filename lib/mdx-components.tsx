import type { MDXComponents } from "mdx/types";
import Image, { type ImageProps } from "next/image";
import type { HTMLAttributes } from "react";

export const mdxComponents: MDXComponents = {
  h1: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className="mt-8 mb-4 text-3xl font-bold tracking-tight text-foreground"
      {...props}
    />
  ),
  h2: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="mt-8 mb-3 text-2xl font-semibold tracking-tight text-foreground"
      {...props}
    />
  ),
  h3: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className="mt-6 mb-3 text-xl font-semibold tracking-tight text-foreground"
      {...props}
    />
  ),
  p: (props: HTMLAttributes<HTMLParagraphElement>) => (
    <p className="mb-4 leading-7 text-foreground/90" {...props} />
  ),
  ul: (props: HTMLAttributes<HTMLUListElement>) => (
    <ul className="mb-4 ml-6 list-disc space-y-1" {...props} />
  ),
  ol: (props: HTMLAttributes<HTMLOListElement>) => (
    <ol className="mb-4 ml-6 list-decimal space-y-1" {...props} />
  ),
  li: (props: HTMLAttributes<HTMLLIElement>) => (
    <li className="leading-7 text-foreground/90" {...props} />
  ),
  blockquote: (props: HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="mb-4 border-l-4 border-border pl-4 italic text-muted-foreground"
      {...props}
    />
  ),
  hr: (props: HTMLAttributes<HTMLHRElement>) => (
    <hr className="my-8 border-border" {...props} />
  ),
  a: (
    props: HTMLAttributes<HTMLAnchorElement> & { href?: string },
  ) => (
    <a
      className="font-medium text-primary underline underline-offset-4"
      {...props}
    />
  ),
  code: (props: HTMLAttributes<HTMLElement>) => {
    const isInline = typeof props.children === "string";
    if (isInline) {
      return (
        <code
          className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm"
          {...props}
        />
      );
    }
    return <code {...props} />;
  },
  pre: (props: HTMLAttributes<HTMLPreElement>) => (
    <pre
      className="mb-4 overflow-x-auto rounded-lg border border-border bg-muted p-4 font-mono text-sm"
      {...props}
    />
  ),
  strong: (props: HTMLAttributes<HTMLElement>) => (
    <strong className="font-semibold text-foreground" {...props} />
  ),
  img: (props) => (
    <Image
      sizes="100vw"
      style={{ width: "100%", height: "auto" }}
      {...(props as ImageProps)}
    />
  ),
};

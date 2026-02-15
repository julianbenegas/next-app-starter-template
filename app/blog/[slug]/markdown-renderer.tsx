"use client";

import { code } from "@streamdown/code";
import { Streamdown } from "streamdown";

type MarkdownRendererProps = {
  content: string;
};

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return <Streamdown plugins={{ code }}>{content}</Streamdown>;
}

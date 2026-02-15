export type BlogPostMetadata = {
  title: string;
  description: string;
  date: string;
  tags: string[];
};

export type BlogPost = {
  slug: string;
  metadata: BlogPostMetadata;
  content: string;
};

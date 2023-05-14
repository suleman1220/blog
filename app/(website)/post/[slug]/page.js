import { sharedMetaData } from "../../layout";
import PostPage from "./default";

import { getAllPostsSlugs, getPostBySlug } from "@/lib/sanity/client";

export async function generateStaticParams() {
  return await getAllPostsSlugs();
}

export async function generateMetadata({ params }) {
  const post = await getPostBySlug(params.slug);
  const metadata = await sharedMetaData(params);

  return {
    ...metadata,
    title: post.title,
    description: post.excerpt,
    openGraph: {
      ...metadata.openGraph,
      title: post.title,
      description: post.excerpt,
      url: `${
        process.env.VERCEL_URL
          ? "https://" + process.env.VERCEL_URL
          : ""
      }/post/${encodeURIComponent(post.slug.current)}`,
      images: [
        {
          url: `${
            process.env.VERCEL_URL
              ? "https://" + process.env.VERCEL_URL
              : ""
          }/api/og?title=${encodeURIComponent(post.title)}`
        }
      ],
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author?.name]
    },
    twitter: {
      ...metadata.twitter,
      title: post.title,
      description: post.excerpt,
      images: [
        `${
          process.env.VERCEL_URL
            ? "https://" + process.env.VERCEL_URL
            : ""
        }/api/og?title=${encodeURIComponent(post.title)}`
      ]
    }
  };
}

export default async function PostDefault({ params }) {
  const post = await getPostBySlug(params.slug);

  return <PostPage post={post} />;
}

// export const revalidate = 60;

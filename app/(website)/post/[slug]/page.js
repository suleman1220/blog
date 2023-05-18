import { sharedMetaData } from "../../layout";
import PostPage from "./default";

import { getAllPostsSlugs, getPostBySlug } from "@/lib/sanity/client";
import { urlForImage } from "@/lib/sanity/image";

export async function generateStaticParams() {
  return await getAllPostsSlugs();
}

export async function generateMetadata({ params }) {
  const post = await getPostBySlug(params.slug);
  const metadata = await sharedMetaData(params);
  const imageProps = post?.mainImage
    ? urlForImage(post?.mainImage)
    : null;

  return {
    ...metadata,
    title: {
      ...metadata.title,
      default: post.title
    },
    description: post.excerpt,
    authors: [{ name: post.author?.name }],
    openGraph: {
      ...metadata.openGraph,
      title: post.title,
      description: post.excerpt,
      url: `https://www.infobloginsider.com/post/${encodeURIComponent(
        post.slug.current
      )}`,
      images: [
        {
          url: imageProps.src,
          width: imageProps.width,
          height: imageProps.height,
          alt: post.mainImage?.alt || "Thumbnail"
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
        {
          url: imageProps.src,
          width: imageProps.width,
          height: imageProps.height,
          alt: post.mainImage?.alt || "Thumbnail"
        }
      ]
    }
  };
}

export default async function PostDefault({ params }) {
  const post = await getPostBySlug(params.slug);

  return <PostPage post={post} />;
}

export const revalidate = 120;

import { ImageResponse } from "@vercel/og";
import { getPostBySlug } from "@/lib/sanity/client";
import OgImage from "@/components/ogimage";

// const InterRegular = fetch(
//   new URL("../../../../public/fonts/Inter.ttf", import.meta.url)
// ).then(res => res.arrayBuffer());

// const InterBold = fetch(
//   new URL("../../../../public/fonts/Inter-Bold.otf", import.meta.url)
// ).then(res => res.arrayBuffer());

export const alt = "Article Image";

export const contentType = "image/png";

export default async function handler({ params }) {
  const post = await getPostBySlug(params.slug);

  const InterRegular = await fetch("fonts/Inter-Regular.otf").then(
    res => res.arrayBuffer()
  );
  // const fontData = await InterBold;
  // const [interRegularFont, interBoldFont] = await Promise.all([
  //   InterRegular,
  //   InterBold
  // ]);

  return new ImageResponse(<OgImage post={post} />, {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: "Inter",
        data: InterRegular,
        style: "normal"
      }
      // {
      //   name: "Inter",
      //   data: interBoldFont,
      //   style: "normal",
      //   weight: 700
      // }
    ]
  });
}

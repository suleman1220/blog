import { getSettings } from "@/lib/sanity/client";
import Footer from "@/components/footer";
import { urlForImage } from "@/lib/sanity/image";
import Navbar from "@/components/navbar";

export async function sharedMetaData(params) {
  const settings = await getSettings();

  return {
    // metadataBase: new URL(settings.url),
    title: {
      default: settings?.title || "Info Blog Insider",
      template: "%s | Info Blog Insider"
    },
    description:
      settings?.description || "Info Blog Insider is a blog website.",
    keywords: [
      "Info",
      "Blog",
      "Technology",
      "Education",
      "Website",
      "Article"
    ],
    authors: [{ name: "Effa Iqbal" }, { name: "Suleman Tariq" }],
    canonical: settings?.url,
    openGraph: {
      title: settings?.title || "Info Blog Insider",
      description:
        settings?.description ||
        "Info Blog Insider is a blog website.",
      url: settings?.url,
      siteName: "Info Blog",
      images: [
        {
          url: "https://infobloginsider.com/api/og?title=Info%20Blog%20Insider"
        }
        // {
        //   url:
        //     urlForImage(settings?.openGraphImage)?.src ||
        //     "/img/opengraph.jpg",
        //   width: 800,
        //   height: 600
        // }
      ],
      type: "website"
    },
    twitter: {
      title: settings?.title || "Info Blog Insider",
      description:
        settings?.description ||
        "Info Blog Insider is a blog website.",
      images: [
        "https://infobloginsider.com/api/og?title=Info%20Blog%20Insider"
      ],
      card: "summary_large_image"
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: false,
        noimageindex: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1
      }
    }
  };
}

export async function generateMetadata({ params }) {
  return await sharedMetaData(params);
}

export default async function Layout({ children, params }) {
  const settings = await getSettings();

  return (
    <>
      <Navbar {...settings} />

      <div>{children}</div>

      <Footer {...settings} />
    </>
  );
}
// enable revalidate for all pages in this layout
// export const revalidate = 60;

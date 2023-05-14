import { getSettings } from "@/lib/sanity/client";
import Footer from "@/components/footer";
import { urlForImage } from "@/lib/sanity/image";
import Navbar from "@/components/navbar";

export async function sharedMetaData(params) {
  const settings = await getSettings();

  return {
    // metadataBase: new URL(settings.url),
    title: {
      default: settings?.title || "Info Blog",
      template: "%s | Info Blog"
    },
    description:
      settings?.description || "Info Blog is a blog website.",
    keywords: ["Info", "Blog", "Tech", "Education"],
    authors: [{ name: "Suleman Tariq" }, { name: "Effa Iqbal" }],
    canonical: settings?.url,
    openGraph: {
      title: settings?.title || "Info Blog",
      description:
        settings?.description || "Info Blog is a blog website.",
      url: settings?.url,
      siteName: "Info Blog",
      images: [
        {
          url: `${
            process.env.VERCEL_URL
              ? "https://" + process.env.VERCEL_URL
              : ""
          }/api/og?title=Info%20Blog`
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
      title: settings?.title || "Info Blog",
      card: "summary_large_image"
    },
    robots: {
      index: true,
      follow: true
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

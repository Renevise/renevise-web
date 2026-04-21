export const siteConfig = {
  name: "Renevise",
  url: "https://renevise.com",
  defaultTitle: "Renevise | Business Technology Consulting",
  titleTemplate: "%s | Renevise",
  defaultDescription:
    "Renevise is a premium technology consulting firm specializing in web development, mobile apps, and AI solutions for modern enterprises.",
  ogImage: "https://renevise.com/og-image.png",
  email: "hello@renevise.com",
  twitterHandle: "@renevise",
};

export function buildMetadata({
  title,
  description,
  path = "",
  ogImage,
}: {
  title?: string;
  description?: string;
  path?: string;
  ogImage?: string;
}) {
  const metaTitle = title
    ? `${title} | ${siteConfig.name}`
    : siteConfig.defaultTitle;
  const metaDescription = description ?? siteConfig.defaultDescription;
  const metaImage = ogImage ?? siteConfig.ogImage;
  const canonical = `${siteConfig.url}${path}`;

  return {
    title: metaTitle,
    description: metaDescription,
    metadataBase: new URL(siteConfig.url),
    alternates: { canonical },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: canonical,
      siteName: siteConfig.name,
      images: [{ url: metaImage, width: 1200, height: 630, alt: metaTitle }],
      type: "website" as const,
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image" as const,
      title: metaTitle,
      description: metaDescription,
      images: [metaImage],
      creator: siteConfig.twitterHandle,
      site: siteConfig.twitterHandle,
    },
  };
}

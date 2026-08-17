import { site } from "@/lib/content";
import { absoluteUrl } from "@/lib/seo";

export type JsonLdNode = Record<string, unknown>;

export type BreadcrumbItem = {
  name: string;
  path: string;
};

export function organizationSchema(): JsonLdNode {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    name: site.name,
    alternateName: site.shortName,
    url: site.url,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/images/site/icon-192.png"),
    },
    image: absoluteUrl("/images/site/og-image.png"),
    email: site.email,
    telephone: site.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: "365 Moo 1, Maliwan Road, Nongrua",
      addressLocality: "Nongrua",
      addressRegion: "Khonkaen",
      postalCode: "40210",
      addressCountry: "TH",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 16.4322,
      longitude: 102.8236,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "17:00",
    },
    areaServed: "Worldwide",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: site.phone,
      contactType: "sales",
      email: site.email,
      availableLanguage: ["English", "Thai"],
    },
  };
}

export function websiteSchema(): JsonLdNode {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    alternateName: site.shortName,
    url: site.url,
    inLanguage: "en",
    publisher: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
    },
  };
}

export function breadcrumbSchema(items: BreadcrumbItem[]): JsonLdNode {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function aboutPageSchema(): JsonLdNode {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: `About ${site.shortName}`,
    url: absoluteUrl("/about-us"),
    mainEntity: organizationSchema(),
  };
}

export function contactPageSchema(): JsonLdNode {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: `Contact ${site.shortName}`,
    url: absoluteUrl("/contact-us"),
    mainEntity: organizationSchema(),
  };
}

export function productSchema(input: {
  name: string;
  description: string;
  slug: string;
  image: string;
  sku?: string;
}): JsonLdNode {
  const url = absoluteUrl(`/product/${input.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: input.name,
    description: input.description,
    image: [input.image.startsWith("http") ? input.image : absoluteUrl(input.image)],
    sku: input.sku ?? input.slug,
    brand: { "@type": "Brand", name: site.shortName },
    manufacturer: { "@type": "Organization", name: site.name, url: site.url },
    offers: {
      "@type": "Offer",
      url,
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
    },
  };
}

export function faqPageSchema(
  faqs: { question: string; answer: string }[],
): JsonLdNode {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function articleSchema(input: {
  title: string;
  description: string;
  slug: string;
  datePublished?: string | Date | null;
  dateModified?: string | Date | null;
}): JsonLdNode {
  const url = absoluteUrl(`/insights/${input.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    author: { "@type": "Organization", name: site.name, url: site.url },
    publisher: {
      "@type": "Organization",
      name: site.name,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/images/site/icon-192.png"),
      },
    },
    datePublished: input.datePublished
      ? new Date(input.datePublished).toISOString()
      : undefined,
    dateModified: input.dateModified
      ? new Date(input.dateModified).toISOString()
      : undefined,
  };
}

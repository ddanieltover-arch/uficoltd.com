export type InternalLink = {
  href: string;
  anchor: string;
};

export type OutboundLink = {
  href: string;
  anchor: string;
};

export type RelatedPageKey =
  | "home"
  | "shop"
  | "about"
  | "contact"
  | "manufacturing"
  | "purchasing"
  | "quality"
  | "product"
  | "category"
  | "faq"
  | "glossary"
  | "insights"
  | "insight";

const OUT = {
  icumsa: {
    href: "https://www.icumsa.org/",
    anchor: "ICUMSA sugar analysis methods",
  },
  iso: {
    href: "https://www.isosugar.org/",
    anchor: "International Sugar Organization market data",
  },
  fao: {
    href: "https://www.fao.org/markets-and-trade/commodities/sugar/en",
    anchor: "FAO sugar commodity overview",
  },
  ocsb: {
    href: "https://www.ocsb.go.th/",
    anchor: "Office of the Cane and Sugar Board (Thailand)",
  },
  incoterms: {
    href: "https://iccwbo.org/business-solutions/incoterms-rules/incoterms-2020/",
    anchor: "ICC Incoterms 2020 rules",
  },
  customs: {
    href: "https://www.customs.go.th/",
    anchor: "Thai Customs Department",
  },
} as const;

export const RELATED_LINKS: Record<
  RelatedPageKey,
  { internal: InternalLink[]; outbound: OutboundLink[] }
> = {
  home: {
    internal: [
      { href: "/shop", anchor: "bulk refined white sugar" },
      { href: "/product/icumsa-45-sugar", anchor: "ICUMSA 45 sugar" },
      { href: "/about-us", anchor: "Thai sugar exporter" },
      { href: "/insights/what-is-icumsa-sugar-grade", anchor: "what is ICUMSA" },
      { href: "/faq", anchor: "sugar export FAQ" },
      { href: "/quality-standard", anchor: "refined sugar quality standard" },
      { href: "/contact-us", anchor: "bulk sugar quote" },
    ],
    outbound: [OUT.icumsa, OUT.ocsb],
  },
  shop: {
    internal: [
      { href: "/", anchor: "wholesale refined sugar from Thailand" },
      { href: "/product/icumsa-45-sugar", anchor: "ICUMSA 45 sugar" },
      { href: "/product/icumsa-100-150-sugar", anchor: "ICUMSA 100-150 sugar" },
      { href: "/insights/icumsa-45-vs-100-150", anchor: "ICUMSA 45 vs 100-150" },
      { href: "/glossary", anchor: "ICUMSA meaning" },
      { href: "/contact-us", anchor: "request a bulk sugar quote" },
      { href: "/insights/wholesale-sugar-packaging-and-moq", anchor: "wholesale sugar packaging" },
    ],
    outbound: [OUT.icumsa, OUT.iso],
  },
  about: {
    internal: [
      { href: "/", anchor: "Thai wholesale refined sugar" },
      { href: "/shop", anchor: "wholesale refined white sugar" },
      { href: "/manufacturing-process", anchor: "sugar manufacturing process Thailand" },
      { href: "/quality-standard", anchor: "refined sugar quality standards" },
      { href: "/insights/how-to-import-refined-sugar-from-thailand", anchor: "import sugar from Thailand" },
      { href: "/contact-us", anchor: "sugar exporter Khonkaen" },
      { href: "/faq", anchor: "sugar export FAQ" },
    ],
    outbound: [OUT.ocsb, OUT.fao],
  },
  contact: {
    internal: [
      { href: "/", anchor: "refined sugar export from Thailand" },
      { href: "/shop", anchor: "bulk refined white sugar" },
      { href: "/purchasing-procedures", anchor: "how to buy wholesale sugar" },
      { href: "/product/icumsa-45-sugar", anchor: "ICUMSA 45 sugar" },
      { href: "/insights/how-to-import-refined-sugar-from-thailand", anchor: "how to import refined sugar from Thailand" },
      { href: "/about-us", anchor: "United Farmer and Industry Co LTD" },
      { href: "/faq", anchor: "how to request a sugar quote" },
    ],
    outbound: [OUT.incoterms, OUT.customs],
  },
  manufacturing: {
    internal: [
      { href: "/", anchor: "wholesale refined sugar from Thailand" },
      { href: "/quality-standard", anchor: "refined sugar quality standard" },
      { href: "/shop", anchor: "bulk refined white sugar" },
      { href: "/insights/refined-white-sugar-export-quality", anchor: "refined sugar export quality control" },
      { href: "/insights/what-is-icumsa-sugar-grade", anchor: "ICUMSA sugar grades" },
      { href: "/purchasing-procedures", anchor: "sugar export documents" },
      { href: "/glossary", anchor: "refined white sugar" },
    ],
    outbound: [OUT.icumsa, OUT.fao],
  },
  purchasing: {
    internal: [
      { href: "/", anchor: "Thailand sugar exporter" },
      { href: "/contact-us", anchor: "bulk sugar quote" },
      { href: "/shop", anchor: "wholesale refined sugar" },
      { href: "/insights/how-to-import-refined-sugar-from-thailand", anchor: "import sugar from Thailand" },
      { href: "/insights/wholesale-sugar-packaging-and-moq", anchor: "sugar export MOQ" },
      { href: "/faq", anchor: "how to request a sugar quote" },
      { href: "/glossary", anchor: "Incoterms" },
    ],
    outbound: [OUT.incoterms, OUT.customs],
  },
  quality: {
    internal: [
      { href: "/", anchor: "wholesale refined sugar Thailand" },
      { href: "/manufacturing-process", anchor: "sugar mill refining process" },
      { href: "/glossary", anchor: "what is ICUMSA" },
      { href: "/insights/refined-white-sugar-export-quality", anchor: "refined sugar export quality" },
      { href: "/product/icumsa-45-sugar", anchor: "ICUMSA 45 sugar" },
      { href: "/shop", anchor: "bulk refined white sugar" },
      { href: "/faq", anchor: "ICUMSA 45 FAQ" },
    ],
    outbound: [OUT.icumsa, OUT.iso],
  },
  product: {
    internal: [
      { href: "/", anchor: "wholesale refined sugar from Thailand" },
      { href: "/shop", anchor: "bulk refined white sugar" },
      { href: "/insights/what-is-icumsa-sugar-grade", anchor: "what is an ICUMSA sugar grade" },
      { href: "/glossary", anchor: "ICUMSA meaning" },
      { href: "/contact-us", anchor: "request a bulk sugar quote" },
      { href: "/purchasing-procedures", anchor: "how to buy wholesale sugar" },
      { href: "/faq", anchor: "sugar export FAQ" },
    ],
    outbound: [OUT.icumsa, OUT.iso],
  },
  category: {
    internal: [
      { href: "/", anchor: "Thai sugar exporter" },
      { href: "/shop", anchor: "wholesale refined sugar" },
      { href: "/glossary", anchor: "ICUMSA sugar grades" },
      { href: "/insights/icumsa-45-vs-100-150", anchor: "ICUMSA 45 vs 100-150" },
      { href: "/quality-standard", anchor: "refined sugar quality standards" },
      { href: "/contact-us", anchor: "bulk sugar quote" },
      { href: "/faq", anchor: "sugar export FAQ" },
    ],
    outbound: [OUT.icumsa, OUT.fao],
  },
  faq: {
    internal: [
      { href: "/", anchor: "wholesale refined sugar from Thailand" },
      { href: "/glossary", anchor: "ICUMSA meaning" },
      { href: "/shop", anchor: "bulk refined white sugar" },
      { href: "/contact-us", anchor: "how to request a sugar quote" },
      { href: "/insights/what-is-icumsa-sugar-grade", anchor: "what is ICUMSA" },
      { href: "/purchasing-procedures", anchor: "sugar export documents" },
      { href: "/about-us", anchor: "Thai sugar exporter" },
    ],
    outbound: [OUT.icumsa, OUT.incoterms],
  },
  glossary: {
    internal: [
      { href: "/", anchor: "refined sugar export from Thailand" },
      { href: "/insights/what-is-icumsa-sugar-grade", anchor: "what is an ICUMSA sugar grade" },
      { href: "/product/icumsa-45-sugar", anchor: "ICUMSA 45 sugar" },
      { href: "/faq", anchor: "sugar export FAQ" },
      { href: "/shop", anchor: "wholesale refined white sugar" },
      { href: "/quality-standard", anchor: "refined sugar quality standard" },
      { href: "/insights/icumsa-45-vs-100-150", anchor: "ICUMSA 45 vs 100-150" },
    ],
    outbound: [OUT.icumsa, OUT.incoterms],
  },
  insights: {
    internal: [
      { href: "/", anchor: "wholesale refined sugar Thailand" },
      { href: "/faq", anchor: "sugar export FAQ" },
      { href: "/glossary", anchor: "ICUMSA meaning" },
      { href: "/shop", anchor: "bulk refined white sugar" },
      { href: "/product/icumsa-45-sugar", anchor: "ICUMSA 45 sugar" },
      { href: "/contact-us", anchor: "bulk sugar quote" },
      { href: "/quality-standard", anchor: "refined sugar quality standards" },
    ],
    outbound: [OUT.fao, OUT.icumsa],
  },
  insight: {
    internal: [
      { href: "/", anchor: "wholesale refined sugar from Thailand" },
      { href: "/insights", anchor: "sugar export guides" },
      { href: "/shop", anchor: "wholesale refined white sugar" },
      { href: "/faq", anchor: "sugar export FAQ" },
      { href: "/glossary", anchor: "ICUMSA meaning" },
      { href: "/contact-us", anchor: "request a bulk sugar quote" },
      { href: "/about-us", anchor: "Thai sugar exporter" },
    ],
    outbound: [OUT.icumsa, OUT.fao],
  },
};

const INSIGHT_EXTRAS: Record<string, InternalLink[]> = {
  "what-is-icumsa-sugar-grade": [
    { href: "/product/icumsa-45-sugar", anchor: "ICUMSA 45 sugar" },
    { href: "/insights/icumsa-45-vs-100-150", anchor: "ICUMSA 45 vs 100-150" },
  ],
  "icumsa-45-vs-100-150": [
    { href: "/product/icumsa-45-sugar", anchor: "ICUMSA 45 sugar" },
    { href: "/product/icumsa-100-150-sugar", anchor: "ICUMSA 100-150 sugar" },
  ],
  "how-to-import-refined-sugar-from-thailand": [
    { href: "/purchasing-procedures", anchor: "sugar export documents" },
    { href: "/contact-us", anchor: "bulk sugar quote" },
  ],
  "wholesale-sugar-packaging-and-moq": [
    { href: "/purchasing-procedures", anchor: "how to buy wholesale sugar" },
    { href: "/shop", anchor: "bulk refined white sugar" },
  ],
  "refined-white-sugar-export-quality": [
    { href: "/quality-standard", anchor: "refined sugar quality standards" },
    { href: "/manufacturing-process", anchor: "sugar manufacturing process Thailand" },
  ],
  "icumsa-45-sugar-for-food-manufacturers": [
    { href: "/product/icumsa-45-sugar", anchor: "ICUMSA 45 sugar" },
    { href: "/insights/icumsa-45-vs-100-150", anchor: "ICUMSA 45 vs 100-150" },
  ],
};

const INSIGHT_OUTBOUND: Record<string, OutboundLink[]> = {
  "how-to-import-refined-sugar-from-thailand": [OUT.incoterms, OUT.customs],
  "wholesale-sugar-packaging-and-moq": [OUT.iso, OUT.incoterms],
  "refined-white-sugar-export-quality": [OUT.icumsa, OUT.ocsb],
};

function uniqueByHref(links: InternalLink[]): InternalLink[] {
  const seen = new Set<string>();
  return links.filter((link) => {
    if (seen.has(link.href)) return false;
    seen.add(link.href);
    return true;
  });
}

export function getRelatedLinks(
  page: RelatedPageKey,
  options?: {
    currentPath?: string;
    extraInternal?: InternalLink[];
    outbound?: OutboundLink[];
  },
): { internal: InternalLink[]; outbound: OutboundLink[] } {
  const base = RELATED_LINKS[page];
  const current = options?.currentPath?.replace(/\/$/, "") || "";
  const internal = uniqueByHref([...(options?.extraInternal ?? []), ...base.internal])
    .filter((link) => link.href.replace(/\/$/, "") !== current)
    .slice(0, 7);

  return {
    internal,
    outbound: (options?.outbound ?? base.outbound).slice(0, 2),
  };
}

export function getInsightRelatedLinks(slug: string) {
  return getRelatedLinks("insight", {
    currentPath: `/insights/${slug}`,
    extraInternal: INSIGHT_EXTRAS[slug],
    outbound: INSIGHT_OUTBOUND[slug],
  });
}

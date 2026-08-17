import Link from "next/link";
import {
  getInsightRelatedLinks,
  getRelatedLinks,
  type RelatedPageKey,
  type InternalLink,
  type OutboundLink,
} from "@/config/related-links";

type RelatedLinksProps = {
  page: RelatedPageKey;
  currentPath?: string;
  extraInternal?: InternalLink[];
  outbound?: OutboundLink[];
  insightSlug?: string;
  className?: string;
};

export function RelatedLinks({
  page,
  currentPath,
  extraInternal,
  outbound,
  insightSlug,
  className,
}: RelatedLinksProps) {
  const links = insightSlug
    ? getInsightRelatedLinks(insightSlug)
    : getRelatedLinks(page, { currentPath, extraInternal, outbound });

  if (links.internal.length === 0 && links.outbound.length === 0) {
    return null;
  }

  return (
    <nav
      aria-labelledby="related-links-heading"
      className={className ?? "mt-12 rounded-2xl border border-slate-200 bg-white p-6 md:p-8"}
    >
      <h2 id="related-links-heading" className="text-xl font-bold text-slate-900">
        Related sugar export pages
      </h2>
      <p className="mt-2 text-sm text-slate-600">
        Keyword links to matching pages on this site, plus two industry references.
      </p>
      <ul className="mt-5 grid gap-2 sm:grid-cols-2">
        {links.internal.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="font-medium text-brand-green hover:underline"
            >
              {item.anchor}
            </Link>
          </li>
        ))}
      </ul>
      <h3 className="mt-8 text-sm font-semibold uppercase tracking-wide text-slate-500">
        Authoritative references
      </h3>
      <ul className="mt-3 space-y-2">
        {links.outbound.map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-700 underline decoration-slate-300 underline-offset-2 hover:text-brand-green"
            >
              {item.anchor}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

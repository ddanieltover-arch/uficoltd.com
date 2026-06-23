/** Local image paths — all assets served from /public (no remote WordPress URLs). */

export const siteImages = {
  logo: "/images/site/logo.svg",
  hero: "/images/products/Wholesale-Refined-White-Sugar.webp",
  intro: "/images/products/Thai-Organic-Sugar.webp",
  skills: "/images/products/Untitled-design-6-1.webp",
  contactBg: "/images/products/Fine-Grain-White-Sugar.webp",
  contactHero: "/images/products/Wholesale-Refined-White-Sugar.webp",
  overview: "/images/products/Untitled-design-6-1.webp",
  categoryCommonSugars: "/images/products/Brown-Sugar-1.webp",
} as const;

export const productImages = {
  icumsa45: "/images/products/Refined-Icumsa-45-RBU-Standard.webp",
  thaiBrown: "/images/products/Thai-Brown-Sugar.webp",
  fineGrain: "/images/products/Fine-Grain-White-Sugar.webp",
  wholesale: "/images/products/Wholesale-Refined-White-Sugar.webp",
  specialGrade: "/images/products/Special-Grade-White-Sugar.webp",
  manufacturing: "/images/products/Untitled-design-6-1.webp",
} as const;

export const categoryImages: Record<string, string> = {
  "common-sugars": siteImages.categoryCommonSugars,
  icumsa: productImages.icumsa45,
  "thai-sugars": productImages.thaiBrown,
  "white-refined-sugars": productImages.fineGrain,
};

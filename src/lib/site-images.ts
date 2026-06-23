/** Local image paths — all assets served from /public (no remote WordPress URLs). */

export const marketingImages = {
  warehouseProcessing: "/images/marketing/warehouse-processing.png",
  warehouseForklift: "/images/marketing/warehouse-forklift.png",
  shippingContainer: "/images/marketing/shipping-container.png",
  sugarVarieties: "/images/marketing/sugar-varieties.png",
  sugarSackScoop: "/images/marketing/sugar-sack-scoop.png",
} as const;

export const siteImages = {
  logo: "/images/site/logo.png",
  hero: "/images/site/hero.webp",
  ogImage: "/images/site/og-image.png",
  favicon: "/images/site/favicon.ico",
  intro: marketingImages.sugarSackScoop,
  skills: marketingImages.shippingContainer,
  contactBg: marketingImages.warehouseProcessing,
  contactHero: marketingImages.warehouseForklift,
  overview: marketingImages.warehouseProcessing,
  categoryCommonSugars: "/images/products/Brown-Sugar-1.webp",
} as const;

export const productImages = {
  icumsa45: "/images/products/Refined-Icumsa-45-RBU-Standard.webp",
  thaiBrown: "/images/products/Thai-Brown-Sugar.webp",
  fineGrain: "/images/products/Fine-Grain-White-Sugar.webp",
  wholesale: "/images/products/Wholesale-Refined-White-Sugar.webp",
  specialGrade: "/images/products/Special-Grade-White-Sugar.webp",
  manufacturing: marketingImages.warehouseProcessing,
  purchasing: marketingImages.shippingContainer,
  quality: marketingImages.sugarVarieties,
} as const;

export const categoryImages: Record<string, string> = {
  "common-sugars": siteImages.categoryCommonSugars,
  icumsa: productImages.icumsa45,
  "thai-sugars": productImages.thaiBrown,
  "white-refined-sugars": productImages.fineGrain,
};

export const aboutGallery = [
  { src: marketingImages.warehouseForklift, alt: "Warehouse logistics and forklift operations" },
  { src: marketingImages.shippingContainer, alt: "Loading sugar bags for export shipment" },
  { src: marketingImages.warehouseProcessing, alt: "Industrial sugar processing facility" },
  { src: marketingImages.sugarSackScoop, alt: "Premium refined white sugar" },
  { src: marketingImages.sugarVarieties, alt: "Range of sugar varieties and grades" },
] as const;

export const operationsGallery = [
  { src: marketingImages.warehouseForklift, alt: "Bulk sugar warehouse storage", label: "Warehouse & storage" },
  { src: marketingImages.warehouseProcessing, alt: "Sugar processing and bagging", label: "Processing & bagging" },
  { src: marketingImages.shippingContainer, alt: "Export container loading", label: "Global export" },
] as const;

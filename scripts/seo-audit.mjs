import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

function mustExist(relativePath) {
  const full = join(root, relativePath);
  if (!existsSync(full)) {
    failures.push(`Missing file: ${relativePath}`);
    return "";
  }
  return readFileSync(full, "utf8");
}

function mustContain(relativePath, snippets) {
  const text = mustExist(relativePath);
  if (!text) return;
  for (const snippet of snippets) {
    if (!text.includes(snippet)) {
      failures.push(`${relativePath} is missing "${snippet}"`);
    }
  }
}

mustContain("src/lib/seo.ts", ["buildPageMetadata", "alternates"]);
mustContain("src/components/seo/JsonLd.tsx", ["application/ld+json"]);
mustContain("src/app/robots.ts", ["GPTBot", "/admin", "/api/"]);
mustContain("src/app/sitemap.ts", ["/faq", "/glossary", "/insights"]);
mustContain("src/app/(site)/layout.tsx", ["organizationSchema", "websiteSchema"]);
mustContain("src/app/admin/layout.tsx", ["index: false"]);
mustContain("next.config.ts", ["icumsa-100-150-sugar-2", "X-Content-Type-Options"]);
mustContain("public/llms.txt", ["United Farmer and Industry"]);
mustExist("src/app/(site)/faq/page.tsx");
mustExist("src/app/(site)/glossary/page.tsx");
mustExist("src/components/seo/RelatedLinks.tsx");
mustContain("src/config/related-links.ts", [
  "wholesale refined sugar from Thailand",
  "https://www.icumsa.org/",
  "https://www.ocsb.go.th/",
]);

if (failures.length > 0) {
  console.error("SEO audit failed:\n" + failures.map((f) => `- ${f}`).join("\n"));
  process.exit(1);
}

console.log("SEO audit passed.");

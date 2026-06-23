export function decodeEntities(text: string): string {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&nbsp;/g, " ");
}

export type ContentSection = {
  title: string;
  number?: number;
  blocks: { label?: string; body: string }[];
};

const SECTION_HEADER = /^(?:(\d+)\.\s+|Step\s+(\d+):\s*)(.+)$/i;
const SUB_HEADER = /^([A-Za-z][^:]{0,60}):$/;

function splitInlineSteps(text: string): string[] {
  const parts = text.split(/(?=Step\s+\d+:)/i).map((p) => p.trim()).filter(Boolean);
  return parts.length > 1 ? parts : [text];
}

function parseBlock(text: string): { label?: string; body: string } {
  const decoded = decodeEntities(text);
  const colonIdx = decoded.indexOf(":");

  if (colonIdx > 0 && colonIdx < 60 && !SECTION_HEADER.test(decoded)) {
    const label = decoded.slice(0, colonIdx).trim();
    const body = decoded.slice(colonIdx + 1).trim();
    if (body && label.length < 50) {
      return { label, body };
    }
  }

  return { body: decoded };
}

function parseStepHeader(paragraph: string): { number: number; title: string; tail: string } | null {
  const match = paragraph.match(/^Step\s+(\d+):\s*(.*)$/i);
  if (!match) return null;

  const number = Number(match[1]);
  const rest = match[2];
  const embedded = rest.match(/^(.+?)([A-Z][A-Za-z]+(?:\s+[&][A-Za-z]+|[A-Za-z]+)*:)(.*)$/);

  if (embedded) {
    return {
      number,
      title: embedded[1].trim(),
      tail: `${embedded[2]}${embedded[3]}`,
    };
  }

  return { number, title: rest.trim(), tail: "" };
}

export function parsePageSections(paragraphs: string[]): {
  intro: string | null;
  sections: ContentSection[];
} {
  const decoded = paragraphs.map(decodeEntities);
  const expanded: string[] = [];

  for (const paragraph of decoded) {
    expanded.push(...splitInlineSteps(paragraph));
  }

  let intro: string | null = null;
  const sections: ContentSection[] = [];
  let current: ContentSection | null = null;

  for (const paragraph of expanded) {
    const stepHeader = parseStepHeader(paragraph);

    if (stepHeader) {
      current = {
        title: stepHeader.title,
        number: stepHeader.number,
        blocks: stepHeader.tail ? [parseBlock(stepHeader.tail)] : [],
      };
      sections.push(current);
      continue;
    }

    const sectionMatch = paragraph.match(SECTION_HEADER);

    if (sectionMatch) {
      const number = Number(sectionMatch[1] ?? sectionMatch[2]);
      const title = sectionMatch[3].trim();
      current = { title, number, blocks: [] };
      sections.push(current);
      continue;
    }

    if (SUB_HEADER.test(paragraph.trim())) {
      if (!current) {
        if (!intro) intro = paragraph;
        else current = { title: "Overview", blocks: [{ body: paragraph }] };
        if (!sections.includes(current!)) sections.push(current!);
      }
      current?.blocks.push({ label: paragraph.replace(/:$/, ""), body: "" });
      continue;
    }

    if (!current) {
      if (!intro) intro = paragraph;
      else {
        current = { title: "Overview", blocks: [{ body: paragraph }] };
        sections.push(current);
      }
      continue;
    }

    const last = current.blocks[current.blocks.length - 1];
    const block = parseBlock(paragraph);

    if (last && !last.body && block.label) {
      last.label = block.label;
      last.body = block.body;
    } else if (last && !last.label && !block.label && last.body) {
      last.body = `${last.body} ${block.body}`.trim();
    } else {
      current.blocks.push(block);
    }
  }

  return { intro, sections };
}

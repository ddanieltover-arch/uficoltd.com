export const QUOTE_STATUSES = [
  "NEW",
  "IN_PROGRESS",
  "AWAITING_INFO",
  "QUOTED",
  "CLOSED",
  "SPAM",
  "ARCHIVED",
] as const;

export const INQUIRY_STATUSES = [
  "NEW",
  "IN_PROGRESS",
  "CLOSED",
  "SPAM",
  "ARCHIVED",
] as const;

export const APPLICATION_STATUSES = [
  "NEW",
  "UNDER_REVIEW",
  "APPROVED",
  "REJECTED",
  "SPAM",
] as const;

export const PUBLISH_STATUSES = ["DRAFT", "PUBLISHED", "ARCHIVED"] as const;

export function StatusSelect({
  name = "status",
  value,
  options,
}: {
  name?: string;
  value: string;
  options: readonly string[];
}) {
  return (
    <select
      name={name}
      defaultValue={value}
      className="rounded-[var(--brand-radius-md)] border border-brand-border bg-brand-surface px-2 py-1.5 text-sm"
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt.replaceAll("_", " ")}
        </option>
      ))}
    </select>
  );
}

export function AnswerCapsule({ children }: { children: React.ReactNode }) {
  return (
    <section
      id="answer"
      aria-label="Quick answer"
      className="mb-6 max-w-2xl rounded-2xl border border-brand-green/20 bg-brand-green/5 px-5 py-4"
    >
      <p className="text-base leading-relaxed text-slate-800">
        <strong className="font-semibold text-slate-900">Quick answer: </strong>
        {children}
      </p>
    </section>
  );
}

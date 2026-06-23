import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[50vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="mb-4 text-4xl font-bold text-slate-900">Page not found</h1>
      <p className="mb-8 text-slate-600">The page you are looking for does not exist.</p>
      <Link
        href="/"
        className="rounded-lg bg-brand-green px-6 py-3 font-semibold text-white hover:bg-brand-green-dark"
      >
        Back to home
      </Link>
    </section>
  );
}

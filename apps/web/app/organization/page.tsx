import Link from 'next/link';

export default function OrganizationPage() {
  return (
    <main className="mx-auto min-h-screen max-w-5xl px-6 py-10">
      <Link href="/" className="text-sm font-medium text-blue-600">
        ← Back to Retrouve
      </Link>

      <p className="mt-12 text-sm font-semibold uppercase tracking-widest text-blue-600">
        Organization workspace
      </p>

      <h1 className="mt-3 text-4xl font-bold">Organization dashboard</h1>

      <p className="mt-4 max-w-xl leading-7 text-slate-600">
        This is the starting point for organization tools. We will add the
        overview, item management, reports, and team screens here.
      </p>

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">
        <p className="font-semibold">Workspace ready for UI integration</p>
        <p className="mt-2 text-sm text-slate-600">
          No organization data or backend connection is configured yet.
        </p>
      </div>
    </main>
  );
}

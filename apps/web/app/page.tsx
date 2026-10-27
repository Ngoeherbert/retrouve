import Link from 'next/link';

const dashboards = [
  {
    title: 'Organization dashboard',
    description:
      'Manage reported items, coordinate your team, and help reunite belongings with their owners.',
    href: '/organization',
    label: 'For organizations',
  },
  {
    title: 'Admin dashboard',
    description:
      'Oversee platform activity, organizations, reports, and moderation.',
    href: '/admin',
    label: 'Platform management',
  },
];

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-8 sm:px-10">
      <header className="flex items-center justify-between">
        <Link href="/" className="text-2xl font-extrabold tracking-tight">
          retrouv<span className="text-blue-600">e</span>
        </Link>

        <span className="rounded-full border border-white/80 bg-white/70 px-4 py-2 text-xs font-medium text-slate-600 shadow-sm backdrop-blur-xl">
          Web workspace
        </span>
      </header>

      <section className="flex flex-1 flex-col justify-center py-16">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
          Lost. Found. Reunited.
        </p>

        <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">
          Welcome to Retrouve.
        </h1>

        <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
          A shared space for people and organizations to manage lost-and-found
          items. Choose a workspace to preview the web experience.
        </p>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {dashboards.map((dashboard) => (
            <Link
              key={dashboard.href}
              href={dashboard.href}
              className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                {dashboard.label}
              </span>

              <h2 className="mt-4 text-xl font-bold">
                {dashboard.title}
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                {dashboard.description}
              </p>

              <span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-blue-600">
                Open workspace <span aria-hidden="true">→</span>
              </span>
            </Link>
          ))}
        </div>

        <p className="mt-8 text-xs text-slate-500">
          Frontend prototype · Mock data only · No backend connected
        </p>
      </section>
    </main>
  );
}

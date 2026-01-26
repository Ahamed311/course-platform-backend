import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface NavigationProps {
  breadcrumbs: BreadcrumbItem[];
  title: string;
}

export default function Navigation({ breadcrumbs, title }: NavigationProps) {
  return (
    <header className="border-b bg-white px-6 py-4">
      <nav className="flex items-center space-x-2 text-sm text-zinc-500">
        {breadcrumbs.map((item, index) => (
          <div key={index} className="flex items-center space-x-2">
            {index > 0 && <span>→</span>}
            {item.href ? (
              <Link href={item.href} className="hover:text-zinc-700 transition">
                {item.label}
              </Link>
            ) : (
              <span>{item.label}</span>
            )}
          </div>
        ))}
      </nav>
      <h1 className="mt-1 text-xl font-semibold text-zinc-900">{title}</h1>
    </header>
  );
}
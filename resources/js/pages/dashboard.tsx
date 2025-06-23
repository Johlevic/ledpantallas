import { useEffect } from 'react';
import AppLayout from '@/layouts/app-layout';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';

// Simulación de datos de breadcrumbs
const breadcrumbs = [
  {
    title: 'Dashboard',
    href: '/admin/dashboard',
  },
];

export default function Dashboard() {
  useEffect(() => {
    document.title = 'Dashboard';
  }, []);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border"
            >
              <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
            </div>
          ))}
        </div>

        <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border md:min-h-min">
          <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
        </div>
      </div>
    </AppLayout>
  );
}

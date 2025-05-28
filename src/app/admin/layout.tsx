// This admin layout has been removed as the admin panel is no longer part of the project.
// The /admin route and its sub-routes can be deleted.
import type { ReactNode } from 'react';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <p>Admin panel has been removed.</p>
      {children}
    </div>
  );
}

import { Suspense } from 'react';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Frontend case by Eyup',
  description: 'Blog Detail Page - Task Development',
};

function Loading() {
  return <p>Loading !...</p>;
}

export default function BlogDetailLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </main>
  );
}

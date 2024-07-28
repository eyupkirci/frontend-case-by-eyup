import { Suspense } from 'react';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Frontend case by Eyup',
  description: 'Blog Archive Page - Task Development',
};

function Loading() {
  return <p>Loading !...</p>;
}

export default function BlogsLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </main>
  );
}

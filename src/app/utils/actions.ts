'use server';

import { PreprSdk } from '@/server/prepr';

export async function getAllBlogs() {
  const { Blogs } = await PreprSdk.GetBlogs({ limit: 0 });
  return Blogs;
}

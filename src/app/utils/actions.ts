'use server';

import { PreprSdk } from '@/server/prepr';

export async function getAllBlogs() {
  const { Blogs } = await PreprSdk.PopularBlogs({ locale: 'en-GB', limit: 0 });
  return Blogs;
}

export async function getBlogsByTitle(text: string) {
  const { Blogs } = await PreprSdk.BlogsByTitle({ where: { title: text } });
  return Blogs;
}

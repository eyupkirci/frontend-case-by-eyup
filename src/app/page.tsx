'use server';

import Card from '@/app/components/Card';
import type { ICard } from '@/app/types';
import { PreprSdk } from '@/server/prepr';

export default async function Home() {
  const { Blogs } = await PreprSdk.PopularBlogs({ locale: 'en-GB', limit: 3 });
  const { items }: ICard[] = Blogs;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-white text-black dark:bg-gray-100">
      {/* Banner */}
      {/* As a user, I want to see a banner on the homepage so I know what the website is about.
        - Banner with a title, description and background image */}
      <section className="mt-px w-full bg-2digits-bg bg-[url('/assets/2digits.png')] bg-cover bg-center bg-no-repeat px-6 py-48 text-center text-white">
        <h2 className="m-auto max-w-screen-md text-4xl font-bold uppercase md:text-6xl lg:text-8xl">
          Welcome to the 2DIGITS case!
        </h2>

        <p className="m-auto mt-6 max-w-screen-md text-lg">
          This case dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
          labore et dolore magna aliqua. Magnis dis parturient montes nascetur ridiculus mus mauris
          vitae ultricies. Commodo odio aenean sed adipiscing diam donec adipiscing tristique risus.
        </p>
      </section>

      {/* Newest Blogs */}
      {/* As a user, I want to see the latest blogs on the homepage so I know what's going on.
        - Show the three latest blogs with a clickthrough to the blog detail page
        - When there are no blogs found hide this block and show a message that there are no blog posts found */}
      <section className="m-4 bg-white text-black dark:bg-gray-100">
        <h2 className="mt-12 py-5 text-3xl md:text-5xl">De nieuwste blogs</h2>

        {items?.length > 1 ? (
          <div className="mx-auto flex w-full max-w-screen-2xl flex-col gap-12 bg-white py-5 dark:bg-gray-100 md:m-auto md:flex-row">
            {items?.map((item: ICard) => <Card key={item._id} data={item} />)}
          </div>
        ) : (
          <p>Geen blog post gevonden.</p>
        )}
      </section>
    </main>
  );
}

'use server';

import Image from 'next/image';

import Card from '@/app/components/Card';
import type { ICard } from '@/app/types';
import { PreprSdk } from '@/server/prepr';

export default async function BlogDetail({ params }: { params: { slug: string } }) {
  const { Blog } = await PreprSdk.BlogBySlug({ slug: params.slug });
  const { Similar_Blogs } = await PreprSdk.Similar_Blogs({ limit: 3, similarBlogsId: Blog._id });

  return (
    <article className="flex min-h-screen flex-col justify-between text-black dark:bg-white dark:text-black">
      {/* As a user, I want to be able to read a blog post so I can see what it is about.
        - Able to read a blog article on a separate page
        - Show a thumbnail at the top of the page
        - Show the tags above the blog title
        - Show a title
        - Show the excerpt */}

      <div className="relative h-[450] w-full overflow-hidden">
        <Image
          src={Blog?.banner_image?.url as string}
          alt={Blog?.title ?? ''}
          // width={800}
          // height={400}
          fill={true}
          objectFit="cover"
          objectPosition="top"
        />
      </div>

      <section className="w-full bg-white">
        <div className="max-w-[1000] bg-white p-6">
          <span className="inline-block rounded bg-gray-100 p-2 text-sm font-medium uppercase dark:text-gray-700">
            {Blog?.categories[0]?.slug}
          </span>

          <h1 className="my-6 text-4xl font-bold dark:text-black">{Blog?.title}</h1>

          <div className="w-full">
            {Blog?.content?.map((item, index) => (
              <p key={`index-${index + 1}`} className="my-2 dark:text-gray-700">
                {item?.text}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* As a user, I want to be able to see a relevant blog post from the current blog post so I can read more information on this topic.
        - When there are related items, show them with a maximum of 3 items
        - When there are no items found, hide the block without a message */}
      <section className="w-full bg-[#efeff8] p-6">
        <h2 className="mt-12 py-5 text-3xl dark:text-black md:text-5xl">Gerelateerde blogs</h2>

        {Similar_Blogs?.items?.length > 1 ? (
          <div className="mx-auto flex w-full max-w-screen-2xl flex-col gap-12 py-5 md:m-auto md:flex-row">
            {Similar_Blogs?.items.map((item) => (
              <Card key={item._id} data={item as unknown as ICard} />
            ))}
          </div>
        ) : (
          <p>Geen blog post gevonden.</p>
        )}
      </section>
    </article>
  );
}

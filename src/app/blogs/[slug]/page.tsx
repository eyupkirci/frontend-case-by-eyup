'use server';

import Image from 'next/image';

import Card from '@/app/components/Card';
import type { ICard, IHTMLContent } from '@/app/types';
import { PreprSdk } from '@/server/prepr';

// Show the blog HTML rendered on a safe way, without dangerouslySetInnerHTML
/**
 * This funcstion render blog HTML on a safe way, without dangerouslySetInnerHTML Instead of using
 * this function, html-react-parser package can be imported but keept as much as dependency-free
 *
 * @param section:{text:string, Html:string}
 * @param index: Number
 * @returns JSX Element
 */

const customHTMLTextContentRenderer = (section: IHTMLContent, index: number) => {
  //checks if it is an html element by checking first and last char
  if (!section.html.startsWith('<') && !section.html.endsWith('>')) {
    return <p key={index}>Problem with HTML string</p>;
  }

  if (section.html.startsWith('<p>')) {
    return (
      <p className="font-[200]" key={index}>
        {section.text}
      </p>
    );
  } else if (section.html.startsWith('<h1>')) {
    return (
      <h1 className="text-9xl" key={index}>
        {`H1 - ${section.text}`}
      </h1>
    );
  } else if (section.html.startsWith('<h2>')) {
    return (
      <h2 className="text-5xl" key={index}>
        {`H2 - ${section.text}`}
      </h2>
    );
  } else if (section.html.startsWith('<h3>')) {
    return (
      <h3 className="text-4xl" key={index}>
        {`H3 - ${section.text}`}
      </h3>
    );
  } else if (section.html.startsWith('<h4>')) {
    return (
      <h4 className="text-3xl" key={index}>
        {`H4 - ${section.text}`}
      </h4>
    );
  } else if (section.html.startsWith('<h5>')) {
    return <h5 className="text-xl" key={index}>{`H5 - ${section.text}`}</h5>;
  } else if (section.html.startsWith('<h6>')) {
    return (
      <h6 className="text-sm" key={index}>
        {`H6 - ${section.text}`}
      </h6>
    );
  } else if (section.html.startsWith('<ul>')) {
    return (
      <ul className="list-inside list-disc" key={section.text}>
        {section.html
          .split('<ul>')[1]
          ?.split('</ul>')[0]
          ?.split('<li>')
          .filter((item) => item.endsWith('</li>'))
          .map((item) => item.split('</li>')[0])
          .map((item) => (
            <li className="mx-5 text-sm" key={item?.toString()}>
              {item}
            </li>
          ))}
      </ul>
    );
  }
};

export default async function BlogDetail({ params }: { params: { slug: string } }) {
  const { Blog } = await PreprSdk.BlogBySlug({ slug: params.slug });
  const { Similar_Blogs } = await PreprSdk.Similar_Blogs({ limit: 3, similarBlogsId: Blog?._id });

  return (
    <article className="flex min-h-screen flex-col justify-between text-black dark:bg-white dark:text-black">
      {/* As a user, I want to be able to read a blog post so I can see what it is about.
        - Able to read a blog article on a separate page
        - Show a thumbnail at the top of the page
        - Show the tags above the blog title
        - Show a title
        - Show the excerpt 
        - Show the blog HTML rendered on a safe way, without dangerouslySetInnerHTML */}

      <div className="relative h-[450] w-full overflow-hidden">
        <Image
          src={Blog?.banner_image.url as string}
          alt={Blog?.title ?? ''}
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

          <h1 className="my-6 text-5xl font-black dark:text-black">{Blog?.title}</h1>

          <div className="w-full">
            {Blog?.content?.map((item, index) => (
              <div className="py-2" key={index}>
                {customHTMLTextContentRenderer(item as IHTMLContent, index)}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* As a user, I want to be able to see a relevant blog post from the current blog post so I can read more information on this topic.
        - When there are related items, show them with a maximum of 3 items
        - When there are no items found, hide the block without a message */}
      <section className="w-full bg-[#efeff8] p-6">
        <h2 className="mt-12 py-5 text-3xl dark:text-black md:text-5xl">Gerelateerde blogs</h2>

        {Similar_Blogs && Similar_Blogs.items.length > 1 ? (
          <div className="mx-auto flex w-full max-w-screen-2xl flex-col gap-12 py-5 md:m-auto md:flex-row">
            {Similar_Blogs.items.map((item) => (
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

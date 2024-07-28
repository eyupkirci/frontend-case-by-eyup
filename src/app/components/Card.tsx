import Image from 'next/image';

import type { ICard } from '@/app/types';

const Card: React.FC<{ data: ICard }> = ({ data }: ICard) => {
  const { _slug, title, content, categories, banner_image } = data;

  return (
    <div className="m-2">
      <a href={`/blogs/${_slug}`} className="flex flex-col items-stretch">
        <div className="relative">
          <div className="relative h-[240] w-full overflow-hidden rounded-lg">
            <Image
              className="rounded-lg"
              src={banner_image?.url as string}
              sizes="(max-width: 240px)"
              alt={title ?? ''}
              objectFit="cover"
              layout="fill"
            />
          </div>

          <span className="absolute bottom-1 left-1 m-3 rounded bg-gray-100 p-2 text-xs font-light uppercase text-black">
            {categories[0].slug}
          </span>
        </div>

        <div className="py-5">
          <h5 className="mb-2 text-2xl font-bold text-gray-900">{title}</h5>

          <p className="overflow-hidden text-clip py-5 text-sm font-thin tracking-tight text-gray-600">
            {content[0].text}
          </p>

          <span className="inline-flex items-center rounded bg-transparent p-2 text-center text-sm font-medium text-gray-900 hover:bg-white focus:bg-gray-400 focus:outline-none">
            Read more
            <svg
              className="ms-2 size-3.5 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </span>
        </div>
      </a>
    </div>
  );
};

export default Card;

'use client';

import { useEffect, useState } from 'react';

import Card from '@/app/components/Card';
import type { ICard, IInputState, PaginationState } from '@/app/types';
import { getAllBlogs } from '@/app/utils/actions';
import { createPagination } from '@/app/utils/functions';

const ITEM_PER_PAGE = 9;

export default function Blogs() {
  const [blogs, setBlogs] = useState<ICard[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<ICard[]>([]);
  const [search, setSearch] = useState<IInputState>({
    input: '',
    slug: { label: 'all blogs', value: '' },
  });
  const [searchParam, setSearchParam] = useState<string>('');
  const [pagination, setPagination] = useState<PaginationState>({
    currentPage: 1,
    totalPages: 1,
    startIndex: 0,
    endIndex: ITEM_PER_PAGE,
  });

  //initial data fetch
  useEffect(() => {
    const fetchPosts = () => {
      getAllBlogs()
        .then((response) => {
          const { items } = response;
          setBlogs(items);
          setFilteredBlogs(items);
          setPagination({
            ...pagination,
            totalPages: Math.max(Math.ceil(items.length / ITEM_PER_PAGE), 1),
            currentPage: 1,
            startIndex: 0,
            endIndex: ITEM_PER_PAGE,
          });
        })
        .catch((error: unknown) => {
          console.log('🚀 ~ Error ~ fetchPosts:', error);
        });
    };

    fetchPosts();
  }, []);

  //handles side UI effects
  useEffect(() => {
    const handleFilter = () => {
      const NewList = blogs
        .filter((blog) => blog.title.toLowerCase().includes(search.input.toLowerCase()))
        .filter((blog) =>
          blog.categories[0].slug.toLowerCase().includes(search.slug.value.toLowerCase()),
        );

      setPagination({
        ...pagination,
        totalPages: Math.max(Math.ceil(NewList.length / ITEM_PER_PAGE), 1),
        currentPage: 1,
        startIndex: 0,
        endIndex: Math.min(ITEM_PER_PAGE, NewList.length),
      });

      setFilteredBlogs(NewList);
    };
    handleFilter();
  }, [blogs, searchParam, search.input, search.slug.value]);

  //sets input value
  const handleInput = (text: string) => {
    setSearchParam(text);
  };

  //pagination controls
  const handleNext = () => {
    if (pagination.currentPage < pagination.totalPages) {
      setPagination({
        ...pagination,
        currentPage: pagination.currentPage + 1,
        startIndex: pagination.startIndex + ITEM_PER_PAGE,
        endIndex: Math.min(
          pagination.startIndex + ITEM_PER_PAGE + ITEM_PER_PAGE,
          filteredBlogs.length,
        ),
      });
    }
  };
  const handlePrev = () => {
    if (pagination.currentPage > 1) {
      setPagination({
        ...pagination,
        currentPage: pagination.currentPage - 1,
        startIndex: Math.max(pagination.startIndex - ITEM_PER_PAGE, 0),
        endIndex: Math.min(pagination.startIndex, filteredBlogs.length),
      });
    }
  };
  const handlePageClick = (index: number) => {
    setPagination({
      ...pagination,
      currentPage: index + 1,
      startIndex: index * ITEM_PER_PAGE,
      endIndex: Math.min(index * ITEM_PER_PAGE + ITEM_PER_PAGE, filteredBlogs.length),
    });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-start bg-white text-black">
      {/* Banner */}
      <section className="mt-px w-full bg-2digits-bg bg-[url('/assets/blogs.png')] bg-cover bg-center bg-no-repeat px-6 py-48 text-center text-white">
        <h2 className="m-auto max-w-screen-md text-4xl font-bold uppercase md:text-6xl lg:text-9xl">
          BLOGS
        </h2>
      </section>

      {/* Filter By Input */}
      {/* As a user, I want to be able to search through different blog posts on an archive page so that I can only view relevant blogs.
        - Able to search in a text input field
        - When searching filter the blog items on the search phrase */}
      <section className="flex w-full flex-col justify-between gap-3 bg-[#EFEFF8] px-6 py-12 md:px-36">
        <p className="text-left">Search for blogs</p>

        {/* input */}
        <div className="flex w-full flex-row gap-2">
          <input
            className="grow rounded p-3 dark:text-black"
            type="text"
            placeholder="Search"
            value={searchParam}
            onChange={(event) => handleInput(event.target.value)}
          />

          <button
            className="rounded bg-[#371172] p-3 text-white"
            type="button"
            onClick={() => setSearch({ ...search, input: searchParam })}>
            Search
          </button>
        </div>
      </section>

      <section className="m-6 dark:text-black">
        {/* Topic Filter */}
        {/* As a user, I want to be able to filter blog posts on an archive page so that I can see only relevant blogs.
          - Only able to select only on a single filter
          - When filtering filter the blog items with the current selected filter
          - When clicking on "All blogs" show all the results */}
        <h5>Topics</h5>

        <div className="my-6">
          {Array.from(['all blogs', 'interview', 'blog', 'whitepaper'], (text, index) => (
            <button
              value={text}
              onClick={() =>
                setSearch({
                  ...search,
                  slug: { label: text, value: text === 'all blogs' ? '' : text },
                })
              }
              type="button"
              className={`m-1.5 rounded-lg border border-gray-300 p-1.5 text-xs uppercase md:m-3 md:p-3 md:text-sm ${search.slug.label === text ? 'bg-[#371172] text-white' : ''}`}
              key={index}>
              {text}
            </button>
          ))}
        </div>

        {/* Blogs */}
        {filteredBlogs.length > 0 ? (
          <div className="flex max-w-[1200px] flex-col justify-center gap-4 md:grid md:grid-cols-3">
            {filteredBlogs.slice(pagination.startIndex, pagination.endIndex).map((item: ICard) => (
              <Card key={item._id} data={item} />
            ))}
          </div>
        ) : (
          <p>Geen blog post gevonden.</p>
        )}
      </section>

      {/* pagination */}
      {/* Pagination by TotalPages */}
      {pagination.totalPages > 0 ? (
        <section className="m-3 flex items-center gap-4">
          <button disabled={pagination.currentPage === 1} type="button" onClick={handlePrev}>
            <svg
              className="inline-block size-4 text-gray-200 dark:text-black rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10">
              <path
                stroke="#c7c7c7"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 1 1 5l4 4"></path>
            </svg>
          </button>

          {/* Pagaination Numbers */}

          {createPagination(pagination.totalPages, pagination.currentPage).map((page, index) => {
            return (
              <button
                disabled={pagination.currentPage === page || page === '...'}
                type="button"
                className={`rounded-lg border border-gray-100 px-4 py-2 text-black ${pagination.currentPage === page ? 'bg-[#371172] text-white' : ''}`}
                key={index}
                onClick={(event) => {
                  handlePageClick(+event.target.innerText - 1);
                }}>
                {page}
              </button>
            );
          })}

          <button
            disabled={pagination.currentPage === pagination.totalPages}
            type="button"
            onClick={handleNext}>
            <svg
              className="inline-block size-4 dark:text-black rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10">
              <path
                stroke="#c7c7c7"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
          </button>
        </section>
      ) : undefined}
    </main>
  );
}

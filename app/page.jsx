"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";

export default function Home() {
  const [posts, setPosts] = useState();
  const inputRef = useRef("");
  const [search, setSearch] = useState(false);

  //^ Show Post List using API
  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API_URL + "/posts")
      .then((res) => res.json())
      .then((res) => setPosts(res));
    // .catch((error) => console.error('Error Fetching Posts:',error))
  }, []);

  const searchSubmit = (e) => {
    e.preventDefault();
    setSearch(true);
    fetch(
      process.env.NEXT_PUBLIC_API_URL + "/posts?q=" + inputRef.current.value
    )
      .then((res) => res.json())
      .then((res) => setPosts(res))
      .finally(() => setSearch(false));
    // .catch((error) => console.error(error))
  };

  return (
    <>
      <main className="container mx-auto px-4 py-6">
        <h2 className="text-4xl font-bold mb-4">Welcome to Our Blog</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </main>
      <div className="flex justify-end px-4 pb-2">
        <form>
          <input
            ref={inputRef}
            type="text"
            className="px-4 py-2 border border-gray-300 rounded-md"
            placeholder="Search..."
            disabled={search}
          />
          <button
            onClick={searchSubmit}
            disabled={search}
            className="px-4 py-2 bg-blue-500 text-white rounded-md ml-4"
          >
            {search ? "..." : "Search"}
          </button>
        </form>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-4 mb-36">
        {posts &&
          posts.map(({ title, image, _id, short_description }) => {
            return (
              <Link href={"/post/" + _id} key={_id}>
                <div className="border border-gray-200 p-4">
                  <img
                    className="w-full h-48 object-cover mb-4"
                    src={image}
                    alt="Post Image"
                  />
                  <h2 className="text-xl font-semibold mb-2">{title}</h2>
                  <p className="text-gray-600">{short_description}</p>
                </div>
              </Link>
              // {!posts || posts.length > 0 && inputRef.current.value && <p>No Post Available for the query <b>{inputRef.current.value}</b></p>}
            );
          })}
      </div>
    </>
  );
}

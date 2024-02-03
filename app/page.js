"use client"
import { useEffect, useState } from "react";

export default function Home() {
  const [posts,setPosts] = useState()

  //^ Show Post List using API
  useEffect(()=>{
    fetch(process.env.NEXT_PUBLIC_API_URL+'/posts')
    .then((res) => res.json())
    .then(res => setPosts(res))
    // .catch((error) => console.error('Error Fetching Posts:',error))
  },[])



  return (
    <>
      <main className="container mx-auto px-4 py-6">
        <h2 className="text-4xl font-bold mb-4">Welcome to Our Blog</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </main>
      <div className="flex justify-end px-4">
        <input
          type="text"
          className="px-4 py-2 border border-gray-300 rounded-md"
          placeholder="Search..."
        />
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md ml-4">
          Search
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {posts && posts.map(({title,description,image,_id})=> {
        return <div className="border border-gray-200 p-4" key={_id}>
        <img className="w-full h-48 object-cover mb-4" src={image} alt="Post Image" />
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-gray-600">{description}</p>
      </div>
      })}
        
    </div>

    </>
  );
}

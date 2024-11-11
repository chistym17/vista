// src/Pages/Blog.jsx
import React from "react";
import { FaCalendarAlt, FaLink } from "react-icons/fa"; // Import icons from react-icons

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Exploring the Wonders of Cox's Bazar",
      excerpt:
        "Discover the beauty and adventure of Cox's Bazar, the world's longest natural sea beach.",
      date: "August 10, 2024",
      link: "https://en.wikipedia.org/wiki/Cox%27s_Bazar", // Wikipedia link for Cox's Bazar
    },
    {
      id: 2,
      title: "The Ultimate Guide to Shreemangal",
      excerpt:
        "Everything you need to know about the tea capital of Bangladesh and its lush green landscapes.",
      date: "August 15, 2024",
      link: "https://en.wikipedia.org/wiki/Shreemangal", // Wikipedia link for Shreemangal
    },
    {
      id: 3,
      title: "Adventure Awaits in Sundarban",
      excerpt:
        "A deep dive into the mangrove forest of Sundarban and the wildlife that calls it home.",
      date: "August 20, 2024",
      link: "https://en.wikipedia.org/wiki/Sundarbans", // Wikipedia link for Sundarban
    },
  ];

  return (
    <div className="blog-container p-6">
      <h1 className="text-3xl font-bold mb-4 text-center">Travel Blog</h1>
      <ul className="space-y-6">
        {blogPosts.map((post) => (
          <li
            key={post.id}
            className="bg-white shadow-lg rounded-lg p-4 transition-transform transform hover:scale-105 hover:shadow-2xl ease-in-out duration-300"
          >
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            <p className="text-gray-600 mb-2">{post.excerpt}</p>
            <div className="flex items-center text-gray-400 text-sm mb-2">
              <FaCalendarAlt className="mr-1 text-green-500" /> {post.date}
            </div>
            <a
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline flex items-center"
            >
              <FaLink className="mr-1" /> Read more
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Blog;

// src/Pages/Blog.jsx
import React from "react";
import { FaCalendarAlt, FaLink, FaUser, FaComments, FaHeart } from "react-icons/fa";
import OptimizedImage from '../../components/OptimizedImage';

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Exploring the Wonders of Cox's Bazar",
      excerpt:
        "Discover the beauty and adventure of Cox's Bazar, the world's longest natural sea beach. From sunrise walks to sunset surfing, experience the magic of this coastal paradise.",
      date: "August 10, 2024",
      author: "Sarah Johnson",
      comments: 15,
      likes: 234,
      image: "https://images.pexels.com/photos/1835718/pexels-photo-1835718.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      category: "Beach Destinations",
      link: "https://en.wikipedia.org/wiki/Cox%27s_Bazar",
    },
    {
      id: 2,
      title: "The Ultimate Guide to Shreemangal",
      excerpt:
        "Journey through the lush tea gardens and serene landscapes of Shreemangal. Learn about the best time to visit, where to stay, and must-try local experiences.",
      date: "August 15, 2024",
      author: "Michael Chen",
      comments: 23,
      likes: 187,
      image: "https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      category: "Nature Escapes",
      link: "https://en.wikipedia.org/wiki/Shreemangal",
    },
    {
      id: 3,
      title: "Adventure Awaits in Sundarban",
      excerpt:
        "Embark on a thrilling journey through the world's largest mangrove forest. Spot Royal Bengal tigers, explore mysterious waterways, and witness unique biodiversity.",
      date: "August 20, 2024",
      author: "David Wilson",
      comments: 31,
      likes: 298,
      image: "https://images.pexels.com/photos/831056/pexels-photo-831056.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      category: "Wildlife",
      link: "https://en.wikipedia.org/wiki/Sundarbans",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-800">
          Travel Stories & Guides
        </h1>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Discover amazing destinations, travel tips, and unforgettable experiences shared by our community of travelers.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden">
                <OptimizedImage
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-3 text-gray-800 hover:text-blue-600 transition-colors">
                  {post.title}
                </h2>
                
                {/* Meta Info */}
                <div className="flex items-center text-gray-500 text-sm mb-4 space-x-4">
                  <div className="flex items-center">
                    <FaCalendarAlt className="mr-2 text-blue-500" />
                    {post.date}
                  </div>
                  <div className="flex items-center">
                    <FaUser className="mr-2 text-blue-500" />
                    {post.author}
                  </div>
                </div>

                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Engagement Stats */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center">
                      <FaHeart className="mr-1 text-red-500" />
                      {post.likes}
                    </span>
                    <span className="flex items-center">
                      <FaComments className="mr-1 text-blue-500" />
                      {post.comments}
                    </span>
                  </div>
                </div>

                {/* Read More Link */}
                <a
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-500 hover:text-blue-700 font-semibold transition-colors"
                >
                  <span>Read More</span>
                  <FaLink className="ml-2" />
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="mt-16 bg-blue-600 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Subscribe to Our Travel Newsletter
          </h3>
          <p className="text-blue-100 mb-6">
            Get the latest travel stories, tips, and inspiration delivered straight to your inbox.
          </p>
          <form className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <button
              type="submit"
              className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Blog;

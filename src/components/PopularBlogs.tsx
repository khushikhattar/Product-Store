import React, { useState } from "react";
import { ThumbsUp, MessageCircle } from "lucide-react";

interface Blog {
  title: string;
  comments: number;
  author: string;
  likes: number;
  isLiked?: boolean; // track if the user liked it
}

export const PopularBlogs: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([
    {
      title: "Understanding React Hooks",
      comments: 12,
      author: "Alice Johnson",
      likes: 85,
      isLiked: false,
    },
    {
      title: "Mastering C++ STL in 30 Days",
      comments: 8,
      author: "Bob Williams",
      likes: 64,
      isLiked: false,
    },
    {
      title: "A Beginner’s Guide to Next.js",
      comments: 20,
      author: "Charlie Brown",
      likes: 102,
      isLiked: false,
    },
    {
      title: "10 Tips for Writing Clean JavaScript Code",
      comments: 15,
      author: "Diana Smith",
      likes: 97,
      isLiked: false,
    },
    {
      title: "How to Ace Your Coding Interviews",
      comments: 30,
      author: "Ethan Walker",
      likes: 150,
      isLiked: false,
    },
  ]);

  // Toggle like/unlike
  const handleLike = (index: number) => {
    setBlogs((prev) =>
      prev.map((blog, i) =>
        i === index
          ? {
              ...blog,
              isLiked: !blog.isLiked,
              likes: blog.isLiked ? blog.likes - 1 : blog.likes + 1,
            }
          : blog
      )
    );
  };

  // Placeholder for comment click
  const handleCommentClick = (index: number) => {
    alert(`Clicked comments for: "${blogs[index].title}"`);
  };

  return (
    <div className="bg-white p-5 rounded shadow-md w-full max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Popular Blogs</h2>
      <ul className="space-y-4">
        {blogs.map((blog, index) => (
          <li
            key={index}
            className="border p-4 rounded-lg shadow-sm hover:shadow-md transition"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold text-gray-800">{blog.title}</span>
            </div>
            <span className="text-gray-600 text-sm mb-2 block">
              Published by {blog.author}
            </span>

            <div className="flex items-center gap-4 mt-2">
              {/* Comments */}
              <button
                onClick={() => handleCommentClick(index)}
                className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition"
              >
                <MessageCircle size={16} />
                <span>{blog.comments}</span>
              </button>

              {/* Like / Unlike */}
              <button
                onClick={() => handleLike(index)}
                className={`flex items-center gap-1 px-2 py-1 rounded ${
                  blog.isLiked
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-800"
                } transition`}
              >
                <ThumbsUp size={16} />
                <span>{blog.likes}</span>
                <span className="text-sm">
                  {blog.isLiked ? "Unlike" : "Like"}
                </span>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PopularBlogs;

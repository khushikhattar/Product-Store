import { useEffect, useState } from "react";

// Define the Author interface for type safety
interface Author {
  name: string;
  isFollowing: boolean;
  image: string;
}

export const TopSellers = () => {
  const [authors, setAuthors] = useState<Author[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch 10 random users from API
        const response = await fetch("https://randomuser.me/api/?results=5");
        const data = await response.json();

        // Map API response into our Author interface
        const authorsData: Author[] = data.results.map((user: any) => ({
          name: `${user.name.first} ${user.name.last}`,
          isFollowing: false,
          image: user.picture.medium,
        }));

        setAuthors(authorsData);
      } catch (error) {
        console.error(`Error fetching authors: ${error}`);
      }
    };

    fetchData(); // call fetchData on mount
  }, []);

  // Toggle follow/unfollow state for an author
  const toggleFollow = (index: number) => {
    setAuthors((prevAuthors) =>
      prevAuthors.map((author, i) =>
        i === index ? { ...author, isFollowing: !author.isFollowing } : author
      )
    );
  };

  return (
    <div className="bg-white p-6 mx-5 border rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-6 border-b pb-2">🌟 Top Sellers</h2>

      <ul className="space-y-4">
        {authors.map((author, index) => (
          <li
            key={index}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:shadow-sm transition"
          >
            {/* Left section: profile image + name */}
            <section className="flex items-center gap-3">
              <img
                src={author.image}
                alt={author.name}
                className="w-12 h-12 rounded-full border"
              />
              <span className="font-medium text-gray-800">{author.name}</span>
            </section>

            {/* Right section: Follow / Unfollow button */}
            <button
              onClick={() => toggleFollow(index)}
              className={`py-1 px-4 rounded-lg font-medium transition ${
                author.isFollowing
                  ? "bg-red-500 text-white hover:bg-red-600"
                  : "bg-black text-white hover:bg-gray-800"
              }`}
            >
              {author.isFollowing ? "Unfollow" : "Follow"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

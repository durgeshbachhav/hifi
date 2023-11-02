import React from "react";

const Trending = () => {
  const hashtags = [
    "travel",
    "foodie",
    "fitness",
    "photography",
    "art",
  ];
  return (
    <div className="p-4 bg-black mt-3 rounded shadow">
      <h2 className="text-xl text-white font-semibold mb-4">Trending Hashtags</h2>
      <ul>
        {hashtags.map((hashtag, index) => (
          <li key={index} className="mb-2">
            <a href={`#/${hashtag}`} className="text-text-secondary-color hover:underline">
              #{hashtag}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Trending;

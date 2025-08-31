import React from "react";
import { Link } from "react-router-dom";

interface Book {
  id: string;
  title: string;
  image: string;
  price: number;
}

export const BookCard: React.FC<Book> = (props) => {
  console.log("hi");
  return (
    <div className="border p-4 rounded shadow-sm hover:shadow-md transition">
      {/* Navigate to product details page when clicked */}
      <Link to={`/product/${props.id}`}>
        <img
          src={props.image}
          alt={props.title}
          className="w-full h-32 object-cover mb-2"
        />
        <h2 className="font-bold">{props.title}</h2>
        <p>${props.price}</p>
      </Link>
    </div>
  );
};

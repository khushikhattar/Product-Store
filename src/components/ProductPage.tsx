import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

// Define the shape of a product (helps with type safety)
interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  images: string[];
  rating: number;
}

export const ProductPage = () => {
  const { id } = useParams<{ id: string }>(); // Get product id from URL
  const navigate = useNavigate();

  // Local state to hold product details
  const [product, setProduct] = useState<Product | null>(null);

  // Fetch product details when component mounts or id changes
  useEffect(() => {
    if (id) {
      axios
        .get<Product>(`https://dummyjson.com/products/${id}`)
        .then((response) => {
          setProduct(response.data);
        })
        .catch((error) => console.log(`Error fetching product data: ${error}`));
    }
  }, [id]);

  // Show loading state while fetching data
  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-xl font-semibold text-gray-500 animate-pulse">
          Loading...
        </h1>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-md">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
      >
        ← Back
      </button>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Product Image */}
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-full md:w-1/2 rounded-xl shadow-sm border"
        />

        {/* Product Details */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
            <p className="mb-6 text-gray-700 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Price + Rating */}
          <div className="flex items-center justify-between text-lg font-medium">
            <p className="text-green-600">💲Price: {product.price}</p>
            <p className="text-yellow-500">⭐Rating: {product.rating}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

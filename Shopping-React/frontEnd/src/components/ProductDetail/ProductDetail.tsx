import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ImageSlider from "../ImageSlider/index";

const Product = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { productId } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      console.log("productId:", productId);
      try {
        const productIdInt = parseInt(productId, 10);
        if (isNaN(productIdInt)) {
          setError({ message: "Invalid productId" });
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `http://localhost:8088/api/products/${productIdInt}` // Sử dụng productIdInt
        );
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <div className="bg-gray-200 py-6">
      <div className="container">
        <div className="bg-white p-4 shadow">
          <div className="grid grid-cols-12 gap-9">
            <div className="col-span-5">
              <div className="relative w-full cursor-zoom-in overflow-hidden pt-[100%] shadow">
                <img
                  src={product.images}
                  alt={product.title}
                  className="pointer-events-none absolute top-0 left-0 h-full w-full bg-white object-cover"
                />
              </div>
              <div className="relative mt-4 grid grid-cols-5 gap-1">
                <ImageSlider imageUrls={product.images} />
              </div>
            </div>
            <div className="col-span-7">
              <h1 className="text-xl font-medium uppercase">{product.title}</h1>
              <div className="mt-8 flex items-center bg-gray-50 px-5 py-4">
                <div className="ml-3 text-3xl font-medium text-primary">
                  ${product.price}
                </div>
              </div>
              <div className="mt-8 flex items-center">
                <div className="capitalize text-gray-500">Số lượng</div>
                <div className="flex items-center ml-10">
                  <button className="flex h-8 w-8 items-center justify-center rounded-l-sm border border-gray-300 text-gray-600">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 1024 1024"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M872 474H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h720c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z"></path>
                    </svg>
                  </button>
                  <div>
                    <div className="undefined py-1">
                      <input
                        className="w-full appearance-none bg-transparent leading-tight focus:outline-none flex-center h-8 w-8 items-center justify-center rounded-l-sm border border-gray-300 text-center text-gray-600"
                        spellCheck="false"
                        type="text"
                      />
                    </div>
                  </div>
                  <button className="flex h-8 w-8 items-center justify-center rounded-r-sm border border-gray-300 text-gray-600">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 1024 1024"
                      version="1.1"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <defs></defs>
                      <path d="M474 152m8 0l60 0q8 0 8 8l0 704q0 8-8 8l-60 0q-8 0-8-8l0-704q0-8 8-8Z"></path>
                      <path d="M168 474m8 0l672 0q8 0 8 8l0 60q0 8-8 8l-672 0q-8 0-8-8l0-60q0-8 8-8Z"></path>
                    </svg>
                  </button>
                </div>
                <div className="ml-6 text-sm text-gray-500">
                  138 sản phẩm có sẵn
                </div>
              </div>

              <div className="mt-8 flex items-center space-x-4">
                <button
                  type="button"
                  className="flex items-center outline-none transition duration-300 text-primary border-[1px] border-primary flex items-center space-x-2 rounded-md px-4 py-2 hover:bg-opacity-80 gap-x-2"
                >
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 1024 1024"
                    className="w-6 h-6"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M922.9 701.9H327.4l29.9-60.9 496.8-.9c16.8 0 31.2-12 34.2-28.6l68.8-385.1c1.8-10.1-.9-20.5-7.5-28.4a34.99 34.99 0 0 0-26.6-12.5l-632-2.1-5.4-25.4c-3.4-16.2-18-28-34.6-28H96.5a35.3 35.3 0 1 0 0 70.6h125.9L246 312.8l58.1 281.3-74.8 122.1a34.96 34.96 0 0 0-3 36.8c6 11.9 18.1 19.4 31.5 19.4h62.8a102.43 102.43 0 0 0-20.6 61.7c0 56.6 46 102.6 102.6 102.6s102.6-46 102.6-102.6c0-22.3-7.4-44-20.6-61.7h161.1a102.43 102.43 0 0 0-20.6 61.7c0 56.6 46 102.6 102.6 102.6s102.6-46 102.6-102.6c0-22.3-7.4-44-20.6-61.7H923c19.4 0 35.3-15.8 35.3-35.3a35.42 35.42 0 0 0-35.4-35.2zM305.7 253l575.8 1.9-56.4 315.8-452.3.8L305.7 253zm96.9 612.7c-17.4 0-31.6-14.2-31.6-31.6 0-17.4 14.2-31.6 31.6-31.6s31.6 14.2 31.6 31.6a31.6 31.6 0 0 1-31.6 31.6zm325.1 0c-17.4 0-31.6-14.2-31.6-31.6 0-17.4 14.2-31.6 31.6-31.6s31.6 14.2 31.6 31.6a31.6 31.6 0 0 1-31.6 31.6z"></path>
                  </svg>
                  Thêm vào giỏ hàng
                </button>
                <button
                  type="button"
                  className="flex items-center outline-none transition duration-300 bg-primary text-white flex items-center space-x-2 rounded-md px-4 py-2 hover:bg-opacity-80"
                >
                  Mua ngay
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="mt-8 bg-white p-4 shadow">
          <div className="rounded bg-gray-50 p-4 text-lg capitalize text-slate-700">
            Mô tả sản phẩm
          </div>
          <div className="mx-4 mt-12 mb-4 text-sm leading-loose">
            <p> {product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;

"use client";
import Image from "next/image";
import NavBar from "@/components/Navbar";
import Link from "next/link";
import { Button } from "flowbite-react";
import { useState, useEffect } from "react";
interface Rating {
  rate: number;
  count: number;
}
interface Prod {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: number;
}
export default function Home() {
  const [products, setProducts] = useState<Prod[]>([]);
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => setProducts(json));
  }, []);
  return (
    <main className="px-10">
      <NavBar />
      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {products.map((product) => (
          <div key={product.id} className="group relative">
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
              <div className="object-center object-contain flex justify-center  pt-5">
                <Image
                  src={product.image}
                width={200}
                  height={300}
                  alt={product.title + "alt txt"}
                />
              </div>
            </div>
            <div className="mt-4 ">
              <div>
                <p className="mt-1 text-sm text-gray-500">{product.title}</p>
                <p className="text-sm font-medium text-gray-900">
                {product.price}
              </p>
              </div>
              <Button color="gray">Add to Cart</Button>
              
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import { useEffect, useState } from "react";
import { Product } from "@/types";



export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect( () => {
    fetch('https://dummyjson.com/products').then(res => res.json()).then(json => setProducts(json.products))

  },[])

  
  return (
    <div>
      <section className="py-24">
       
       {products.map((product, i) => (
        <div key={i}>
          <img src={product.images[0]} width={200} height={200} alt={product.title} />
          <h1>{product.title}</h1>
          <p>{product.description}</p>
          <h4>{product.sku}</h4>
        </div>
       ))}
      </section>

    </div>
  );
}

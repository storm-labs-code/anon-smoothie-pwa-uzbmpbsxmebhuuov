import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import 'tailwindcss/tailwind.css';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*');

      if (error) console.error('Error fetching products:', error);
      else setProducts(data);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  const handleOrder = async (productId) => {
    // Your order handling logic here
  };

  return (
    <div className="container mx-auto p-4">
      <Head>
        <title>Smoothie PWA - Products</title>
      </Head>
      <h1 className="text-2xl font-bold mb-4">Our Smoothies</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <div key={product.id} className="border rounded-lg shadow-lg p-4">
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="text-gray-700">{product.description}</p>
              <p className="text-lg font-bold">${product.price.toFixed(2)}</p>
              <button
                onClick={() => handleOrder(product.id)}
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Order Now
              </button>
            </div>
          ))}
        </div>
      )}
      <Link href="/" className="mt-4 text-blue-500 underline">Back to Home</Link>
    </div>
  );
};

export default ProductPage;

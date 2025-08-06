import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';

const Home = () => {
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

  const handleOrder = (productId) => {
    router.push(`/order/${productId}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <Head>
        <title>Smoothie PWA</title>
        <meta name="description" content="Browse and order smoothies" />
      </Head>
      <h1 className="text-4xl font-bold mb-6">Smoothie Products</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md p-5">
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="my-2">{product.description}</p>
              <p className="text-lg font-bold">${product.price}</p>
              <button
                onClick={() => handleOrder(product.id)}
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
                Order Now
              </button>
            </div>
          ))}
        </div>
      )}
      <Link href="/events" className="mt-8 text-blue-600">View Events & News</Link>
    </div>
  );
};

export default Home;

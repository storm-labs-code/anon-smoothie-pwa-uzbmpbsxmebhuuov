import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

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

  const handleOrder = (id) => {
    router.push(`/order/${id}`);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Head>
        <title>Smoothie PWA</title>
      </Head>
      <h1 className="text-3xl font-bold mb-6">Smoothies</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg p-4 shadow-md">
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-lg font-bold">${product.price}</p>
            <button
              onClick={() => handleOrder(product.id)}
              className="mt-2 bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600">
              Order Now
            </button>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <Link href="/profile">
          <a className="text-blue-500 underline">Profile Management</a>
        </Link>
      </div>
    </div>
  );
};

export default Home;

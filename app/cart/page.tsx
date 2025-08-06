import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { createClient } from '@supabase/supabase-js';
import Head from 'next/head';
import Link from 'next/link';
import 'tailwindcss/tailwind.css';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from('products')
        .select()
        .order('id', { ascending: true });

      if (error) console.error('Error fetching products:', error);
      else setProducts(data);

      setLoading(false);
    };
    fetchProducts();
  }, []);

  const handleOrder = (id) => {
    router.push(`/order/${id}`);
  };

  if (loading) {
    return <div className='flex justify-center items-center h-screen'>Loading...</div>;
  }

  return (
    <div className='container mx-auto p-4'>
      <Head>
        <title>Smoothie PWA</title>
        <meta name='description' content='Explore our smoothie products.' />
      </Head>
      <h1 className='text-3xl font-bold mb-4'>Smoothie Products</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {products.map(product => (
          <div key={product.id} className='border rounded-lg p-4'>
            <h2 className='text-xl font-semibold'>{product.name}</h2>
            <p className='text-gray-700'>${product.price}</p>
            <button onClick={() => handleOrder(product.id)} className='mt-2 bg-blue-500 text-white p-2 rounded'>Order Now</button>
          </div>
        ))}
      </div>
      <div className='flex justify-end mt-4'>
        <Link href='/profile' className='text-blue-600'>My Profile</Link>
      </div>
    </div>
  );
};

export default Home;

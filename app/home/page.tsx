import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { createClient } from '@supabase/supabase-js';
import 'tailwindcss/tailwind.css';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Home() {
  const [products, setProducts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*');
      if (error) console.log('Error fetching products:', error);
      else setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold my-6">Smoothie PWA</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-5xl">
        {products.map(product => (
          <div key={product.id} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 p-4">
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-gray-700">{product.description}</p>
            <span className="text-lg font-bold">${product.price}</span>
            <button
              onClick={() => router.push(`/order/${product.id}`)}
              className="mt-4 w-full bg-green-500 text-white rounded-lg py-2 hover:bg-green-600 transition'>
              Order Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
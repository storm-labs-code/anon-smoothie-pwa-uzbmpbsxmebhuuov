import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import Link from 'next/link';
import 'tailwindcss/tailwind.css';

const Smoothies = () => {
  const [smoothies, setSmoothies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSmoothies = async () => {
      const { data, error } = await supabase.from('smoothies').select('*');
      if (error) console.error('Error fetching smoothies:', error);
      else setSmoothies(data);
      setLoading(false);
    };

    fetchSmoothies();
  }, []);

  if (loading) return <div className='flex items-center justify-center h-screen'>Loading...</div>;

  return (
    <div className='p-5'>
      <h1 className='text-2xl font-bold mb-4'>Smoothies</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
        {smoothies.map(smoothie => (
          <div key={smoothie.id} className='bg-white shadow-md rounded-lg p-4'>
            <h2 className='font-semibold text-lg'>{smoothie.name}</h2>
            <p className='text-gray-600'>${smoothie.price.toFixed(2)}</p>
            <Link href={`/order/${smoothie.id}`}>
              <a className='mt-2 inline-block bg-blue-500 text-white rounded px-4 py-2'>Order Now</a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Smoothies;

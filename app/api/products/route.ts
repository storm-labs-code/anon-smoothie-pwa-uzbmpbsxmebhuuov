import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import Link from 'next/link';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <div className='flex justify-center items-center h-screen'>Loading...</div>;

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-3xl font-bold mb-4'>Smoothie Products</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {products.map(product => (
          <div key={product.id} className='border p-4 rounded-lg shadow-md'>
            <img src={product.image_url} alt={product.name} className='w-full h-48 object-cover rounded' />
            <h2 className='text-xl font-semibold'>{product.name}</h2>
            <p className='text-gray-700'>${product.price.toFixed(2)}</p>
            <Link href={`/products/${product.id}`}>
              <a className='mt-2 inline-block bg-blue-500 text-white py-2 px-4 rounded transition duration-300 hover:bg-blue-600'>View Details</a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;

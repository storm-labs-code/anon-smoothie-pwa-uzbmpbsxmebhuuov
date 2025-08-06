import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../utils/supabaseClient';
import Link from 'next/link';

const ProductList = () => {
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

  const handleProductClick = (id) => {
    router.push(`/products/${id}`);
  };

  if (loading) return <div className='text-center py-10'>Loading products...</div>;

  return (
    <div className='container mx-auto p-5'>
      <h1 className='text-2xl font-bold mb-5'>Products</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {products.map((product) => (
          <div key={product.id} className='border rounded-lg overflow-hidden shadow-lg cursor-pointer' onClick={() => handleProductClick(product.id)}>
            <img src={product.image_url} alt={product.name} className='w-full h-48 object-cover'/>
            <div className='p-4'>
              <h2 className='font-semibold text-lg'>{product.name}</h2>
              <p className='text-gray-600'>{product.description}</p>
              <p className='font-bold text-xl text-green-600'>${product.price.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ProductsPage = () => {
  return <ProductList />;
};

export default ProductsPage;

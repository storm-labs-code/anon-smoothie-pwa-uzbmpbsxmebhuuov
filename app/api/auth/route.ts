import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabaseClient';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*');
      if (error) console.error('Error fetching products:', error);
      else setProducts(data);
    };
    fetchProducts();
  }, []);

  const handleOrder = (productId) => {
    router.push(`/order/${productId}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Smoothie Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <img src={product.image_url} alt={product.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="font-semibold text-lg">{product.name}</h2>
              <p className="text-gray-700 mb-2">{product.description}</p>
              <p className="font-bold text-xl mb-4">${product.price.toFixed(2)}</p>
              <button 
                onClick={() => handleOrder(product.id)} 
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300"
              >
                Order Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;

export const getServerSideProps = async () => {
  const { data: products, error } = await supabase
    .from('products')
    .select('*');
  if (error) {
    console.error('Error fetching products:', error);
    return { props: { products: [] } };
  }
  return { props: { products } };
};
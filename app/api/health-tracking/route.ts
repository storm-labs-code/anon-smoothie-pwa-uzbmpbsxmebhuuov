import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import Link from 'next/link';
import { FaShoppingCart } from 'react-icons/fa';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from('products').select('*');
      if (error) console.error('Error fetching products:', error);
      else setProducts(data);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  if (loading) return <div className="flex justify-center items-center h-screen"><p>Loading products...</p></div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Smoothies</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map(product => (
          <div key={product.id} className="border rounded-lg p-4 flex flex-col items-center">
            <img src={product.image_url} alt={product.name} className="h-48 w-full object-cover rounded" />
            <h2 className="text-xl font-semibold mt-2 truncate">{product.name}</h2>
            <p className="text-lg font-bold text-green-600">${product.price}</p>
            <Link href={`/products/${product.id}`}>
              <a className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">View Details</a>
            </Link>
          </div>
        ))}
      </div>
      <Link href="/cart">
        <a className="fixed bottom-4 right-4 bg-green-500 p-3 rounded-full text-white shadow-lg hover:bg-green-600 transition">
          <FaShoppingCart size={24} />
        </a>
      </Link>
    </div>
  );
};

export default ProductsPage;


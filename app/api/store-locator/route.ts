import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import { FaCalendarAlt, FaMapMarkerAlt, FaShoppingCart } from 'react-icons/fa';

const HomePage = () => {
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

  const handleAddToCart = (product) => {
    console.log('Adding to cart:', product);
    // Implement cart logic here
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-center">Smoothie PWA</h1>
      <p className="text-center text-gray-600 mb-6">Browse our delicious smoothie products!</p>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="border shadow-lg rounded-lg overflow-hidden">
              <img src={product.image_url} alt={product.name} className="w-full h-40 object-cover" />
              <div className="p-4">
                <h2 className="font-semibold text-lg">{product.name}</h2>
                <p className="text-gray-700">{product.description}</p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-xl font-bold">${product.price.toFixed(2)}</span>
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    onClick={() => handleAddToCart(product)}
                  >
                    <FaShoppingCart className="inline-block mr-2" />Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;

export async function getServerSideProps() {
  // Fetch any necessary data for server-side rendering
  return { props: {} }; 
}
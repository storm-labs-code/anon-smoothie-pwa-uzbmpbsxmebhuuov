import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from('products').select('*');
      if (error) {
        toast.error('Error fetching products');
      } else {
        setProducts(data);
      }
      setLoading(false);
    };
    fetchProducts();
  }, []);

  const handleOrder = async (productId) => {
    const { error } = await supabase.from('orders').insert([{ product_id: productId }]);
    if (error) {
      toast.error('Error placing order');
    } else {
      toast.success('Order placed successfully');
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <Head>
        <title>Smoothie Products</title>
      </Head>
      <h1 className="text-2xl font-bold mb-4">Choose Your Smoothies</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg p-4 shadow-lg">
            <h2 className="font-semibold text-lg mb-2">{product.name}</h2>
            <p className="mb-4">${product.price.toFixed(2)}</p>
            <button
              onClick={() => handleOrder(product.id)}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Order Now
            </button>
          </div>
        ))}
      </div>
      <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar closeOnClick pauseOnHover draggable pauseOnFocusLoss />
    </div>
  );
};

export default ProductPage;

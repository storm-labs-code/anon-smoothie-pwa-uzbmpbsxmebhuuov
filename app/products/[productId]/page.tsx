import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../utils/supabaseClient';
import { Head } from 'next/head';

const ProductPage = ({ productId }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProduct = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', productId)
        .single();
      if (error) {
        console.error('Error fetching product:', error);
        setLoading(false);
        return;
      }
      setProduct(data);
      setLoading(false);
    };
    fetchProduct();
  }, [productId]);

  const handleBack = () => {
    router.back();
  };

  const handleOrder = async () => {
    // Implement order logic here
    const { error } = await supabase
      .from('orders')
      .insert([{ product_id: productId, user_id: supabase.auth.user().id }]);
    if (error) {
      console.error('Error placing order:', error);
      return;
    }
    alert('Order placed successfully!');
  };

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found.</div>;

  return (
    <div className="container mx-auto p-4">
      <Head>
        <title>{product.name}</title>
      </Head>
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <img src={product.image_url} alt={product.name} className="w-full h-64 object-cover my-4" />
      <p className="text-lg my-2">{product.description}</p>
      <p className="text-xl font-semibold">${product.price.toFixed(2)}</p>
      <div className="flex space-x-4 my-4">
        <button onClick={handleBack} className="bg-gray-300 text-gray-700 px-4 py-2 rounded">Back</button>
        <button onClick={handleOrder} className="bg-blue-500 text-white px-4 py-2 rounded">Order Now</button>
      </div>
    </div>
  );
};

export default ProductPage;

export async function getServerSideProps({ params }) {
  const { productId } = params;
  return { props: { productId } };
}
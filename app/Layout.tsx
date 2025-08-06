import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../utils/supabaseClient';
import Link from 'next/link';
import { signOut } from '../utils/auth';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        setError(error.message);
      } else {
        setUser(data.user);
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  if (loading) return <div className='flex justify-center items-center h-screen'>Loading...</div>;

  if (error) return <div className='flex justify-center items-center h-screen text-red-500'>{error}</div>;

  return (
    <div className='p-4 max-w-md mx-auto'>
      <h1 className='text-2xl font-bold mb-4'>Profile</h1>
      {user && (
        <div>
          <p className='text-lg'>Hello, {user.email}!</p>
          <Link href='/order-history' className='block text-blue-600'>View Order History</Link>
          <Link href='/health-tracking' className='block text-blue-600'>Health Data</Link>
          <button className='mt-4 bg-red-500 text-white px-4 py-2 rounded' onClick={handleSignOut}>Sign Out</button>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;

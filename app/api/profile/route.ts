import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Profile = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = true;

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) console.error('Error fetching user:', error);
      setUser(data.user);
      setLoading(false);
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  if (loading) return <div className='flex justify-center items-center h-screen'>Loading...</div>;

  return (
    <div className='min-h-screen flex flex-col items-center justify-center text-center'>
      <Head>
        <title>User Profile</title>
        <meta name='description' content='User Profile Page' />
      </Head>
      <h1 className='text-3xl font-bold mb-4'>Welcome, {user.email}</h1>
      <p className='text-lg mb-4'>Your Points: {user.points}</p>
      <Link href='/order-history' className='text-blue-500 underline'>View Order History</Link>
      <button onClick={handleLogout} className='mt-4 bg-red-500 text-white px-4 py-2 rounded'>Logout</button>
    </div>
  );
};

export default Profile;

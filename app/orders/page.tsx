import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../utils/supabaseClient';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const session = supabase.auth.session();
    if (session) {
      setUser(session.user);
      // Fetch user profile from the database
      fetchProfile(session.user.id);
    } else {
      router.push('/login');
    }
  }, [router]);

  const fetchProfile = async (userId) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      toast.error('Error fetching profile information.');
    } else {
      setUser(data);
    }
    setLoading(false);
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      router.push('/login');
    } else {
      toast.error('Error signing out.');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <div className="bg-white p-4 rounded shadow-md">
        <p className="text-lg">Welcome, {user.username}!</p>
        <p>Email: {user.email}</p>
        <Link href="/edit-profile">
          <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Edit Profile</button>
        </Link>
        <button onClick={signOut} className="mt-4 ml-4 bg-red-500 text-white px-4 py-2 rounded">Sign Out</button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Profile;

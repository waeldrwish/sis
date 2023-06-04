import { useRouter } from 'next/router';
import { getUsersFromFirestore, logout } from '../api/database';
import { useEffect, useState } from 'react';

function Index() {
  const router = useRouter();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersData = await getUsersFromFirestore("", router.query.index);
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchData();
  }, [router.query]);

  return (
    <div>
      <div className='m-4 bg-green-500 p-3 rounded-md text-white font-bold'>
        <label>Welcom To Our University</label>
      </div>

      {users.map((element) => (
        <div key={element.id} className='text-center mx-auto bg-blue-200 p-3 my-3 rounded-md w-1/3'>
          <ul className='w-full break-words'>
            <li className='w-full'>Username: {element.username}</li>
            <li className='w-full'>Email: {element.email}</li>
          </ul>
        </div>
      ))}

      <button className='bg-red-500 p-2 text-white rounded-lg fixed bottom-5 right-5 z-10 hover:bg-red-600'
        onClick={() => {
          logout()
        }}>
        Logout
      </button>
    </div>
  );
}

export default Index;

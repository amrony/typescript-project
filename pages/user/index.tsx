import { IUser } from '@/types';
import React, { useEffect, useState } from 'react'

const User = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', email: '' });
  const [editIndex, setEditIndex] = useState<number | null>(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(json => setUsers(json));
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const getDefaultUserFields = () => ({
    username: 'username',
    address: {
      street: '', suite: '', city: '', zipcode: '', geo: { lat: '', lng: '' }
    },
    phone: '',
    website: '',
    company: { name: '', catchPhrase: '', bs: '' }
  });

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    const newUser: IUser = {
      id: users.length ? users[users.length - 1].id + 1 : 1,
      name: form.name,
      email: form.email
    };
    setUsers([...users, newUser]);
    setForm({ name: '', email: '' });
    setShowForm(false);
  };

  const handleEditClick = (index: number) => {
    setEditIndex(index);
    setForm({ name: users[index].name, email: users[index].email });
    setShowForm(true);
  };

  const handleEditUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (editIndex === null || !form.name || !form.email) return;
    const updatedUsers = [...users];
    updatedUsers[editIndex] = {
      ...updatedUsers[editIndex],
      name: form.name,
      email: form.email,
    };
    setUsers(updatedUsers);
    setForm({ name: '', email: '' });
    setEditIndex(null);
    setShowForm(false);
  };

  const handleDeleteUser = (index: number) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter((_, i) => i !== index));
    }
  };

  return (
    <div className='p-4'>
      <div className='flex justify-between items-center mb-4'>
        <h1 className='text-xl font-bold'>Users</h1>
        <button className='bg-blue-500 hover:bg-blue-600 p-3 text-white rounded' onClick={() => setShowForm(true)}>Add User</button>
      </div>
      {showForm && (
        <form className='mb-4 flex gap-2 items-center' onSubmit={editIndex === null ? handleAddUser : handleEditUser}>
          <input
            type='text'
            name='name'
            placeholder='Name'
            value={form.name}
            onChange={handleInputChange}
            className='border p-2 rounded'
            required
          />
          <input
            type='email'
            name='email'
            placeholder='Email'
            value={form.email}
            onChange={handleInputChange}
            className='border p-2 rounded'
            required
          />
          <button type='submit' className='bg-green-500 hover:bg-green-600 text-white p-2 rounded'>Save</button>
          <button type='button' className='bg-gray-300 p-2 rounded' onClick={() => { setShowForm(false); setEditIndex(null); setForm({ name: '', email: '' }); }}>Cancel</button>
        </form>
      )}
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200 ">
            <th className='p-2 border border-gray-300'>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            users.map((user, i) => (
              <tr key={i}>
                <td className='border p-2'>{user.id}</td>
                <td className='border p-2'>{user.name}</td>
                <td className='border p-2'>{user.email}</td>
                <td className='border p-2'>
                  <button className='bg-blue-500 hover:bg-blue-600 text-white p-2 rounded mr-2' onClick={() => handleEditClick(i)}>Edit</button>
                  <button className='bg-red-500 hover:bg-red-600 text-white p-2 rounded' onClick={() => handleDeleteUser(i)}>Delete</button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default User;

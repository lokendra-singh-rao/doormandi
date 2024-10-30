"use client"
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/store/store';
import { loginUser } from '@/app/store/features/auth/authSlice';
import clsx from 'clsx';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.auth);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(loginUser({ email, password }));
  };

  return (
    <form onSubmit={handleLogin}>
      {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
      <div className='mb-3'>
        <label htmlFor="email" className='font-semibold'>Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className='border-gray-200 border-[1px] rounded-lg outline-green-500 w-full p-2'
          placeholder='Email'
        />
      </div>
      <div className='mb-4'>
        <label htmlFor="password" className='font-semibold'>Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className='border-gray-200 border-[1px] rounded-lg outline-green-500 w-full p-2'
          placeholder='Password'
        />
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className={clsx('w-full p-2 text-white border-none rounded-[0.24rem]', {
          'bg-green-500 hover:bg-green-600': !isLoading,
          'bg-gray-200': isLoading,
        })}
      >
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}
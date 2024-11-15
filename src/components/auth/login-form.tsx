'use client';

import { useFormStatus } from 'react-dom';
import { useState } from 'react';
import { loginAction } from '@/app/actions/auth';
import { useAuth } from '@/contexts/auth-context';

const LoginButton = () => {
  const { pending } = useFormStatus();
  
  return (
    <button
      type="submit"
      className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 disabled:bg-blue-300"
      disabled={pending}
    >
      {pending ? 'Logging in...' : 'Login'}
    </button>
  );
};

export function LoginForm() {
  const [message, setMessage] = useState<{type: 'error' | 'success', text: string} | null>(null);
  const { login } = useAuth();

  async function handleSubmit(formData: FormData) {
    const result = await loginAction(formData);
    
    if (result.error) {
      setMessage({ type: 'error', text: result.error });
    } else if (result.success) {
      setMessage({ type: 'success', text: 'Login successful! Redirecting...' });
      login(result.data.jwt);
    }
  }

  return (
    <form action={handleSubmit} className="space-y-4 w-full max-w-md">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          defaultValue="mel_boss@fitness.dk"
          required
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          defaultValue="asdfQWER"
          required
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
        />
      </div>

      {message && (
        <div className={`text-sm ${message.type === 'error' ? 'text-red-500' : 'text-green-500'}`}>
          {message.text}
        </div>
      )}

      <LoginButton />
    </form>
  );
}
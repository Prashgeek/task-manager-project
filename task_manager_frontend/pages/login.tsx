import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post(`${API_URL}/token/`, {
        username,
        password,
      });

      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);

      router.push('/');
    } catch (err: unknown) {
      // Type guard to check if err is AxiosError like
      if (
        typeof err === 'object' &&
        err !== null &&
        'response' in err &&
        (err as any).response?.status === 401
      ) {
        setError('Invalid username or password.');
      } else {
        setError('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="app-container">
      <div className="login-box" role="main" aria-label="Login form">
        <h1>Login</h1>
        {error && <p className="error-msg" role="alert">{error}</p>}
        <form onSubmit={handleSubmit} noValidate>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            autoComplete="username"
            className="text-input"
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            className="text-input"
          />

          <button type="submit" className="submit-btn">Login</button>
        </form>
      </div>

      <style jsx>{`
        .app-container {
          font-family: Arial, sans-serif;
          background-color: #f0f0f0;
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 40px 20px;
          box-sizing: border-box;
          color: #111;
        }

        .login-box {
          background: #fff;
          padding: 40px 40px 48px;
          max-width: 420px;
          width: 100%;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          text-align: center;
        }

        h1 {
          font-size: 2.25rem;
          font-weight: 700;
          color: #222;
          margin-bottom: 30px;
          user-select: none;
        }

        form {
          display: flex;
          flex-direction: column;
          align-items: stretch;
        }

        label {
          font-weight: 600;
          color: #555;
          margin-bottom: 6px;
          font-size: 1rem;
          user-select: none;
          text-align: left;
        }

        .text-input {
          padding: 10px 12px;
          margin-bottom: 20px;
          font-size: 1rem;
          border-radius: 4px;
          border: 1px solid #ccc;
          box-sizing: border-box;
          font-family: inherit;
          transition: border-color 0.2s ease;
          color: #111;
          background-color: #fff;
        }

        .text-input::placeholder {
          color: #aaa;
        }

        .text-input:focus {
          outline: none;
          border-color: #3b82f6; /* Tailwind's blue-500 */
          box-shadow: 0 0 4px rgba(59, 130, 246, 0.5);
          background-color: #fff;
          color: #111;
        }

        .submit-btn {
          margin-top: 2rem;
          width: 100%;
          padding: 14px 0;
          background-color: #3b82f6; /* Blue solid color */
          border: none;
          border-radius: 6px;
          font-weight: 700;
          font-size: 1.1rem;
          color: white;
          cursor: pointer;
          transition: background-color 0.2s ease;
          user-select: none;
        }

        .submit-btn:hover,
        .submit-btn:focus {
          background-color: #2563eb; /* Darker blue */
          outline: none;
        }

        .error-msg {
          background-color: #fee2e2; /* Light red */
          color: #b91c1c; /* Dark red */
          font-weight: 700;
          padding: 12px;
          margin-bottom: 20px;
          border-radius: 6px;
          box-shadow: 0 0 6px #b91c1c88;
          text-align: center;
          user-select: none;
        }

        @media (max-width: 480px) {
          .login-box {
            padding: 30px 25px 36px;
          }
          h1 {
            font-size: 1.8rem;
          }
          .submit-btn {
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  );
}

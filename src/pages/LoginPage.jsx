import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useInput } from '../hooks/input';
import { login } from '../utils/network-data';
import { useAuth } from '../hooks/auth';

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginSuccess } = useAuth();
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  const from = location.state?.from?.pathname || '/';

  async function onSubmit(event) {
    event.preventDefault();

    const { error, data } = await login({ email, password });

    if (!error) {
      loginSuccess(data, () => {
        navigate(from, { replace: true });
      });
    }
  }

  return (
    <section className="login-page">
      <form onSubmit={onSubmit}>
        <div className="input-login">
          <input
            type="email"
            value={email}
            onChange={onEmailChange}
            placeholder="Email"
          />
          <input
            type="password"
            value={password}
            onChange={onPasswordChange}
            placeholder="Password"
          />
          <button>Login</button>
        </div>
      </form>
      <p><Link to="/register">Register</Link></p>
    </section>
  );
}

export default LoginPage;

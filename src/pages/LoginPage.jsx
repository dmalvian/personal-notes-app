import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useInput } from '../hooks/input';
import { login } from '../utils/network-data';
import { useAuth } from '../hooks/auth';
import { useLocale } from '../hooks/locale';
import { toast } from 'react-toastify';
import path from '../utils/path';

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginSuccess } = useAuth();
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  const from = location.state?.from?.pathname || '/';

  const { translate: __ } = useLocale();

  async function onSubmit(event) {
    event.preventDefault();

    if (email === '' || password === '') {
      toast.error(__('Silakan lengkapi seluruh form'));
      return;
    }

    const { error, data } = await login({ email, password });

    if (!error) {
      loginSuccess(data, () => {
        navigate(from, { replace: true });
      });
    }
  }

  return (
    <section className="login-page">
      <h2>Login</h2>
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
      <p>
        {__('Belum punya akun?')}
        &nbsp;
        <Link to={path.REGISTER}>{__('Daftar di sini')}</Link>
      </p>
    </section>
  );
}

export default LoginPage;

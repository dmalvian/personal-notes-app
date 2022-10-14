import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useInput } from '../hooks/input';
import PasswordStrengthBar from 'react-password-strength-bar';
import { register } from '../utils/network-data';
import { useLocale } from '../hooks/locale';
import { toast } from 'react-toastify';
import path from '../utils/path';

function RegisterPage() {
  const navigate = useNavigate();
  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  const [confirmPassword, onConfirmPasswordChange] = useInput('');

  useEffect(() => {}, [password, confirmPassword]);

  const { translate: __ } = useLocale();

  async function onSubmit(event) {
    event.preventDefault();

    if (
      name === '' ||
      email === '' ||
      password === '' ||
      confirmPassword === ''
    ) {
      toast.error(__('Silakan lengkapi seluruh form'));
      return;
    }

    if (password.length < 6) return;

    if (password !== confirmPassword) return;

    const { error } = await register({ name, email, password });

    if (!error) {
      navigate(path.LOGIN);
      toast.success(__('Proses pendaftaran berhasil'));
    }
  }

  return (
    <section className="register-page">
      <h2>Register</h2>
      <form onSubmit={onSubmit}>
        <div className="input-register">
          <input
            type="text"
            value={name}
            onChange={onNameChange}
            placeholder="Nama"
          />
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
          <div className="flex-container">
            <div className="password-strength">
              <PasswordStrengthBar
                password={password}
                minLength="6"
                scoreWords={[
                  __('Lemah'),
                  __('Lemah'),
                  __('Oke'),
                  __('Bagus'),
                  __('Kuat'),
                ]}
                barColors={['#666', '#ef4836', '#f6b44d', '#2b90ef', '#25c281']}
                shortScoreWord={__('Terlalu Pendek')}
              />
            </div>
          </div>
          <input
            style={{ marginBottom: '8px' }}
            type="password"
            value={confirmPassword}
            onChange={onConfirmPasswordChange}
            placeholder="Konfirmasi Password"
          />
          <p
            style={{
              fontSize: '14px',
              textAlign: 'right',
              marginBottom: '16px',
            }}
          >
            {confirmPassword !== '' && password !== confirmPassword
              ? __('Password tidak sesuai')
              : '\u00A0'}
          </p>
          <button>Register</button>
        </div>
      </form>
      <p>
        {__('Sudah punya akun?')}
        &nbsp;
        <Link to={path.LOGIN}>{__('Login di sini')}</Link>
      </p>
    </section>
  );
}

export default RegisterPage;

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './css/email.css';
import Header from './Header';
import mail from '../IMG/email.webp';

const ForgotPasswordForm = () => {
  const [message, setMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const handleResetPassword = async (data) => {
    try {
      const response = await fetch('https://sigaemail.host8b.me/correo.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          correo: data.correo,
        }),
      });
      const result = await response.json();
      setMessage(result.message);
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error al enviar el correo de recuperación conexión fallida');
    }
  };

  return (
    <div className="forgot-password-container">
      <Header />
      <div className="forgot-password-content">
      
        <center><h1 className="forgot-password-title">Recuperación de Contraseña</h1>
        <img src={mail} alt="Loginim" className="logo" style={{ alignItems: 'center', maxWidth: '30%' }} /></center>
        <p className="forgot-password-description">
          Ingresa tu dirección de correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
        </p>
        <form className="forgot-password-form" onSubmit={handleSubmit(handleResetPassword)}>
          <div className="form-group">
            <input
              type="text"
              className={`form-control ${
                errors.correo ? 'is-invalid' : ''
              }`}
              placeholder="Correo Electrónico"
              {...register('correo', {
                required: 'Este campo es requerido',
                pattern: {
                  value: /^[\w.-]+@(?:uthh\.edu\.mx|gmail\.com)$/,
                  message: 'El formato de correo no es válido'
                }
              })}
            />
            {errors.correo && (
              <p className="invalid-feedback">{errors.correo.message}</p>
            )}
          </div>
          <button type="submit" className="btn btn-primary">
            Enviar Correo de Recuperación
          </button>
        </form>
        {message && <p className="success-message">{message}</p>}
      </div>
    </div>
  );
};

export default ForgotPasswordForm;

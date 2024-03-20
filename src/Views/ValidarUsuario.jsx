import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import mail from '../IMG/userv.png';
import './css/email.css';


const ValidarUsuario = () => {
  const [usuario, setUsuario] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost/WebServices/consultarusuario.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ usuario }),
      });
      const data = await response.json();
      if (data.success) {
        // Si el usuario existe, navegar a la página ResponderPregunta con el usuario como parte de la ruta
        navigate(`/ResponderPregunta/${usuario}`);
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error('Error al validar usuario:', error);
    }
  };

  return (
    <div className="forgot-password-container">
      <Header />
      <div className="forgot-password-content">

      <center><h2 className="forgot-password-title">Buscar Usuario</h2>
      <img src={mail} alt="Loginim" className="logo" style={{ alignItems: 'center', maxWidth: '20%' }} /></center>
      <form className="forgot-password-form" onSubmit={handleSubmit}>
        <div className="form-group">
        <input type="text" placeholder="Usuario" className="form-control" value={usuario} onChange={(e) => setUsuario(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">Buscar Usuario</button>
      </form>
      <br />
      {error && <p>{error}</p>}

      </div>

    </div>
  );
};

export default ValidarUsuario;

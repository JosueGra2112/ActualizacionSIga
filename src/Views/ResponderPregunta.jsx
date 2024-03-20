import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Importa useNavigate
import Header from './Header';
import './css/email.css';


const ResponderPregunta = () => {
  const [preguntaSecreta, setPreguntaSecreta] = useState('');
  const [idPregunta, setIdPregunta] = useState('');
  const [respuesta, setRespuesta] = useState('');
  const [error, setError] = useState('');
  const { usuario } = useParams(); // Obtiene el usuario de los parámetros de la URL
  const navigate = useNavigate(); // Obtiene la función de navegación

  useEffect(() => {
    const fetchPreguntaSecreta = async () => {
      try {
        if (!usuario) {
          setError('Usuario no proporcionado');
          return;
        }
        
        const response = await fetch('http://localhost/WebServices/VerificarRespuestaUser.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ usuario }), // Envía solo el usuario como un objeto JSON
        });
  
        if (!response.ok) {
          throw new Error('Error al obtener la pregunta secreta');
        }
  
        const data = await response.json();
        if (data.success) {
          setPreguntaSecreta(data.preguntaSecreta);
          setIdPregunta(data.idPregunta); // Establece el ID de la pregunta
        } else {
          setError('No se pudo obtener la pregunta secreta del usuario');
        }
      } catch (error) {
        console.error('Error al obtener la pregunta secreta:', error);
        setError('Error al obtener la pregunta secreta');
      }
    };
  
    fetchPreguntaSecreta();
  }, [usuario]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost/WebServices/ValidarPregunta.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ usuario, idPregunta, respuesta }), // Envía usuario, ID de pregunta y respuesta
      });

      if (!response.ok) {
        throw new Error('Error al validar la respuesta');
      }

      const data = await response.json();
      if (data.success) {
        // Respuesta correcta, redirige al usuario a RestaurarContraseña
        navigate(`/RestaurarContrasena/${usuario}`); // Utiliza navigate para redirigir
      } else {
        // Respuesta incorrecta, muestra un mensaje de error
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
    <center><h2 className="forgot-password-title">Responda la pregunta secreta para poder restaurar su contraseña</h2></center>
      <h2 className="forgot-password-title">Usuario: {usuario}</h2>
      <h2 className="forgot-password-title">{preguntaSecreta}</h2>
      <form className="forgot-password-form" onSubmit={handleSubmit}>
        <div className="form-group">
        <input type="text"  placeholder="Responda la pregunta" className="form-control" value={respuesta} onChange={(e) => setRespuesta(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">Responder</button>
      </form>
      <br />
      {error && <p>{error}</p>}

    </div>

    </div>
  );
};

export default ResponderPregunta;

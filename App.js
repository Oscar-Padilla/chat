import React, { useState } from 'react';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import ChatScreen from './screens/ChatScreen';

export default function App() {
  const [pantalla, setPantalla] = useState('login');
  const [usuarioActivo, setUsuarioActivo] = useState(null);
  const [colorRol, setColorRol] = useState(null);

  function iniciarSesion(usuario, color) {
    setUsuarioActivo(usuario);
    setColorRol(color);
    setPantalla('home');
  }

  function cerrarSesion() {
    setUsuarioActivo(null);
    setColorRol(null);
    setPantalla('login');
  }

  if (pantalla === 'registro') {
    return <RegisterScreen setPantalla={setPantalla} />;
  }

  if (pantalla === 'login') {
    return <LoginScreen setPantalla={setPantalla} iniciarSesion={iniciarSesion} />;
  }

  if (pantalla === 'home') {
    return <HomeScreen usuario={usuarioActivo} colorRol={colorRol} setPantalla={setPantalla} cerrarSesion={cerrarSesion} />;
  }

  if (pantalla === 'chat') {
    return <ChatScreen usuario={usuarioActivo} colorRol={colorRol} setPantalla={setPantalla} />;
  }
}

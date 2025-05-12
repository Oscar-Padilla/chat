import React, { useState } from 'react';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import ChatScreen from './screens/ChatScreen';

export default function App() {
  const [pantalla, setPantalla] = useState('login');
  const [usuarioActivo, setUsuarioActivo] = useState(null);

  if (pantalla === 'registro') {
    return <RegisterScreen setPantalla={setPantalla} />;
  }

  if (pantalla === 'login') {
    return <LoginScreen setPantalla={setPantalla} setUsuarioActivo={setUsuarioActivo} />;
  }

  if (pantalla === 'home') {
    return <HomeScreen usuario={usuarioActivo} setPantalla={setPantalla} setUsuarioActivo={setUsuarioActivo} />;
  }

  if (pantalla === 'chat') {
    return <ChatScreen usuario={usuarioActivo} setPantalla={setPantalla} />;
  }
}

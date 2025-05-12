import React, { useState } from 'react';
import { View, Text, TextInput, Button, KeyboardAvoidingView, Platform } from 'react-native';
import { db } from '../firebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { styles } from '../styles';

export default function RegisterScreen({ setPantalla }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function registrar() {
    if (!username || !password) return alert('Llena ambos campos');
    const userRef = doc(db, 'usuarios', username);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      alert('Usuario ya existe');
    } else {
      await setDoc(userRef, { password });
      alert('Registrado correctamente');
      setPantalla('login');
    }
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Registro</Text>
        <TextInput style={styles.input} placeholder="Usuario" value={username} onChangeText={setUsername} />
        <TextInput style={styles.input} placeholder="Contraseña" value={password} onChangeText={setPassword} secureTextEntry />
        <View style={styles.button}>
          <Button title="Registrar" onPress={registrar} />
        </View>
        <View style={styles.button}>
          <Button title="Ya tengo cuenta" onPress={() => setPantalla('login')} />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

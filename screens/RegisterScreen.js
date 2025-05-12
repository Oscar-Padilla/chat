import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { db } from '../firebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { styles } from '../styles';

export default function RegisterScreen({ setPantalla }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [colorRol, setColorRol] = useState('rojo');
    const [open, setOpen] = useState(false);

    async function registrar() {
        if (!username || !password) return alert('Llena todos los campos');
        const userRef = doc(db, 'usuarios', username);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            alert('Usuario ya existe');
        } else {
            await setDoc(userRef, { password, colorRol });
            alert('Registrado correctamente');
            setPantalla('login');
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Registro</Text>
            <TextInput style={styles.input} placeholder="Usuario" value={username} onChangeText={setUsername} />
            <TextInput style={styles.input} placeholder="Contraseña" value={password} onChangeText={setPassword} secureTextEntry />
            <Text style={{ marginBottom: 5 }}>Selecciona tu color:</Text>
            <DropDownPicker
                open={open}
                value={colorRol}
                items={[
                    { label: 'Rojo', value: 'rojo' },
                    { label: 'Amarillo', value: 'amarillo' },
                    { label: 'Azul', value: 'azul' },
                ]}
                setOpen={setOpen}
                setValue={setColorRol}
                style={styles.input}
            />
            <Button title="Registrar" onPress={registrar} />
            <Button title="Ya tengo cuenta" onPress={() => setPantalla('login')} />
        </View>
    );
}

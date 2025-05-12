import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, KeyboardAvoidingView, Platform, TouchableOpacity, SafeAreaView } from 'react-native';
import { db } from '../firebaseConfig';
import { collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { Ionicons } from '@expo/vector-icons';

export default function ChatScreen({ usuario, colorRol, setPantalla }) {
    const [mensaje, setMensaje] = useState('');
    const [mensajes, setMensajes] = useState([]);

    async function enviarMensaje() {
        if (!mensaje) return;
        await addDoc(collection(db, 'chats'), {
            mensaje,
            usuario,
            colorRol,
            fecha: new Date()
        });
        setMensaje('');
    }

    useEffect(() => {
        const q = query(collection(db, 'chats'), orderBy('fecha'));
        const unsub = onSnapshot(q, (snapshot) => {
            const msgs = snapshot.docs.map(doc => doc.data());
            // Filtrar según el color del usuario
            const filtered = msgs.filter(m =>
                colorRol === 'azul' ||
                (colorRol === 'amarillo' && m.colorRol === 'amarillo')
            );
            setMensajes(filtered);
        });
        return () => unsub();
    }, []);

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={80}
        >
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, paddingHorizontal: 10, paddingTop: 10 }}>
                    <TouchableOpacity onPress={() => setPantalla('home')}>
                        <Text style={{ fontSize: 16, color: 'blue' }}>{'<- Salir'}</Text>
                    </TouchableOpacity>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 40 }}>Chat en tiempo real</Text>
                </View>

                <FlatList
                    style={{ flex: 1, paddingHorizontal: 10 }}
                    data={mensajes}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={{ paddingVertical: 5, borderBottomWidth: 1, borderBottomColor: '#eee' }}>
                            <Text style={{ fontSize: 16 }}>
                                <Text style={{
                                    color:
                                        item.colorRol === 'azul' ? '#0000FF' :
                                            item.colorRol === 'amarillo' ? '#FFD700' :
                                                item.colorRol === 'rojo' ? '#FF0000' :
                                                    '#000'  // Color por defecto si el campo está vacío o mal
                                }}>
                                    {`${item.usuario}:`}
                                </Text>
                                {` ${item.mensaje}`}
                            </Text>
                        </View>
                    )}
                />

                <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 5 }}>
                    <TextInput
                        style={{
                            flex: 1,
                            borderWidth: 1,
                            borderColor: '#ccc',
                            borderRadius: 20,
                            paddingHorizontal: 15,
                            paddingVertical: Platform.OS === 'ios' ? 10 : 8,
                        }}
                        placeholder="Mensaje"
                        value={mensaje}
                        onChangeText={setMensaje}
                    />
                    <TouchableOpacity
                        onPress={enviarMensaje}
                        style={{
                            marginLeft: 10,
                            backgroundColor: '#0084ff',
                            padding: 12,
                            borderRadius: 50,
                        }}
                    >
                        <Ionicons name="send" size={20} color="white" />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
}

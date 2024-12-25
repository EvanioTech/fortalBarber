import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../api/fireconect';

export function Login() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [authUser, setAuthUser] = useState(null);
  const navigation = useNavigation();

  // Verificar o estado do usuário (se está logado ou não)
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser({
          email: user.email,
          uid: user.uid
        });
        console.log('Usuário logado:', user.email);
      } else {
        setAuthUser(null);
      }
    });

    // Limpar o listener quando o componente for desmontado
    return () => unsub();
  }, []);

  // Efetuar login do usuário
  async function loginUser() {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, pass);
      console.log('Login bem-sucedido:', userCredential.user.email);
      setAuthUser({
        email: userCredential.user.email,
        uid: userCredential.user.uid
      });
    } catch (err) {
      console.log('Erro ao fazer login:', err.code);  // Exibe o erro do Firebase (auth/invalid-email, etc.)
    }
  }

  // Redirecionar para a tela 'Main' se o usuário estiver autenticado
  useEffect(() => {
    if (authUser) {
      navigation.navigate("MainTabNavigator");  // Redireciona para a tela 'Main'
    }
  }, [authUser, navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.stylizedText}>Fortal Barber</Text>
      
        <View style={styles.overlay}>
        <ImageBackground
        source={require('../../images/fun.png')} // Substitua pelo caminho da sua imagem
        style={styles.imageBackground}
      >
          <TextInput
            style={styles.input}
            placeholder="Digite seu E-mail"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Digite sua Senha"
            value={pass}
            onChangeText={setPass}
            secureTextEntry={true}
          />
          <TouchableOpacity style={styles.areaBtn} onPress={loginUser}>
            <Text style={{ fontSize: 30, color: 'white' }}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.areaBtn2} onPress={() => navigation.navigate('Cadastro')}>
            <Text style={{ fontSize: 30, color: 'white' }}>Cadastrar</Text>
          </TouchableOpacity>
          </ImageBackground>
        </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  stylizedText: {
    fontSize: 50,
    marginTop: 70,
    color: '#FFF',
    fontWeight: 'bold',
    fontStyle: 'italic',
    textAlign: 'center',
    
    // Simulação de borda com textShadow
    textShadowColor: '#000', // Cor da sombra
    textShadowOffset: { width: 3, height: 3 }, // Deslocamento da sombra
    textShadowRadius: 10, // Difusão da sombra
  },
  container: {
    flex: 1,
    backgroundColor: '#8D2B2D',
    alignItems:'center'
    
  },
  imageBackground: {
    flex: 1,
    marginTop: 40,
    width: '380',
    height: '440', // Limita a altura da imagem para metade da tela
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:20,
    overflow: 'hidden',
    
    
    
  },
  overlay: {
    
    position: 'absolute',
    bottom: 10,  // Ajusta a posição dos inputs e botões para ficarem alinhados com a parte inferior da imagem
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '100%',
    
    marginBottom: 10,
    paddingLeft: 8,
    borderRadius: 15,
    backgroundColor: 'white',
  },
  areaBtn: {
    backgroundColor: '#8D2B2D',
    borderRadius: 10,
    width: 150,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  areaBtn2: {
    backgroundColor: '#8D2B2D',
    borderRadius: 10,
    width: 150,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
});

export default Login;

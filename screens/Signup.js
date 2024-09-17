import React from "react";
import { StyleSheet, Text, View, Button, TextInput, Image, SafeAreaView, TouchableOpacity, StatusBar, Alert  } from "react-native";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../config/firebaseConfig";	
const backImage = require("../assets/Login.png");

export default function Signup({ navigation }) {

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const onHandleSignup = () => {
      if (email !== "" && password !== "") {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Usuário criado com sucesso
            console.log("Usuário criado:", userCredential.user);
          })
          .catch((error) => {
            // Lidar com erros de criação
            console.error("Erro na criação do usuário:", error);
            Alert.alert("Erro na criação da conta", error.message);
          });
      }
    };

      return (
        <View style={styles.container}>
          <Image source={backImage} style={styles.backImage} />
          <View style={styles.whiteSheet} />
          <SafeAreaView style={styles.form}>
            <Text style={styles.title}>Inscreva-se</Text>
             <TextInput
            style={styles.input}
            placeholder="Digite o email"
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="emailAddress"
            autoFocus={true}
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Digite a senha"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true}
            textContentType="password"
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <TouchableOpacity style={styles.button} onPress={onHandleSignup}>
            <Text style={{fontWeight: 'bold', color: '#fff', fontSize: 18}}> Inscrever-se</Text>
          </TouchableOpacity>
          <View style={{marginTop: 20, flexDirection: 'row', alignItems: 'center', alignSelf: 'center'}}>
            <Text style={{color: 'gray', fontWeight: '600', fontSize: 14}}>Já tem uma conta? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={{color: '#f57c00', fontWeight: '600', fontSize: 14}}> Logar</Text>
            </TouchableOpacity>
          </View>
          </SafeAreaView>
          <StatusBar barStyle="light-content" />
        </View>
      );
    }
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: "#fff",
      },
      title: {
        fontSize: 36,
        fontWeight: 'bold',
        color: "orange",
        alignSelf: "center",
        paddingBottom: 24,
      },
      input: {
        backgroundColor: "#F6F7FB",
        height: 58,
        marginBottom: 20,
        fontSize: 16,
        borderRadius: 10,
        padding: 12,
      },
      backImage: {
        width: "100%",
        height: 340,
        position: "absolute",
        top: 0,
        resizeMode: 'cover',
      },
      whiteSheet: {
        width: '100%',
        height: '75%',
        position: "absolute",
        bottom: 0,
        backgroundColor: '#fff',
        borderTopLeftRadius: 60,
      },
      form: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 30,
      },
      button: {
        backgroundColor: '#f57c00',
        height: 58,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
      },
    });
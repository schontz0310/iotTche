import React, { useCallback, useEffect, useRef, useState } from 'react';

import {
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  View,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import { ScrollView } from 'react-native-gesture-handler';
import logoImg from '../../assets/logo.png';
import logoImgMini from '../../assets/logoMini.png';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';

import { useAuth } from '../../hook/auth';
import getValidationErrors from '../../utils/getvalidationErros';

import backgroundImage from '../../assets/backgroundImage.png';

import {
  Container,
  CreateAcountButton,
  CreateAcountButtonText,
  ForgotPassword,
  ForgotPasswordText,
  Title,
  BackgroundImage,
  LogoContainer,
} from './styles';
import api from '../../services/api';

interface SignUpForData {
  email: string;
  password: string;
}

const Login = () => {
  const passwordInputRef = useRef<TextInput>(null);
  const formRef = useRef<FormHandles>(null);
  const navigate = useNavigation();

  const { signIn } = useAuth();
  const [showSignInButton, setShowSignInButton] = useState(true);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setShowSignInButton(false);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setShowSignInButton(true);
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const handleSignIn = useCallback(
    async (data: SignUpForData) => {
      try {
        formRef.current?.setErrors({});

        const schemaValidation = Yup.object().shape({
          email: Yup.string().required('E-mail obrigatório'),
          // .email('Digite um e-mail válido'),
          password: Yup.string().min(6, 'minimo de 6 dígitos'),
        });
        await schemaValidation.validate(data, {
          abortEarly: false,
        });

        await signIn({
          email: data.email,
          password: data.password,
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          console.log(errors);
          formRef.current?.setErrors(errors);
          return;
        }
        // disparar um toast
        console.log(err);
        Alert.alert(
          'Erro no Cadastro',
          'Ocorreu um erro ao logar na aplicação, cheque os campos',
        );
      }
    },
    [signIn],
  );

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
      }}
      enabled
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <BackgroundImage
        source={backgroundImage}
        imageStyle={{
          left: -150,
          top: -80,
          width: 500,
          height: 500,
        }}
      />
      <ScrollView
        contentContainerStyle={{ flex: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <Container>
          <Image source={logoImg} />
          <Title>Faça seu login</Title>
          <Form ref={formRef} onSubmit={handleSignIn}>
            <Input
              name="email"
              icon="mail"
              placeholder="E-mail"
              autoCorrect={false}
              autoCapitalize="none"
              autoCompleteType="off"
              keyboardType="email-address"
              returnKeyType="next"
              onSubmitEditing={() => {
                passwordInputRef.current?.focus();
              }}
            />
            <Input
              ref={passwordInputRef}
              name="password"
              icon="lock"
              placeholder="Senha"
              secureTextEntry
              returnKeyType="send"
              onSubmitEditing={() => {
                formRef.current?.submitForm();
              }}
            />

            <Button
              onPress={() => {
                formRef.current?.submitForm();
              }}
            >
              Entrar
            </Button>
          </Form>
          {showSignInButton && (
            <ForgotPassword
              onPress={() => {
                console.log('es queci a senha');
              }}
            >
              <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
            </ForgotPassword>
          )}
        </Container>
        {showSignInButton && (
          <CreateAcountButton onPress={() => navigate.navigate('Register')}>
            <CreateAcountButtonText>Criar conta</CreateAcountButtonText>
          </CreateAcountButton>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;

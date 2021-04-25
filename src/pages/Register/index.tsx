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

import * as Yup from 'yup';

import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import logoImg from '../../assets/logo.png';
import logoImgMini from '../../assets/logoMini.png';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';

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

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}
const Register = () => {
  const inputEmailRef = useRef<TextInput>(null);
  const inputPasswordRef = useRef<TextInput>(null);
  const formRef = useRef<FormHandles>(null);
  const navigate = useNavigation();
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

  const handleSignUp = useCallback(
    async (data: SignUpFormData) => {
      console.log(data);
      try {
        formRef.current?.setErrors({});
        const schemaValidation = Yup.object().shape({
          name: Yup.string().required('Nome Obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().min(6, 'minimo de 6 dígitos'),
        });
        await schemaValidation.validate(data, {
          abortEarly: false,
        });

        /* await api.post('/users', data);
        Alert.alert(
          'Cadastro realizado!',
          'Você já pode fazer login no GoBarber!',
        ); */

        Alert.alert(
          'Solicitação realizada com sucesso',
          `${data.name}, assim que realizarmos seu cadastro voce recebera suas credencias no seguinte email ${data.email}`,
        );

        navigate.navigate('Login');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          console.log('deu erro');
          return;
        }
        // disparar um toast
        Alert.alert(
          'Erro no Cadastro',
          'Ocorreu um erro ao cadastrar novo usuario, cheque os campos',
        );
      }
    },
    [navigate],
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
          {showSignInButton ? (
            <>
              <LogoContainer>
                <Image
                  source={logoImg}
                  resizeMode="contain"
                  style={{ maxWidth: '70%' }}
                />
              </LogoContainer>
              <Title>Faça seu login</Title>
            </>
          ) : (
            <Image
              resizeMode="contain"
              source={logoImgMini}
              style={{
                marginBottom: 36,
              }}
            />
          )}

          <Form ref={formRef} onSubmit={handleSignUp}>
            <Input
              autoCapitalize="words"
              name="name"
              icon="user"
              placeholder="Nome"
              returnKeyType="next"
              onSubmitEditing={() => {
                inputEmailRef.current?.focus();
              }}
            />
            <Input
              ref={inputEmailRef}
              textContentType="none"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              autoCompleteType="off"
              name="email"
              icon="mail"
              placeholder="E-mail"
              returnKeyType="next"
              onSubmitEditing={() => {
                inputPasswordRef.current?.focus();
              }}
            />
            <Input
              ref={inputPasswordRef}
              textContentType="newPassword"
              name="password"
              icon="lock"
              placeholder="Senha"
              returnKeyType="send"
              secureTextEntry
              onSubmitEditing={() => {
                formRef.current?.submitForm();
              }}
            />

            <Button
              onPress={() => {
                formRef.current?.submitForm();
              }}
            >
              Solcitar
            </Button>
          </Form>
        </Container>
        {showSignInButton && (
          <CreateAcountButton onPress={() => navigate.navigate('Login')}>
            <CreateAcountButtonText>Voltar pra Login</CreateAcountButtonText>
          </CreateAcountButton>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Register;

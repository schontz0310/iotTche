import React from 'react';

import { Image, KeyboardAvoidingView, Platform } from 'react-native';

import logoImg from '../../assets/logo.png';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';

import {
  Container,
  CreateAcountButton,
  CreateAcountButtonText,
  ForgotPassword,
  ForgotPasswordText,
  Title,
} from './styles';

const Login = () => {
  return (
    <>
      <Container>
        <Image source={logoImg} />
        <Title>Faça seu login</Title>
        <Input name="email" icon="mail" placeholder="Email" />
        <Input name="password" icon="lock" placeholder="senha" />
        <Button
          onPress={() => {
            console.log('click');
          }}
        >
          Entrar
        </Button>
        <ForgotPassword>
          <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
        </ForgotPassword>
      </Container>
      <CreateAcountButton
        onPress={() => {
          console.log('clicou');
        }}
      >
        <CreateAcountButtonText>Criar conta</CreateAcountButtonText>
      </CreateAcountButton>
    </>
  );
};

export default Login;

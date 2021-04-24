import React, { useEffect, useState } from 'react';

import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  View,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { ScrollView } from 'react-native-gesture-handler';
import logoImg from '../../assets/logo.png';
import logoImgMini from '../../assets/logoMini.png';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';

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

const Login = () => {
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

          <Input name="email" icon="mail" placeholder="Email" />
          <Input name="password" icon="lock" placeholder="senha" />
          <Button
            onPress={() => {
              console.log('click');
            }}
          >
            Entrar
          </Button>
          {showSignInButton && (
            <ForgotPassword>
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

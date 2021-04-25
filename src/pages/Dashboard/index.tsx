import React from 'react';

import { Button } from 'react-native';
import { Container, Title } from './styles';

import { useAuth } from '../../hook/auth';

import api from '../../services/api';

const Dashboard: React.FC = () => {
  const { user, token, signOut } = useAuth();

  return (
    <>
      <Container>
        <Title>Dashboard</Title>
        <Title>{token}</Title>
        <Title>{`id = ${user.id}`}</Title>
        <Title>{`email = ${user.email}`}</Title>
        <Button onPress={signOut} title="Sair" />
      </Container>
    </>
  );
};

export default Dashboard;

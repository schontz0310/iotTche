import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  width: 100%;
  height: 60px;
  background: #fff;
  border-radius: 8px;

  justify-content: center;
  align-items: center;
  margin-top: 8px;
`;

export const ButtomText = styled.Text`
  font-family: 'Roboto-Medium';
  color: #000;
  font-size: 20px;
`;

/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
import { RectButtonProperties } from 'react-native-gesture-handler';

import { Container, ButtomText } from './styles';

interface ButtonProps extends RectButtonProperties {
  children: string;
}

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => {
  return (
    <Container {...rest}>
      <>
        <ButtomText>{children}</ButtomText>
      </>
    </Container>
  );
};

export default Button;

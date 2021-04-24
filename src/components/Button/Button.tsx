/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
import { RectButtonProperties } from 'react-native-gesture-handler';

import { Container, ButtomText } from './styles';

interface ButtonProps extends RectButtonProperties {
  children: string;
  color?: string;
  textColor?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  color = '#39b100',
  textColor = '#fff',
  ...rest
}) => {
  return (
    <Container
      {...rest}
      style={{
        backgroundColor: `${color}`,
      }}
    >
      <>
        <ButtomText
          style={{
            color: `${textColor}`,
          }}
        >
          {children}
        </ButtomText>
      </>
    </Container>
  );
};

export default Button;

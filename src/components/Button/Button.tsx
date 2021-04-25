/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { Container, ButtomText } from './styles';

interface ButtonProps extends TouchableOpacityProps {
  children: string;
  color?: string;
  textColor?: string;
}

const Button: React.ElementType<ButtonProps> = ({
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

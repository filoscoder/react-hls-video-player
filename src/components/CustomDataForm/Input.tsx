import { HTMLAttributes } from "react";
import styled from "styled-components";

interface InputProps extends HTMLAttributes<HTMLInputElement> {
  name: string;
  value: string;
}

const StyledInput = styled.input`
  width: 100%;
  height: auto;
`;

const Input = ({ ...rest }: InputProps) => {
  return <StyledInput {...rest} />;
};

export default Input;

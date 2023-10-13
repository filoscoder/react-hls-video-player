import { rem } from "@utils";
import { HTMLAttributes } from "react";
import styled from "styled-components";

interface InputProps extends HTMLAttributes<HTMLInputElement> {
  name: string;
  value: string;
}

const StyledInput = styled.input`
  width: 100%;
  height: ${rem("32px")};
  outline: none;
  border: none;
  border-radius: 4px 0 0 4px;
  padding: 0 1rem;
`;

const Input = ({ ...rest }: InputProps) => {
  return <StyledInput {...rest} />;
};

export default Input;

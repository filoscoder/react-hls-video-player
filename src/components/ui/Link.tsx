import { HTMLAttributes } from "react";
import styled from "styled-components";

interface LinkProps extends HTMLAttributes<HTMLAnchorElement> {
  href?: string;
}

const StyledAnchor = styled.a`
  &:visited,
  &:link {
    color: #ffffff;
  }
`;

const Link = ({ children, ...rest }: LinkProps) => {
  return <StyledAnchor {...rest}>{children}</StyledAnchor>;
};

export default Link;

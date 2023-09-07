import { CSSProperties, HTMLAttributes } from "react";
import styled from "styled-components";

interface FlexProps extends HTMLAttributes<HTMLDivElement> {
  direction?: CSSProperties["flexDirection"];
  justifyContent?: CSSProperties["justifyContent"];
  alignItems?: CSSProperties["alignItems"];
}

const StyledFlexDiv = styled.div<FlexProps>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: ${({ direction }) => direction || "row"};
  justify-content: ${({ justifyContent }) => justifyContent || "center"};
  align-items: ${({ alignItems }) => alignItems || "center"};
`;

const Flex = ({ children, className, ...rest }: FlexProps) => {
  return (
    <StyledFlexDiv className={className} {...rest}>
      {children}
    </StyledFlexDiv>
  );
};

export default Flex;

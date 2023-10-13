import { CSSProperties, HTMLAttributes } from "react";
import styled from "styled-components";

interface FlexProps extends HTMLAttributes<HTMLDivElement> {
  $direction?: CSSProperties["flexDirection"];
  $justify?: CSSProperties["justifyContent"];
  $align?: CSSProperties["alignItems"];
}

const StyledFlexDiv = styled.div<FlexProps>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: ${({ $direction }) => $direction || "row"};
  justify-content: ${({ $justify }) => $justify || "center"};
  align-items: ${({ $align }) => $align || "center"};
`;

const Flex = ({
  children,
  className,
  $direction,
  $justify,
  $align,
  ...rest
}: FlexProps) => {
  return (
    <StyledFlexDiv
      className={className}
      $direction={$direction}
      $justify={$justify}
      $align={$align}
      {...rest}
    >
      {children}
    </StyledFlexDiv>
  );
};

export default Flex;

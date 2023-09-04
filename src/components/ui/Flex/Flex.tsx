import { CSSProperties, FC, HTMLAttributes, PropsWithChildren } from "react";
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

const Flex: FC<PropsWithChildren<FlexProps>> = (props) => {
  const { children, className, ...rest } = props;

  return (
    <StyledFlexDiv className={className} {...rest}>
      {children}
    </StyledFlexDiv>
  );
};

export default Flex;

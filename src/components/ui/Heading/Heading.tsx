import { HTMLAttributes } from "react";
import { DynamicTag } from "../DynamicTag";
import { rem } from "@utils";
import { styled } from "styled-components";

type HeadingKeys = `h${1 | 2 | 3 | 4 | 5 | 6}`;

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  tag: HeadingKeys;
  color?: string;
}

const headingStyleMap = {
  h1: rem(32),
  h2: rem(24),
  h3: rem(21),
  h4: rem(19),
  h5: rem(17),
  h6: rem(15),
};

const StyledHeadingElement = styled(DynamicTag)<HeadingProps>`
  font-family: Helvetica;
  font-size: ${({ tag }) => headingStyleMap[tag]};
  color: ${({ color }) => color};
  margin: ${rem(16)} 0;
`;

const StyledHeading = ({
  tag,
  color = "#fff",
  className,
  children,
}: HeadingProps) => {
  return (
    <StyledHeadingElement
      className={className}
      tagName={tag}
      tag={tag}
      color={color}
    >
      {children}
    </StyledHeadingElement>
  );
};

export default StyledHeading;

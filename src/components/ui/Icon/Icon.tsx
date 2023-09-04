import { SVGAttributes } from "react";

import { rem } from "../../../utils/rem";
import iconMap from "./iconMap.json";
import styled from "styled-components";

const StyledIcon = styled.svg`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  min-width: ${({ width }) => width};
  min-height: ${({ height }) => height};
`;

export type IconName = keyof typeof iconMap;

interface IconProps extends SVGAttributes<SVGElement> {
  name: IconName;
  size?: `${number}px`;
  color?: string;
}

const Icon = ({ name, size = "24px", color = "#fff", ...rest }: IconProps) => {
  const d = (iconMap[name] || "") as string;
  const relativeSize = rem(size);

  return (
    <StyledIcon
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      width={relativeSize}
      height={relativeSize}
      {...rest}
    >
      <path fillRule="evenodd" clipRule="evenodd" d={d} fill={color} />
    </StyledIcon>
  );
};

export default Icon;

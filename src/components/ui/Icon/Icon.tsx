import { SVGAttributes } from "react";
import { rem } from "../../../utils";
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
  title?: string;
  name: IconName;
  size?: `${number}px`;
  color?: string;
}

const Icon = ({
  title,
  name,
  size = "20px",
  color = "#fff",
  ...rest
}: IconProps) => {
  const d = (iconMap[name] || "") as string;
  const relativeSize = rem(size);

  return (
    <span
      title={title}
      style={{ height: name !== "spinner" ? relativeSize : 0 }}
    >
      <StyledIcon
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        width={relativeSize}
        height={relativeSize}
        {...rest}
      >
        {name === "playing" && (
          <polygon points="2 3 2 11 8 7 2 3" fill={color}></polygon>
        )}
        <path fillRule="evenodd" clipRule="evenodd" d={d} fill={color} />
      </StyledIcon>
    </span>
  );
};

export default Icon;

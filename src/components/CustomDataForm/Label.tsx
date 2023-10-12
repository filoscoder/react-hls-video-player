import { HTMLAttributes } from "react";
import { Heading } from "@components/ui";
import styled from "styled-components";
import { rem } from "@utils";

interface LabelProps extends HTMLAttributes<HTMLLabelElement> {}

const StyledLabel = styled(Heading)`
  margin-right: ${rem("8px")};
`;

const Label = ({ children }: LabelProps) => {
  return <StyledLabel tag="h3">{children}</StyledLabel>;
};

export default Label;

import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import { useNavigate } from "react-router-dom";
import { Flex } from "../ui";
import StyledHeading from "@components/ui/Heading/Heading";

const RootErrorBoundary = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  return (
    <ErrorBoundary
      fallbackRender={({ resetErrorBoundary }: FallbackProps) => (
        <Flex direction="column">
          <StyledHeading tag="h1">{"Something went wrong"}</StyledHeading>
          <button
            onClick={() => {
              resetErrorBoundary();
              navigate("/");
            }}
          >
            Go to Home
          </button>
        </Flex>
      )}
    >
      {children}
    </ErrorBoundary>
  );
};

export default RootErrorBoundary;

import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import { useNavigate } from "react-router-dom";
import { Flex, Heading } from "@components/ui";

const RootErrorBoundary = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  return (
    <ErrorBoundary
      fallbackRender={({ resetErrorBoundary }: FallbackProps) => (
        <Flex $direction="column">
          <Heading tag="h1">{"Something went wrong"}</Heading>
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

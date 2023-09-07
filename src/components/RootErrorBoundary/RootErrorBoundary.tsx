import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import { useNavigate } from "react-router-dom";
import { Flex } from "../ui";

const RootErrorBoundary = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  return (
    <ErrorBoundary
      fallbackRender={({ resetErrorBoundary }: FallbackProps) => (
        <Flex direction="column">
          <h1>{"Something went wrong"}</h1>
          <button
            onClick={() => {
              resetErrorBoundary();
              navigate("/");
            }}
          >
            Go Back
          </button>
        </Flex>
      )}
    >
      {children}
    </ErrorBoundary>
  );
};

export default RootErrorBoundary;

import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import { useNavigate } from "react-router-dom";
import { Flex } from "../ui";

const RootErrorBoundary = (props: any) => {
  const { children } = props;
  const navigate = useNavigate();
  return (
    <ErrorBoundary
      fallbackRender={({ resetErrorBoundary }: FallbackProps) => (
        <Flex direction="column">
          <span>{"Something went wrong"}</span>
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

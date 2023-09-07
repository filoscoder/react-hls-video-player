import { useNavigate } from "react-router-dom";
import { Flex } from "../components/ui";
import StyledHeading from "@components/ui/Heading/Heading";

const Home = () => {
  const navigate = useNavigate();
  return (
    <Flex direction="column" style={{ backgroundColor: "purple" }}>
      <StyledHeading tag="h1">Home</StyledHeading>
      <button
        onClick={() => {
          navigate("/player");
        }}
      >
        Go to Player
      </button>
    </Flex>
  );
};

export default Home;

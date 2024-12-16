import Navigation from "../components/Navigation";
import Box from "../components/Box";
import styled from "styled-components";
const Home = () => {
  return (
    <StyledHome>
      <Navigation />
      <Box />
    </StyledHome>
  );
};

const StyledHome = styled.div``;
export default Home;

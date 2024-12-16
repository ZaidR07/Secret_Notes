import styled from "styled-components";
import Cookies from "js-cookie";
import { jwtDecode} from "jwt-decode";

const Navigation = () => {
  const token = Cookies.get("token");
  console.log(token);
  
  let decodedtoken = null;
  if (token) {
    decodedtoken = jwtDecode(token);
    console.log(decodedtoken);
    
  }

  return <StyledNavigation>

  </StyledNavigation>;
};

const StyledNavigation = styled.div`
  width: 100%;
  height: 8vh;
  background-color: #8b122c;
`;
export default Navigation;

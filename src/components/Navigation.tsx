import styled from "styled-components";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

type CustomJwtPayload = {
  username: string;
};

const Navigation = () => {
  const [name, setName] = useState("");
  const token = Cookies.get("token");

  const extractFirstLetter = (name: string) => {
    setName(name.slice(0, 1).toUpperCase());
  };

  useEffect(() => {
    const token = Cookies.get("token");

    
    
    if (token) {
      try {
        const decodedToken = jwtDecode<CustomJwtPayload>(token);
        console.log("Decoded Token:", decodedToken);
        extractFirstLetter(decodedToken.username);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    } else {
      console.log("No token found");
    }
  }, [token]);

  return (
    <StyledNavigation>
      <div className="profile">
        <p>{name}</p>
      </div>
    </StyledNavigation>
  );
};

const StyledNavigation = styled.div`
  width: 100%;
  height: 8vh;
  background-color: #8b122c;
  display: flex;
  align-items: center;

  .profile {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: white; /* Added background for visibility */
    display: grid;
    place-items: center;
    margin-left: auto;
    margin-right: 10px;
    color: #8b122c;
    font-size: larger;
    font-weight: bold; /* Enhances readability */
  }
`;

export default Navigation;

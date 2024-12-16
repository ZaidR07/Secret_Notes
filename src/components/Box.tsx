import { useState } from "react";
import styled from "styled-components";

const Box = () => {
  const [addbox, setAddbox] = useState(false);
  return (
    <StyledBox addbox={addbox}>
      <div className="creationbox">
        <button
          onClick={() => setAddbox(true)}
          style={{
            padding: "3%",
            borderRadius: "10px",
            color: "#fff",
            border: 0,
            backgroundColor: "#8B122C",
          }}
        >
          Create New
        </button>
      </div>
      <div className="notescontainer">
        <div className="note"></div>
      </div>

      <div className="addbox">









        
      </div>
    </StyledBox>
  );
};

const StyledBox = styled.div`
  padding: 5%;

  .notescontainer {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
  }

  .note {
    margin-top: 2vh;
    width: 100%;
    min-height: 10vh;
    border: 2px solid #8b122c;
    border-radius: 10px;
  }

  .addbox {
    margin-left: 5%;
    width: 80%;
    min-height: 20vh;
    border-radius: 10px;
    background-color: #cbcdcf;
    position: absolute;
    top: 20vh;
    transform: ${({ addbox }) =>
      addbox ? "translateX(0)" : "translateX(-120%)"};
    transition: transform 0.3s ease;
  }
`;

export default Box;

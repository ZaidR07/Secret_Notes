import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { uri } from "../contant";
import { Close } from "../assets/icons";

const Box = () => {
  const [addbox, setAddbox] = useState(false);
  const [newtext, setNewtext] = useState("");
  const [newtitle, setNewtitle] = useState("");

  const [notesarray, setNotesArray] = useState([]);

  type note = {
    id : number,
    userid : number,
    title : string,
    text : string
  }

  const handleTextareaInput = (e : React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;

    textarea.style.height = "auto"; // Reset height to recalculate
    textarea.style.height = `${textarea.scrollHeight}px`; // Set new height
  };

  const handleSave = async () => {
    try {
      const response = await axios.post(
        `${uri}createnotes`,
        {
          title: newtext,
          text: newtitle,
        },
        {
          withCredentials: true,
        }
      );
      if (response) {
        alert(response.data.message);
      }
      if(response.data.notes != null){
        setNotesArray(response.data.notes);
      }else{
        alert("Notes created but Unable to update the list of notes")
      }

    } catch {
      return;
    }
  };

  const fetchdata = async () => {
    const response = await axios.get(`${uri}getnotes`, {
      withCredentials: true,
    });

    if (response.status == 200) {
      setNotesArray(response.data.notes);
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);

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
        {notesarray && notesarray.length > 0 ? (
          notesarray.map((item : note) => <div key={item.id} className="note">
            <h4 style={{textAlign : "center"}}>{item.title}</h4>
            <p>{item.text}</p>

          </div>)
        ) : (
          <p>No notes available</p>
        )}
      </div>

      <div className="addbox">
        <Close width={200} fill="#8b122c" onClick={() => setAddbox(false)}/>
        <label style={{ backgroundColor: "#cbcdcf" }} htmlFor="">
          Title
        </label>
        <br />
        <input
          className="inputs"
          type="text"
          onBlur={(e) => setNewtitle(e.target.value)}
        />
        <br />
        <br />
        <label style={{ backgroundColor: "#cbcdcf" }} htmlFor="">
          Note:-
        </label>
        <br />
        <br />
        <textarea
          className="note-input"
          onInput={handleTextareaInput}
          onBlur={(e) => setNewtext(e.target.value)}
        ></textarea>
        <button
          onClick={handleSave}
          style={{
            marginTop: "1vh",
            marginLeft: "78%",
            padding: "4%",
            backgroundColor: "#8b122c",
            color: "#fff",
            borderRadius: "10px",
            border: 0,
          }}
        >
          Create
        </button>
      </div>
    </StyledBox>
  );
};

const StyledBox = styled.div<{ addbox: boolean }>`
  padding: 5%;

  .notescontainer {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
  }

  .note {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin-top: 2vh;
    padding: 2%;
    width: 100%;
    min-height: 10vh;
    border: 2px solid #8b122c;
    border-radius: 10px;
  }

  .addbox {
    margin-left: 5%;
    width: 80%;
    min-height: 20vh;
    padding: 5%;
    border-radius: 10px;
    background-color: #cbcdcf;
    position: absolute;
    top: 20vh;
    transform: ${({ addbox }) =>
      addbox ? "translateX(0)" : "translateX(-120%)"};
    transition: transform 0.3s ease;
  }

  .inputs {
    width: 100%;
    background-color: #cbcdcf;
    border-color: #8b122c;
    outline: 0;
    border-top: 0;
    border-right: 0;
    border-left: 0;
  }

  .note-input {
    width: 100%;
    background-color: #cbcdcf;
    border-color: #8b122c;
    border: 2px solid #8b122c;
    min-height: 10vh;
    max-height: 60vh;
    outline: 0;
    height: auto;
    overflow: scroll;
    resize: none; /* Prevent manual resizing */
  }
`;

export default Box;

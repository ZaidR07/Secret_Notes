import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { uri } from "../contant";
import { Close, Delete } from "../assets/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { solidheart } from "../contant";

const Box = () => {
  const [addbox, setAddbox] = useState(false);
  const [newtext, setNewtext] = useState("");
  const [newtitle, setNewtitle] = useState("");

  const [notesarray, setNotesArray] = useState([]);

  const [favouritearray, setFavouriteArray] = useState<number[]>([]);

  type note = {
    id: number;
    userid: number;
    title: string;
    text: string;
    favourite: boolean;
  };

  const handleTextareaInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;

    textarea.style.height = "auto"; // Reset height to recalculate
    textarea.style.height = `${textarea.scrollHeight}px`; // Set new height
  };

  const RemoveElement = (id: number) => {
    const filterednotes = notesarray.filter((item: note) => item.id != id);
    setNotesArray(filterednotes);
  };

  const handleSave = async () => {
    try {
      const response = await axios.post(
        `${uri}createnotes`,
        {
          title: newtitle,
          text: newtext,
        },
        {
          withCredentials: true,
        }
      );
      if (response) {
        alert(response.data.message);
      }
      if (response.data.notes != null) {
        setNotesArray(response.data.notes);
        setAddbox(false);
      } else {
        alert("Notes created but Unable to update the list of notes");
      }
    } catch {
      return;
    }
  };

  const HandleDelete = async (id: number) => {
    try {
      const response = await axios.delete(`${uri}deletenote`, {
        data: { id: id },
        withCredentials: true,
      });

      if (response.status == 200) {
        RemoveElement(response.data.id);
      } else {
        alert(response.data.message);
      }
    } catch {
      alert("Something Went Wrong");
    }
  };

  const HandleLiked = async (id: number): Promise<void> => {
    try {
      const response = await axios.post(
        `${uri}like`,
        {
          id,
        },
        { withCredentials: true }
      );
      if (response.status != 200) {
        alert("Something Went Wrong");
        return;
      }

      setFavouriteArray((prev) => [...prev, id]);

      

    } catch {
      alert("Something Went Wrong, Please try Again");
    }
  };

  const HandleUnLike = async (id: number): Promise<void> => {
    try {
      const response = await axios.post(
        `${uri}unlike`,
        {
          id,
        },
        { withCredentials: true }
      );
      if (response.status != 200) {
        alert("Something Went Wrong");
        return;
      }

      setFavouriteArray((prev) => prev.filter((item) => item !== id)); 
    } catch {
      alert("Something Went Wrong, Please try Again");
    }
  };

  const fetchdata = async () => {
    const response = await axios.get(`${uri}getnotes`, {
      withCredentials: true,
    });

    if (response.status == 200) {
      setNotesArray(response.data.notes);
      
      const data = response.data.notes;
      
      // Directly map the data to an array of note IDs
      const arr = data.map((item: note) => item.id);
      
      setFavouriteArray(arr);
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
          notesarray.map((item: note) => (
            <div key={item.id} className="note">
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                {favouritearray.includes(item.id) ? (
                  <FontAwesomeIcon
                    icon={solidheart}
                    style={{ fontSize: "25px", color: "red" }}
                    onClick={() => HandleUnLike(item.id)}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faHeart}
                    style={{ fontSize: "25px", color: "red" }}
                    onClick={() => HandleLiked(item.id)}
                  />
                )}

                <Delete
                  width={20}
                  style={{ marginLeft: "5%" }}
                  fill="#8b122c"
                  onClick={() => HandleDelete(item.id)}
                />
              </div>

              <h4 style={{ textAlign: "center" }}>{item.title}</h4>
              <p>{item.text}</p>
            </div>
          ))
        ) : (
          <p style={{ marginTop: "3vh", fontSize: "20px", color: "#8b122c" }}>
            No notes available
          </p>
        )}
      </div>

      <div className="addbox">
        <Close
          width={30}
          fill="#8b122c"
          style={{ marginLeft: "90%", backgroundColor: "#cbcdcf" }}
          onClick={() => setAddbox(false)}
        />
        <label style={{ backgroundColor: "#cbcdcf" }} htmlFor="">
          Title:-
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

  .heart {
    position: relative;
    width: 16px;
    height: 16px;
    background-color: ${({ addbox }) => (addbox ? "red" : "yellow")};
    transform: rotate(-45deg);
    margin-left: auto;
    margin-right: 15%;
    margin-top: -15px;
  }

  .heart::before,
  .heart::after {
    content: "";
    position: absolute;
    width: 16px;
    height: 16px;
    background-color: ${({ addbox }) => (addbox ? "red" : "yellow")};
    border-radius: 50%;
  }

  .heart::before {
    top: -10px;
    left: 0;
  }

  .heart::after {
    top: 0;
    left: 10px;
  }
`;

export default Box;

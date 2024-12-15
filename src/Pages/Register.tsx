import { useState } from "react";
import styled from "styled-components";
import axios from "axios";
// import { uri } from "../contant";
import { useNavigate } from "react-router-dom";

const Register = () => {

  const navigate = useNavigate();

  //States to handle Form
  const [email , setEmail] = useState("");
  const [username , setUsername] = useState("");
  const [password , setPassword] = useState("");

  const handleRegister = async () => {
    try {
      console.log("hello");

      const response = await axios.post("http://localhost:8000/api/register",{
        email , username , password
      })
      
      if(response.status == 200){
        navigate("/")
      }
      alert(response.data.message);
    } catch{
      alert("Some error occured")
    }
  }
  return (
    <StyledLogin>
      <h1
        style={{
          fontFamily: "var(--font-cursive)",
          textAlign: "center",
          fontSize: "40px",
        }}
      >
        Secret Notes
      </h1>

      <div className="loginbox">
        <div className="imagebox">
          <img
            src="/Moble_login.jpeg"
            style={{ width: "100%", objectFit: "contain" }}
            alt=""
          />
        </div>
        <div className="formbox">
          <label className="labels" htmlFor="">
            Email
          </label>
          <br />
          <input className="inputs" type="text" name="email" required 
          onChange={(e) => setEmail(e.target.value)}/>
          <br />
          <br />
          <label className="labels" htmlFor="">
            Username
          </label>
          <br />
          <input className="inputs" type="text" name="username" required 
          onChange={(e) => setUsername(e.target.value)}/>
          <br />
          <br />

          <label className="labels" htmlFor="">
            Password
          </label>
          <br />
          <input
            className="inputs"
            type="password"
            name="password"
            style={{ marginBottom: "2vh" }}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          
        </div>
        <button onClick={handleRegister} className="button">Sign Up</button>
      </div>
    </StyledLogin>
  );
};

const StyledLogin = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .loginbox {
    width: 80%;
    display: flex;
    flex-direction: column;
    box-shadow: 0px 8px 8px rgba(205, 19, 232, 0.5);

    background-color: #fff;
    border-radius: 10px;
  }

  .imagebox {
    width: 100%;
  }

  .formbox {
    margin-top: 2vh;
  }

  .inputs {
    border-top: 0;
    border-right: 0;
    border-left: 0;
    border-color: #1d1e35;
    width: 90%;
    margin-left: 5%;
  }

  .labels {
    color: #1d1e35;
    margin-left: 5%;
    font-family: var(--font-nunito-sans);
  }

  .button{
    width: 30%;
    height: 4vh;
    margin: 0 0 2vh 60%;
    background: linear-gradient(-75deg,#8B122C, #1b2d76 , #0B1023);
    color: #fff;
    border-radius: 10px;
    border: none;
    font-size: large;

    
  }
`;

export default Register;

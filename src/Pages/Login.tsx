import styled from "styled-components";

const Login = () => {
  return (
    <StyledLogin>
      <div className="loginbox">
        <div className="left">
          <img src="/Desktop_login.jpeg" style={{width : "100%" , height : "100%", objectFit : "cover"}} alt="" />
        </div>
      </div>
    </StyledLogin>
  );
};

const StyledLogin = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;

  .loginbox {
    width: 30%;
    height: 40vh;
    /* border: 1px solid black; */
    margin: auto;
    box-shadow: 0px 4px 8px rgba(205, 19, 232, 0.5);


    background-color: #fff;
    border-radius: 10px;
  }

  .left{
    width: 40%;
    height: 100%;
    
  }
`;

export default Login;

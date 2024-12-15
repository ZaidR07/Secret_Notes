import { NavLink } from "react-router-dom"

const Login = () => {
  return (
   
    <NavLink to={"/Register"}>
      <button>go to Register</button>
    </NavLink>
  )
}

export default Login
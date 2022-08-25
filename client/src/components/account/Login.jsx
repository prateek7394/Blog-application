import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { Box, Button, TextField, styled, Typography } from "@mui/material";
import { API } from "../../service/api";
import { DataContext } from "../../context/DataProvider";

const Component = styled(Box)`
  width: 400px;
  margin: auto;
  box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.6);
`;

// In styled we pass html elements as a string and write the css as an object
// Box acts like a <div></div>, Typography acts like a <p></p> tag

const Image = styled("img")({
  width: 100,
  display: "flex",
  margin: "auto",
  padding: "50px 0 0",
});

const Wrapper = styled(Box)`
  padding: 25px 35px;
  display: flex;
  flex-direction: column;
  & > div,
  & > button,
  & > p {
    margin-top: 20px;
  }
`;

const LoginButton = styled(Button)`
  text-transform: none;
  background-color: #fb641b;
  border-radius: 3px;
  font-size: 15px;
  height: 42px;
`;

const SignupButton = styled(Button)`
  text-transform: none;
  background-color: #fff;
  color: #2874f0;
  border-radius: 3px;
  box-shadow: 0 2px 4px 0 rgb(0 0 0/ 20%);
  font-size: 15px;
  height: 42px;
`;

const Text = styled(Typography)`
  color: #878787;
`;

const Error = styled(Typography)`
  font-size: 10px;
  color: #ff6161;
  line-height: 0;
  margin-top: 10px;
  font-weight: 600;
`;

const signupInitialValues = {
  name: "",
  username: "",
  password: "",
};

const loginInitialValues = {
  username: "",
  password: "",
};

const Login = ({ isUserAuthenticated }) => {
  const imageURL =
    "https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png";

  const [WelcomePage, setWelcomePage] = useState("login");
  const [signup, setSignup] = useState(signupInitialValues);
  const [login, setLogin] = useState(loginInitialValues);
  const [error, setError] = useState("");
  const { setAccount } = useContext(DataContext);
  const navigate = useNavigate();


  const onInputChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };

  const onValueChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const signupUser = async () => {
    // calling the signup API
    let response = await API.userSignup(signup);

    if (response.isSuccess) {
      setError("");
      setSignup(signupInitialValues);
      setWelcomePage("login");
    } else {
      setError("Something went wrong! Please try again later");
    }
  };

  const loginUser = async () => {
    let response = await API.userLogin(login);
    if (response.isSuccess) {
      setError("");

      sessionStorage.setItem(
        "accessToken",
        `Bearer ${response.data.accessToken}`
      );
      sessionStorage.setItem(
        "refreshToken",
        `Bearer ${response.data.refreshToken}`
      );

      setAccount({
        name: response.data.name,
        username: response.data.username,
      });
      //    Here we stored name and username globally inside context to use it inside any component

      isUserAuthenticated(true);
      setLogin(loginInitialValues);
      navigate("/");
    }
    else {
      setError("Something went wrong! Please try again later");
    }
  };

  return (
    <Component>
      <Box>
        <Image src={imageURL} alt="login" />
        {WelcomePage === "login" ? (
          <Wrapper>
            <TextField
              variant="standard"
              label="Enter username"
              name="username"
              value={login.username}
              onChange={(e) => onValueChange(e)}
            />
            <TextField
              variant="standard"
              label="Enter password"
              name="password"
              value={login.password}
              onChange={(e) => onValueChange(e)}
            />

            {error && <Error>{error}</Error>}

            <LoginButton variant="contained" onClick={() => loginUser()}>
              Login
            </LoginButton>
            <Text style={{ textAlign: "center" }}>OR</Text>
            <SignupButton
              onClick={() => {
                setWelcomePage("signup");
              }}
            >
              Create an Account
            </SignupButton>
          </Wrapper>
        ) : (
          <Wrapper>
            <TextField
              variant="standard"
              label="Enter Name"
              name="name"
              onChange={(e) => onInputChange(e)}
            />
            <TextField
              variant="standard"
              label="Enter Username"
              name="username"
              onChange={(e) => onInputChange(e)}
            />
            <TextField
              variant="standard"
              label="Enter Password"
              name="password"
              onChange={(e) => onInputChange(e)}
            />

            {error && <Error>{error}</Error>}
            <SignupButton onClick={() => signupUser()}>Signup</SignupButton>
            <Text style={{ textAlign: "center" }}>OR</Text>
            <LoginButton
              variant="contained"
              onClick={() => {
                setWelcomePage("login");
              }}
            >
              Already have an Account?
            </LoginButton>
          </Wrapper>
        )}
      </Box>
    </Component>
  );
};

export default Login;

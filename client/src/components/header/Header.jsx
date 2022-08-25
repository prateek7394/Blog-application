import styled from "@emotion/styled";
import { AppBar, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";

import '../../styles/styles.css';

// AppBar generated a header(navigation menu)
const Component = styled(AppBar)`
  background: #c5c5c5;
  color: #000;

`;

const Container = styled(Toolbar)`
  justify-content: center;
  padding: 0;
  & > a {
    padding: 18px;
    color: inherit;
    text-decoration: none;
    font-family: "Ubuntu";
    font-weight: 600;
    margin-right: 20px;
  }
`;

const Header = () => {
  return (
    <Component>
      <Container>
        <Link to="/">HOME</Link>
        <Link to="/about">ABOUT </Link>
        <Link to="/contact">CONTACT</Link>
        <Link to="/login">LOGOUT</Link>
      </Container>
    </Component>
  );
};

export default Header;

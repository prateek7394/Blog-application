import { Box, styled, Typography, Link } from "@mui/material";
import { LinkedIn, Email } from "@mui/icons-material";

import "../../styles/styles.css";

const Banner = styled(Box)`
  background-image: url(http://mrtaba.ir/image/bg2.jpg);
  width: 100%;
  height: 50vh;
  background-position: left 0px top -100px;
  background-size: cover;
`;

const Wrapper = styled(Box)`
  padding: 20px;
  & > h3,
  & > h5 {
    margin-top: 50px;
  }
`;

const Text = styled(Typography)`
  color: #878787;
  font-family: "Ubuntu";
`;

const Contact = () => {
  return (
    <Box>
      <Banner />
      <Wrapper>
        <Typography
          variant="h3"
          style={{ fontFamily: "Ubuntu", fontWeight: 600 }}
        >
          Let's get in Touch!
        </Typography>
        <Text variant="h5">
          You can reach out to me on{" "}
          <Link
            href="https://www.linkedin.com/in/pshu1991/"
            color="inherit"
            target="_blank"
          >
            <LinkedIn />
          </Link>{" "}
          or send me an Email{" "}
          <Link
            href="mailto:sprateek9838@gmail.com"
            target="_blank"
            color="inherit"
          >
            <Email />
          </Link>
          .
        </Text>
      </Wrapper>
    </Box>
  );
};

export default Contact;

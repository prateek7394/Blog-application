import { useContext } from "react";
import { Box, styled, Typography } from "@mui/material";
import { DataContext } from "../../../context/DataProvider";
import { Delete } from "@mui/icons-material";
import { API } from "../../../service/api";

import "../../../styles/styles.css";

const Component = styled(Box)`
  margin-top: 30px;
  background-color: #f5f5f5;
  border-radius: 5px;
  padding: 10px;
`;

const Container = styled(Box)`
  display: flex;
`;

const Name = styled(Typography)`
  font-weight: 600;
  font-size: 18px;
  margin-right: 20px;
  font-family: "Ubuntu";
`;

const StyledDate = styled(Typography)`
  color: #878787;
  font-size: 14px;
`;

const Comment = ({ comment, setPostComment }) => {
  const { account } = useContext(DataContext);

  const removeComment = async () => {
    const response = await API.deleteComment(comment._id);

    if (response.isSuccess) {
      setPostComment((prevState) => !prevState);
    }
  };
  return (
    <Component>
      <Container>
        <Name>{comment.name}</Name>
        <StyledDate>{new Date(comment.date).toDateString()}</StyledDate>
        {comment.name === account.username && (
          <Delete
            onClick={() => {
              removeComment();
            }}
            style={{ marginLeft: "auto" , cursor: 'pointer'}}
          />
        )}
      </Container>
      <Box>
        <Typography style={{fontFamily: "Ubuntu"}}>{comment.content}</Typography>
      </Box>
    </Component>
  );
};

export default Comment;

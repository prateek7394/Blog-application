import { useState, useContext, useEffect } from "react";

import { Box, Button, styled, TextareaAutosize } from "@mui/material";

import { DataContext } from "../../../context/DataProvider";
import { API } from "../../../service/api";
import Comment from "./Comment";

import '../../../styles/styles.css';


const Container = styled(Box)`
  margin-top: 100px;
  display: flex;
`;

const Image = styled("img")({
  width: 50,
  height: 50,
  borderRadius: "50%",
});

const StyledTextArea = styled(TextareaAutosize)`
  height: 100px;
  width: 100%;
  margin: 0 20px;
  padding: 5px;
  font-family: 'Ubuntu';
`;

const initialValues = {
  name: "",
  postId: "",
  content: "",
  date: new Date(),
};

const Comments = ({ post }) => {
  const url = "https://static.thenounproject.com/png/12017-200.png";

  const [comment, setComment] = useState(initialValues);
  const [commentsList, setCommentsList] = useState([]);
  const [postComment, setPostComment] = useState(false);
  
  const { account } = useContext(DataContext);

  const getData = async() => {
    const response = await API.getAllComments(post._id);
    if (response.isSuccess) {
      setCommentsList(response.data);
    }
  };
  useEffect(() => {
    getData();
  }, [post, postComment]);

  const handleChange = (e) => {
    setComment({
      ...comment,
      name: account.username,
      postId: post._id,
      content: e.target.value,
    });
  };

  const addComment = async(e) => {
    try{
      let response = await API.addComment(comment);
      if (response.isSuccess) {
        setComment(initialValues);
      }
      console.log(postComment,"here ")
      setPostComment(true);
    }
    catch(error){
      console.log(error);
    }
  };

  return (
    <Box>
      <Container>
        <Image src={url} alt="user" />
        <StyledTextArea
          minRows={5}
          placeholder="Comment your views..."
          value={comment.content}
          onChange={(e) => handleChange(e)}
          
        />
        <Button
          variant="contained"
          size="medium"
          style={{ height: 40 }}
          onClick={(e) => {
            addComment(e);
          }}
        >
          Post
        </Button>
      </Container>
      <Box>
        {commentsList &&
          commentsList.length > 0 &&
          commentsList.map((comment) => (
            <Comment comment={comment} setPostComment = {setPostComment}/>
          ))}
      </Box>
    </Box>
  );
};

export default Comments;

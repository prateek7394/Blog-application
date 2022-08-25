import { Box, styled, Typography } from "@mui/material";

import { addElipsis } from "../../../utils/common-utils";

import '../../../styles/styles.css'

const Container = styled(Box)`
  display: flex;
  align-items: center;
  flex-direction: column;
  border: 1px solid #d3cede;
  border-radius: 10px;
  margin: 20px;
  height: 350px;
  & > p {
    padding: 0 5px 3px 5px;
  }
`;

const Text = styled(Typography)`
  color: #878787;
  font-size: 14px;
  font-family: 'Ubuntu'
  
`;
const Title = styled(Typography)`
  font-size: 18px;
  font-weight: 600;
  font-family: 'Ubuntu'

`;
const Description = styled(Typography)`
  font-size: 14px;
  word-break: break-word;
  font-family: 'Ubuntu'
`;

const Image = styled("img")({
  width: "100%",
  borderRadius: "10px 10px 0 0",
  objectFit: "cover",
  height: '100px'
});

const Post = ({ post }) => {

    const url = post.picture ? post.picture : 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=752&q=80'
  return (
    <Container>
      <Image src={url} alt="Blog" />
      <Text>{post.categories}</Text>
      <Title>{addElipsis(post.title, 20)}</Title>
      <Text>{post.username}</Text>
      <Description>{addElipsis(post.description, 100)}</Description>
    </Container>
  );
};

export default Post;

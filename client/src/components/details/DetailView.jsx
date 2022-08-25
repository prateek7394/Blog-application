import { Box, styled, Typography } from "@mui/material";
import { useEffect, useState, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { API } from "../../service/api";
import { DataContext } from "../../context/DataProvider";
import Comments from "./comments/Comments";

import '../../styles/styles.css';


const Container = styled(Box)(({ theme }) => ({
  margin: '50px 100px',
  [theme.breakpoints.down('md')]: {
      margin: '10px 20px'
  },
}));

const Image = styled("img")({
  width: "100%",
  height: "60vh",
  objectFit: "cover", // to maintain the aspect ratio of the image
});

const Title = styled(Typography)`
  font-size: 40px;
  font-weight: 600;
  text-align: center;
  margin-top: 20px;
  font-family: 'Ubuntu';
`;

const Icons = styled(Box)`
  float: right;
`;

const Edit = styled(EditIcon)`
  margin: 5px;
  padding: 5px;
  border: 1px solid #878787;
  border-radius: 10px;
`;
const Delete = styled(DeleteIcon)`
  margin: 5px;
  padding: 5px;
  border: 1px solid #878787;
  border-radius: 10px;
  cursor: pointer;
`;

const Author = styled(Box)`
  color: #878787;
  font-family: 'Ubuntu';
  display: flex;
  margin-bottom: 20px;
`;

const DetailView = () => {
  const [post, setPost] = useState({});
  const { account } = useContext(DataContext);
  const navigate = useNavigate();
  const { id } = useParams();

  const url = post.picture
    ? post.picture
    : "https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80";

  useEffect(() => {
    // useEffect is used to make api call as soon as the page loads
    const fetchData = async () => {
      let response = await API.getPostById(id);
      if (response.isSuccess) {
        setPost(response.data);
      }
    };
    fetchData();
  }, [id]);

  const deleteBlog = async(e) => {
    let response = await API.deletePost(post._id);
    if(response.isSuccess){
      navigate('/');
    }
  }


  return (
    <Container>
      <Image src={url} alt="blog" />

      {account.username === post.username && (
        <Icons>
          <Link to={`/update/${post._id}`}>
          <Edit color="primary" />
          </Link>
          <Delete onClick={(e) => deleteBlog(e)} color="error" />
        </Icons>
      )}

      <Title>{post.title}</Title>

      <Author>
        <Typography>
          Author: <Box component='span' style={{fontWeight: '600'}}>{post.username}</Box>
        </Typography>
        <Typography marginLeft={'auto'}>{new Date(post.createdDate).toDateString()}</Typography>
      </Author>

      <Typography style={{fontFamily: 'Ubuntu'}}>{post.description}</Typography>
      <Comments post = {post}/>
    </Container>
  );
};

export default DetailView;

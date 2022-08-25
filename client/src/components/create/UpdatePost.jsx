import { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { DataContext } from "../../context/DataProvider";
import { API } from "../../service/api";

import {
  Box,
  styled,
  FormControl,
  InputBase,
  Button,
  TextareaAutosize,
} from "@mui/material";

import AddCircleIcon from "@mui/icons-material/AddCircle";

const Container = styled(Box)`
  margin: 50px 100px;
`;

const Image = styled("img")({
  width: "100%",
  objectFit: "cover",
  height: "50vh",
});

const StyledInputBase = styled(InputBase)`
  flex: 1;
  margin: 0 20px;
  font-size: 22px;
`;

const StyledFormControl = styled(FormControl)`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
`;

const TextArea = styled(TextareaAutosize)`
  width: 100%;
  margin-top: 20px;
  font-size: 18px;
`;

const initialPost = {
  title: "",
  description: "",
  picture: "",
  username: "",
  categories: "",
  createdDate: new Date(),
};

const UpdatePost = () => {
  const [post, setPost] = useState(initialPost);
  const [file, setFile] = useState("");
  const { account } = useContext(DataContext);
  const { id } = useParams();

  const location = useLocation();
  const navigate = useNavigate();

  const url = post.picture ? post.picture : "https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80";


  useEffect(() => {
    const fetchData = async() => {
        const response = await API.getPostById(id);
        if(response.isSuccess) {
            setPost(response.data);
        }
    }
    fetchData();
  }, [])

  
  useEffect(() => {
      //   this useEffect runs upon changing image
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);

        // API Calling to upload image
        const response = await API.uploadFile(data);
        post.picture = response.data;
      }
    };
      getImage();
      post.categories = location.search?.split("=")[1] || "All";
      post.username = account.username;

      // useLocation returns the search parameter in the URL which is an array
      // which we split further about = and category is at index 0 and type is at index 1
      
    }, [file]);

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const updateBlogPost = async() => {
    let response = await API.updatePost(post);
    if(response.isSuccess) {
      navigate(`/details/${id}`);
    }
  }

  return (
    <Container>
      <Image src={url}></Image>
      <StyledFormControl>
        <label htmlFor="fileInput">
          <AddCircleIcon fontSize="large" color="action" />
        </label>
        <input
          type="file"
          id="fileInput"
          style={{ display: "none" }}
          onChange={(e) => setFile(e.target.files[0])}
          // NOTE: e.target.files gives an array of input files
          // NOTE: e.target.value gives only string values
        />

        <StyledInputBase
          placeholder="Title"
          value={post.title}
          onChange={(e) => {
            handleChange(e);
          }}
          name="title"
        />
        <Button variant="contained" onClick={() => updateBlogPost()}>Update</Button>
      </StyledFormControl>

      <TextArea
        minRows={5}
        value={post.description}
        onChange={(e) => {
          handleChange(e);
        }}
        name="description"
        placeholder="Write your blog here..."
      />
    </Container>
  );
};

export default UpdatePost;

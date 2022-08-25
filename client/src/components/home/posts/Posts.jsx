import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import {Link, useSearchParams} from 'react-router-dom';

// components
import { API } from "../../../service/api";
import Post from "./Post";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');

  useEffect(() => {
    const fetchData = async () => {
      let response = await API.getAllPosts({category: category || ""});

      if (response.isSuccess) {
        setPosts(response.data);
      }
    };
    fetchData();
  }, [category]);

  return (
    <>
      {posts && posts.length > 0 ? (
          posts.map((post) =>
          <Grid item lg={3} sm={4} xs={12}>
            <Link to={`details/${post._id}`} style={{textDecoration: 'none', color: "inherit"}}>
            <Post post = {post}/>
            </Link>
          </Grid> )
        
      ) : (
        <Box style={{ color: "red", margin: "30px 50px", fontSize: 18 }}>
          No posts found
        </Box>
      )}
    </>
  );
};

export default Posts;

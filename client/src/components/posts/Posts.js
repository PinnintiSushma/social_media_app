import { makeRequest } from "../../axios";
import Post from "../post/Post";
import "./posts.scss";
import { useQuery } from '@tanstack/react-query'


const Posts = ({userId}) => {

  const { isLoading, error, data } = useQuery({
    queryKey: ['posts'],
    queryFn: () =>
      makeRequest.get("/posts?userId="+userId).then(res => {
        return res.data;
      }),refetchInterval: 1000,
  });



  
  return <div className="posts">
     {
      error
      ? "Something went wrong!"
      : isLoading
        ? "loading"
        : data && data.map(post => (
          <Post post={post} key={post.id} />
        ))

    }
  </div>;
};

export default Posts;
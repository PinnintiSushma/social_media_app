import { useContext, useState } from "react";
import "./comments.scss";
import { AuthContext } from "../../context/authContext";
import { makeRequest } from "../../axios";
import moment from "moment";
import {
  useQuery,
  useMutation,
  QueryClient,
} from '@tanstack/react-query'



const Comments = ({ postId }) => {
  const [desc, setDesc] = useState("")
  const { currentUser } = useContext(AuthContext);


  const { isLoading, error, data } = useQuery({
    queryKey: ['comments',postId],
    queryFn: () =>
      makeRequest.get("/comments?postId=" + postId).then(res => {
        return res.data;
      }), refetchInterval: 1000,
  });

  const queryClient = new QueryClient()


  const mutation = useMutation({
    mutationFn: (newComment) => {
      return makeRequest.post("/comments", newComment)
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['comments'] })
      
    },
  })

  const handleClick = async (e) => {
    e.preventDefault();
    mutation.mutate({ desc, postId })
    setDesc("")

  }




  return (
    <div className="comments">
      <div className="write">
        <img src={currentUser.profilePic} alt="" />
        <input type="text" placeholder="write a comment" value={desc} onChange={e => setDesc(e.target.value)} />
        <button onClick={handleClick}>Send</button>
      </div>
      {isLoading
        ? "loading"
        : data && data.map((comment) => (
          <div className="comment">
            <img src={comment.profilePic} alt="" />
            <div className="info">
              <span>{comment.name}</span>
              <p>{comment.desc}</p>
            </div>
            <span className="date">{moment(comment.createdAt).fromNow()}</span>
          </div>
        ))}
    </div>
  );
};

export default Comments;
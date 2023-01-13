import { getDocs, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../config/firebase";
import { PostDetails } from "./Post";

//defining the recieved data type
export interface Post {
  title: string;
  description: string;
  id: string;
  username: string;
}
export const Main = () => {
  //define which collection you are reffering in the database
  const [postsList, setPostList] = useState<Post[] | null>(null);
  const postsRefs = collection(db, "posts");

  const getPosts = async () => {
    const data = await getDocs(postsRefs);
    setPostList(
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Post[]
    );
    

  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      <h1>Home Page</h1>
      <div className="flexContainer">
        {postsList?.map((post) => {
          return <PostDetails title = {post.title} description={post.description} username = {post.username} id = {post.id}/>;
        })}
      </div>
    </div>
  );
};

import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../config/firebase";
import { Post } from "./home";

interface likes {
  postid: string;
  userId: string;
}
export const PostDetails = (Props: Post) => {
  const [user] = useAuthState(auth);
  const likesref = collection(db, "likes");
  const [likes, setLikes] = useState<likes[] | null>(null);

  const addLike = async () => {
    try {
      const newDoc = await addDoc(likesref, {
        id: user?.uid,
        postId: Props.id,
      });

      if (user) {
        setLikes((prev) => {
          return prev
            ? [...prev, { userId: user.uid, postid: newDoc.id }]
            : [{ userId: user.uid, postid: newDoc.id }];
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const likesDoc = query(likesref, where("postId", "==", Props.id));

  const getLikes = async () => {
    const LikesDocs = await getDocs(likesDoc);

    setLikes(
      LikesDocs.docs.map((doc) => ({ userId: doc.data().id, postid: doc.id }))
    );
  };

  useEffect(() => {
    getLikes();
  }, []);

  const hasLiked = likes?.find((like) => {
    return like.userId === user?.uid;
  });

  const unLike = async () => {
    try {
      const likeToDeleteQuery = query(
        likesref,
        where("postId", "==", Props.id),
        where("id", "==", user?.uid)
      );

      const deletePostData = await getDocs(likeToDeleteQuery);

      const likeToDelete = doc(db, "likes", deletePostData.docs[0].id);

      const likeId = deletePostData.docs[0].id;

      await deleteDoc(likeToDelete);

      if (user) {
        setLikes(
          (prev) => prev && prev.filter((like) => likeId !== like.postid)
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="postContainer">
        <div>
          <h1>{Props.title}</h1>
          <p>{Props.description}</p>
          <br />
          <i>@{Props.username}</i>
          <br />
        </div>
        <br />
        <div>Likes: {likes?.length}</div>
        <br />
        <button className="likeButton" onClick={hasLiked ? unLike : addLike}>
          {hasLiked ? <>&#128078;</> : <> &#128077;</>}
        </button>
      </div>
      <br />
    </>
  );
};

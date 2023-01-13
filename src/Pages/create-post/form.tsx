import { Textarea } from "@mantine/core";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {addDoc, collection} from 'firebase/firestore';
import {auth, db} from '../../config/firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

interface createFormData {
  title: string;
  description: string;
}

export const CreateForm = () => {
  const schema = yup.object().shape({
    title: yup.string().required("You must enter the Title"),
    description: yup.string().required("You must enter the Description"),
  });

  //use to identify the current user of the system
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<createFormData>({
    resolver: yupResolver(schema),
  });

  //mention what db collection you are going to store file
  const postsRefs = collection(db,"posts");

  const onSubmitForm = async(data: createFormData) => {
    await addDoc(postsRefs,{
        ...data,
        username:  user?.displayName,
        id: user?.uid
    });
    navigate("/");
  };
  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <input placeholder="title" {...register("title")} />
      <br />
      <p style={{ color: "red" }}>{errors.title?.message}</p>
      <Textarea placeholder="description" {...register("description")} />
      <br />
      <p style={{ color: "red" }}>{errors.description?.message}</p>
      <input type="submit" />
    </form>
  );
};

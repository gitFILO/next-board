"use server";
import { revalidatePath } from "next/cache";
import { connectToDb } from "./utils";
import {User, Post,Comment} from "./models"
import {signIn, signOut} from './auth'
import bcrypt from 'bcryptjs';

import { headers } from "next/headers";
import { redirect } from "next/navigation";


export const addPost = async (prevState,formData) => {

    const { title, desc,createAt,img, slug, userId} = Object.fromEntries(formData);

    try{
        connectToDb();
        const newPost = new Post({
            title,
            desc,
            createAt,
            img,
            slug,
            userId,
        });

        await newPost.save();
        console.log("saved to db");
        revalidatePath("/blog");
        revalidatePath("/admin");
    }catch(err){
        console.log(err);
        return {error: "addPost failed!"};
    }
}


export const addComment = async (prevState,formData) => {

    const { desc,postSlug,createAt, userId} = Object.fromEntries(formData);

    const user = await User.findOne({ _id:userId });
    console.log("addcomment.." , user);

    console.log(userId);
    try{
        connectToDb();
        const newComment = new Comment({
            desc,
            postSlug,
            createAt,
            username:user.username,
        });

        await newComment.save();
        console.log("saved to db");
        revalidatePath("/blog");
    }catch(err){
        console.log(err);
        return {error: "addPost failed!"};
    }
}

export const deletePost = async (formData) => {

    const {id} = Object.fromEntries(formData);

    try{
        connectToDb();

        await Post.findByIdAndDelete(id);
        console.log("delete to db");
        revalidatePath("/blog");
    }catch(err){
        console.log(err);
        return {error: "addPost failed!"};
    }
}

export const handleGithubLogin = async () => {
    "use server"
    await signIn("github");
};

export const login = async (prevState, formData) => {
    const { username, password } = Object.fromEntries(formData);
    

    try {
      await signIn("credentials", { username, password });
    } catch (err) {
      console.log(err);
  
      if (err.message.includes("CredentialsSignin")) {
        return { error: "Invalid username or password" };
      }
      throw err;
    }
  };

export const hanleLogout = async () => {
    "use server"
    await signOut("github");
}

export const register = async (previousState, formData) => {
    const { username, email, password, img, passwordRepeat } =
      Object.fromEntries(formData);
  
    if (password !== passwordRepeat) {
      return { error: "Passwords do not match" };
    }
  
    try {
      
        console.log("find user 전..");
        connectToDb();
  
        console.log("find user 후..");
      const userValidateName = await User.findOne({ username });
      
      if (userValidateName) {
        return { error: "Username already exists" };
      }
      const userValidateEmail = await User.findOne({email})
      if(userValidateEmail){
        return {error: "Email already exists"};
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        img,
        isAdmin: false,
      });
  
      await newUser.save();
      console.log("saved to db");
  
      return { success: true };
    } catch (err) {
      console.log(err);
      return { error: "Something went wrong!" };
    }
  };

  export const addUser = async (prevState,formData) => {
    const { username, email, password, img } = Object.fromEntries(formData);
  
    try {
      connectToDb();
      const newUser = new User({
        username,
        email,
        password,
        img,
      });
  
      await newUser.save();
      console.log("saved to db");
    } catch (err) {
      console.log(err);
      return { error: "Something went wrong!" };
    }
  };
  
  export const deleteUser = async (formData) => {
    const { id } = Object.fromEntries(formData);
  
    try {
      connectToDb();
  
      await Post.deleteMany({ userId: id });
      await User.findByIdAndDelete(id);
      console.log("deleted from db");
      revalidatePath("/admin");
    } catch (err) {
      console.log(err);
      return { error: "Something went wrong!" };
    }
  };

  export const deleteComment = async (postSlug,formData) => {
    const { id } = Object.fromEntries(formData);
    console.log("bind value:", postSlug)
    try {
        connectToDb();
    
        await Comment.deleteOne({ _id: id });
        console.log("deleted from db");
        
        // const _headers = headers();
        // const currentUrl = _headers.get("x-url");
        // console.log("url>>", currentUrl);
        // revalidatePath(currentUrl);
        revalidatePath(`/blog/${postSlug}`)
      } catch (err) {
        console.log(err);
        return { error: "Something went wrong!" };
      }
  }
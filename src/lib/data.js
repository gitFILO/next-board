import {Post, User, Comment} from "./models"
import { connectToDb } from "./utils";
import {unstable_noStore as noStore} from 'next/cache' 


export const getPosts = async () => {
    try{
        connectToDb();
        console.log("connected!");
        const posts = await Post.find()
        return posts;
    }catch(err){
        console.log(err);
        throw new Error("Failed to fetch posts!");
    } 
}

export const getPost = async (slug) => {
    try{
        connectToDb();
        const post = await Post.findOne({slug: slug});
        return post;
    }catch(err){
        console.log(err);
        throw new Error("Failed to fetch one post!");
    } 
}

export const getUser = async (id) => {
    noStore();
    try{
        connectToDb();
        const user = await User.findById({_id : id});
        return user;
    }catch(err){
        console.log(err);
        throw new Error("Failed to fetch one user!");
    } 
}

export const getUsers = async () => {
    try{
        connectToDb();
        const users = await User.find();
        
        return users;
    }catch(err){
        console.log(err);
        throw new Error("Failed to fetch all users!");
    } 
}

export const getComments = async (postSlug) => {
    try{
        connectToDb();
        console.log("getcomments!");
        console.log(postSlug);
        const comments = await Comment.find({postSlug:postSlug});
        return comments;
    } catch(err){
        console.log(err);
        throw new Error("Failed to fetch comments!");
    }
}


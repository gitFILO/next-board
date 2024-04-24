import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        min:3,
        max:20
    },
    email:{
        type:String,
        required:true,
        unique:true,
        max:50
    },
    password:{
        type:String,
    },
    img:{
        type:String,
    },
    isAdmin: {
      type:Boolean,
      default: false,  
    }

},
{timestamps:true}
);

const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    desc:{
        type:String,
        required:true,
    },
    img:{
        type:String,
    },
    userId: {
      type:String,
      required: true,  
    },
    slug: {
        type:String,
        required:true,
        unique: true,
    },
    createAt:{
        type:Date,
        required:true, 
    },
    updateAt:{
        type:Date,
    }
},
{timestamps:true}
);


const commentSchema = new mongoose.Schema({
    desc:{
        type:String,
        required:true,
    },
    img:{
        type:String,
    },
    username: {
      type:String,
      required: true,  
    },
    post: {
        type:String,
        required: true,
    },
    anonymous:{
        type:Boolean,
    }
},
{timestamps:true}
);


export const User = mongoose.models?.User || mongoose.model("User",userSchema);
export const Post = mongoose.models?.Post || mongoose.model("Post",postSchema);
export const Comment = mongoose.models?.Comment || mongoose.model("Comment",commentSchema);
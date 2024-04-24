"use client"
import styles from './commentPostForm.module.css'
import {addComment} from "@/lib/actions"
import {useFormState} from "react-dom"
import PostUser from "@/components/postUser/postUser"

const commentPostForm = ({ userId, postSlug }) => {
  const [state, formActionC] = useFormState(addComment, undefined);
  const currentTime = new Date();
  console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
  console.log(userId, postSlug);
  
  
  return (
    <form action={formActionC} >
       { <h1>Add New Post</h1>}
      {/* <PostUser userId={userId}/> */}

      <input type="text" name="desc" placeholder='comment...'/>
      <input type="hidden" name="postSlug" value={postSlug} />
      <input type="hidden" name="createAt" value={currentTime} />
      <input type="hidden" name="userId" value={userId} />
      <button style={{ fontSize: '10px', padding: '10px 10px' }}>Add</button>
       {state && state?.error}
    </form>
  );
};

export default commentPostForm;
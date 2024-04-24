"use client"
import styles from './adminPostForm.module.css'
import {addPost} from "@/lib/actions"
import {useFormState} from "react-dom"
import { useState } from 'react';

const AdminPostForm = ({ userId }) => {
  const [state, formAction] = useFormState(addPost, undefined);
  const [imgPreview, setImgPreview] = useState(''); // 상태 추가: 미리보기 이미지 URL

  const currentTime = new Date();

  // 이미지 입력 값이 변경될 때 호출되는 함수
  const handleImgChange = (event) => {
    const imgUrl = event.target.value;
    setImgPreview(imgUrl); // 미리보기 이미지 URL 업데이트
  };

  return (
    <form action={formAction} className={styles.container}>
      <h1>Add New Post</h1>

      <input type="text" name="title" placeholder="Title" />
      <input type="text" name="slug" placeholder="slug" />
      <input type="hidden" name="userId" value={userId} />
      <input type="hidden" name="createAt" value={currentTime} />

      <input type="text" name="img" placeholder="img" onChange={handleImgChange} />
      {imgPreview && <img src={imgPreview} alt="Image Preview" style={{ maxWidth: '100%', maxHeight: '200px' }} />}
      <textarea type="text" name="desc" placeholder="desc" rows={10} />
      <button>Add</button>
      {state && state?.error}
    </form>
  );
};

export default AdminPostForm;
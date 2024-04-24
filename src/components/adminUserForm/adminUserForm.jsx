"use client"
import styles from './adminUserForm.module.css'
import {addUser} from "@/lib/actions"
import {useFormState} from "react-dom"

import { useState } from 'react';

const AdminUserForm = () => {
    const [state, formAction] = useFormState(addUser,undefined)
    const currentTime = new Date();

    const [imgPreview, setImgPreview] = useState(''); // 상태 추가: 미리보기 이미지 URL

    const handleImgChange = (event) => {
        const imgUrl = event.target.value;
        setImgPreview(imgUrl); // 미리보기 이미지 URL 업데이트
      };

    return (
        <form action={formAction} className={styles.container}>
            <h1>Add New User</h1>
            <input type="text" name="username" placeholder="username"/>
            <input type="text" name="email" placeholder="email"/>
            <input type="password" name="password" placeholder="password"/>
            <input type="hidden" name="createAt" value={currentTime}/>
            <input type="text" name="img" placeholder="img" onChange={handleImgChange} />
            {imgPreview && <img src={imgPreview} alt="Image Preview" style={{ maxWidth: '100%', maxHeight: '200px' }} />}
            <select name="isAdmin">
                <option value="false">Is Admin?</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
            </select>
            <button>Add</button>
            {state && state?.error}
        </form>

    )
}

export default AdminUserForm
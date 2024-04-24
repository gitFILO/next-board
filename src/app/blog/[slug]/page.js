import styles from './singlePost.module.css'
import Image from 'next/image'
import PostUser from '@/components/postUser/postUser.jsx'
import {Suspense} from 'react';
import {getPost} from '@/lib/data'
import Comments from "@/components/comments/comments"
import CommentPostForm from "@/components/commentPostForm/commentPostForm"
import { auth }  from "@/lib/auth"

const getData = async (slug) => {
    const res= await fetch(`http://localhost:3000/api/blog/${slug}`)

    if(!res.ok) throw new Error("wrong")

    return res.json()
}

export const generateMetadata = async ({params}) =>{
    const {slug} = params;
    const post = await getPost(slug);
    return {
        title: post?.title,
        description: post?.desc,
    }
}

const SinglePostPage = async ({params}) => {
    const {slug} = params;
    const post = await getData(slug)
    // const post = await getPost(slug);
    
    // const session = await aut
    const session = await auth();
    console.log("session: " , session);
    
    return (
        <div className={styles.container}>
          {post.img ? (
            <div className={styles.imgContainer}>
              <Image src={post.img} alt="/nophoto.jpeg" fill className={styles.img} />
            </div>
          ) : (
            <div className={styles.imgContainer}>
              <Image src="/nophoto.jpeg" alt="No Photo" fill className={styles.img} />
            </div>
          )}
          <div className={styles.textContainer}>
            <h1 className={styles.title}>{post?.title}</h1>
            <div className={styles.detail}>
              {post && (
                <Suspense fallback={<div>Loading..</div>}>
                  <PostUser userId={post.userId} />
                </Suspense>
              )}
              <div className={styles.detailText}>
                <span className={styles.detailTitle}>Published</span>
                <span className={styles.detailValue}>{post.createAt.toString().slice(0, 10)}</span>
              </div>
            </div>
            <div className={styles.content}>{post.desc}</div>
          </div>
          <Comments postSlug={post.slug}/>
          <CommentPostForm userId={session.user.id} postSlug={post.slug}/>
        </div>
      );
}


export default SinglePostPage
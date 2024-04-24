import styles from './postCard.module.css'
import Image from "next/image"
import Link from "next/link"

const PostCard = ({post}) => {
    const originalDate = post.createAt.toString().slice(0, 10);
    const formattedDate = originalDate.split('-').join('.');
    console.log("POSTcard: ", post)
    return (
  <div className={styles.container}>
    <div className={styles.top}>
      {post.img ? (
        <div className={styles.imgContainer}>
          <Image src={post.img} alt="" fill className={styles.img} />
        </div>
      ) : (
        <div className={styles.imgContainer}>
          <Image src="/nophoto.jpeg" alt="No Image" fill className={styles.img} />
        </div>
      )}
      <span className={styles.date}>{formattedDate}</span>
    </div>
    <div className={styles.bottom}>
      <h1 className={styles.title}>{post.title}</h1>
      <p className={styles.desc}>{post.body}</p>
      <Link href={`/blog/${post.slug}`}>READ MORE</Link>
    </div>
  </div>
);
}

export default PostCard
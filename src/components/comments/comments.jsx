import styles from './comments.module.css'
import { getComments} from "@/lib/data"
import Image from "next/image"
import {deleteComment} from "@/lib/actions"

const Comments = async({postSlug}) => {
    const comments = await getComments(postSlug)
    return (
        <div className={styles.container}>
            <h1>Comments</h1>
            {comments.map(comment=>(
                <div className={styles.post} key={comment.id}>
                    <div className={styles.detail}>
                        
                        <Image src={comment.img || "/noavatar.png"} alt="" width={50} height={50} />
                        
                        <span>{comment.username}</span>
                        <br></br>
                        <span className={styles.postTitle}>{comment.desc}</span>
                        </div>
                        <form action={deleteComment.bind(null, postSlug)}>
                            <input type="hidden" name="id" value={comment.id}/>
                            <button className={styles.postButton}>
                                Delete
                            </button>
                        </form>
                    </div>
            ))}
        </div>
    )
}

export default Comments
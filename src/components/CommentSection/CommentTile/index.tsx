import { Comment } from "@/utils/interfaces";
import styles from "../styles.module.scss"

export default function CommentTile({comment}: {comment: Comment}) {

    return (
        <>
            {
            comment.comment && 
            <div className={styles.comment_wrapper} key={comment.id}>
                <div>
                    <h2>{comment.username}</h2>
                    <span>
                        { new Date(comment.date).toLocaleDateString('en-UK', { day: 'numeric', month: 'numeric', year: 'numeric' }) }
                    </span>
                </div>
                
                <p>{comment.comment}</p>
            </div>
            }
        </>
    )
}
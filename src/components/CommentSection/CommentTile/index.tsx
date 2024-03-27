import { Comment } from "@/utils/interfaces";
import styles from "../styles.module.scss"
import useAuthStore from "@/utils/authStore";
import CommentEditToggle from "./toggle";


export default function CommentTile({comment}: {comment: Comment}) {


    

    const { user } = useAuthStore()

    

    return (
        <>
            {
            comment.comment && 
            <div className={styles.comment_container}>
                <div className={styles.comment_wrapper} key={comment.id}>
                    <div className={styles.mediary}>
                        <div>
                            <h2>{comment.username}</h2>
                            <span>
                                { new Date(comment.date).toLocaleDateString('en-UK', { day: 'numeric', month: 'numeric', year: 'numeric' }) }
                            </span>
                        </div>
                        
                        <p>{comment.comment}</p>
                    </div>
                    {
                        user === comment.user_id && 
                        <CommentEditToggle comment={comment} />
                    }
                </div>
                
                

            </div>
            }
        </>
    )
}
import { Comment } from "@/utils/interfaces";
import styles from "../styles.module.scss"
import { useState } from "react";
import axios from "axios";
import useAuthStore from "@/utils/authStore";

type DeleteButtonToggle = "none" | "block"

export default function CommentTile({comment}: {comment: Comment}) {

    const [deleteButtonToggle, setDeleteButtonToggle] = useState<DeleteButtonToggle>("none")

    const { user } = useAuthStore()

    async function handleDelete(){

        const resp = await axios.delete(`https://inspiremyserver.onrender.com/comments/users/${user}/${comment.id}`)

        // FORCE RERENDER TO UPDATE COMMENT SECTION WITHOUT RELOADING PAGE xx

        setDeleteButtonToggle("none")
    }

    return (
        <>
            {
            comment.comment && 
            <div className={styles.comment_container}>
                <div className={styles.comment_wrapper} key={comment.id}>
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
                    <div className={styles.comment_edit_toggle}>
                        <span onClick={() => setDeleteButtonToggle("block")}>⋮</span>
                        {deleteButtonToggle == "block" &&
                            <button id={styles.button_delete_comment} onClick={handleDelete}>
                                DELETE
                            </button>
                        }
                    </div>

                }

            </div>
            }
        </>
    )
}
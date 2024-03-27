import { Comment } from "@/utils/interfaces";
import styles from "../../styles.module.scss";
import axios from "axios";
import { useState } from "react";
import useAuthStore from "@/utils/authStore";

type ButtonToggle = "none" | "block"

export default function CommentEditToggle({comment}: {comment: Comment}) {

    const [editToggle, setEditToggle] = useState<ButtonToggle>("block")
    const [deleteButtonToggle, setDeleteButtonToggle] = useState<ButtonToggle>("none")

    const { user } = useAuthStore()

    async function handleDelete(){

        const resp = await axios.delete(`https://inspiremyserver.onrender.com/comments/users/${user}/${comment.id}`)

        // FORCE RERENDER TO UPDATE COMMENT SECTION WITHOUT RELOADING PAGE xx

        setDeleteButtonToggle("none")
        setEditToggle("block")
    }

    return (
        <div className={styles.comment_edit_toggle}>
            { editToggle == "block" && 
                <span className={styles.button_edit_selector} onClick={() => {
                    setDeleteButtonToggle("block")
                    setEditToggle("none")
                    }}>⋮
                </span>
            }
            {deleteButtonToggle == "block" &&
            <>
                <button className={styles.button_cancel} onClick={() => {setDeleteButtonToggle("none");setEditToggle("block")}}>
                    X
                </button>
                <button className={styles.button_delete_comment} onClick={handleDelete}>
                    DELETE
                </button>
                
            </>
            }
        </div>
    )
}
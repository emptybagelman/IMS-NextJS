import styles from "./styles.module.scss"
import AddCommentForm from "./AddCommentForm"
import CommentList from "./CommentList"
import useAuthStore from "@/utils/authStore"

export default function CommentSection({toggle, setToggle}: {toggle: boolean, setToggle: React.Dispatch<React.SetStateAction<boolean>>}) {

    const { user } = useAuthStore()

    function closeComments(){
        setToggle(false)
    }

    return (
        <div className={styles.comments_wrapper} style={!toggle ? {"display":"none"} : {}}>
            <h2>Comments</h2>
            <button onClick={closeComments} className={styles.close}><svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox="0 0 24 24"><title>close_line</title><g id="close_line" fill='none' fill-rule='evenodd'><path d='M24 0v24H0V0h24ZM12.593 23.258l-.011.002-.071.035-.02.004-.014-.004-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01-.017.428.005.02.01.013.104.074.015.004.012-.004.104-.074.012-.016.004-.017-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113-.013.002-.185.093-.01.01-.003.011.018.43.005.012.008.007.201.093c.012.004.023 0 .029-.008l.004-.014-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014-.034.614c0 .012.007.02.017.024l.015-.002.201-.093.01-.008.004-.011.017-.43-.003-.012-.01-.01-.184-.092Z'/><path fill='#FFFFFFFF' d='m12 13.414 5.657 5.657a1 1 0 0 0 1.414-1.414L13.414 12l5.657-5.657a1 1 0 0 0-1.414-1.414L12 10.586 6.343 4.929A1 1 0 0 0 4.93 6.343L10.586 12l-5.657 5.657a1 1 0 1 0 1.414 1.414L12 13.414Z'/></g></svg></button>
            {user && <AddCommentForm />}
            <CommentList />  
        </div>
    )
}
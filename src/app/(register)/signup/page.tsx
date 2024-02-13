import styles from "../styles.module.scss"
import SignupForm from "@/components/Register/SignupForm"

export default function Signup(){

    return (
        <div className={styles.register_wrapper}>
            <div className={styles.login_container}>
                <h1>Sign Up</h1>

                <SignupForm />

            </div>
        </div>
    )
}
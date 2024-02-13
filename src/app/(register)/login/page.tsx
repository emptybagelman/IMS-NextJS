import styles from "../styles.module.scss"
import LoginForm from "@/components/Register/LoginForm"

export default function Login(){

    return (
        <div className={styles.register_wrapper}>
            <div className={styles.login_container}>
                <h1>LOGIN</h1>

                <LoginForm />
            </div>
        </div>
    )
}
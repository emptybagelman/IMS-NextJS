import Link from "next/link"
import styles from "./styles.module.scss"

export default function Room({ room }: any){
    const { id, name, description } = room || {}

    return (
        <div className={styles.card}>
            <Link href={`/rooms/${id}`}>
                <div>
                    <p>{name}</p>
                    <p>{description}</p>
                </div>
            </Link>
        </div>

    )
}
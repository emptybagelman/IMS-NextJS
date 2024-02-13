import Link from "next/link"
import styles from "./styles.module.scss"
import LazyImage from "@/components/LazyLoadImage"

export default function Category({ item }: any){

    const { title, image } = item || {}

    

    return (
        <Link href={`/explore/${title.toLowerCase()}`}>
            <div className={styles.explore_item}>
                <LazyImage src={image} alt={"beans"}/>
                <h2 className={styles.title}>{title}</h2>
            </div>
        </Link>
    )
}
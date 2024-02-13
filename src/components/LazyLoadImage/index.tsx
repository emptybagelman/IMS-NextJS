"use client"

import Image from "next/image"
import { useState } from "react"
import styles from "./styles.module.scss"

interface ImageProp {
    src: string,
    alt: string
}

export default function LazyImage({src}: ImageProp){

    const [isLoaded, setIsLoaded] = useState<boolean>(false)

    function handleLoaded(){
        setIsLoaded(true)
    }

    return (
        <div className={styles.lazy_image_wrapper}>
            <Image
            className={isLoaded ? styles.fadeAnim : ""}
            onLoad={handleLoaded}
            src={src}
            alt="loading"
            blurDataURL={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNUFZH6DwACDQFUjqtx8gAAAABJRU5ErkJggg=="}
            width={500}
            height={500}
            placeholder="blur"
            loading="lazy"
            />
            {/* <img src={src} alt={alt} onLoad={handleLoaded}  />
    
            <img className={!isLoaded ? styles.lazy_image : styles.lazy_image_fade} src={typeof src === "string" ? placeholderGen(src) : ""} alt="" /> */}
        </div>
    )
}
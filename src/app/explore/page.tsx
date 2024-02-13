import { useMemo } from "react"
import styles from "./style.module.scss"
import Category from "@/components/Category"

export default function Explore(){

    const items = useMemo(() => ([
        { image: 'https://res.cloudinary.com/de2nposrf/image/upload/v1697033543/static/bedroom.png', title: 'Bedroom'},
        { image: 'https://res.cloudinary.com/de2nposrf/image/upload/v1697033545/static/studio.png', title: 'Studio'},  
        { image: 'https://res.cloudinary.com/de2nposrf/image/upload/v1697033543/static/kitchen.png', title: 'Kitchen'},
        { image: 'https://res.cloudinary.com/de2nposrf/image/upload/v1697033544/static/garden.png', title: 'Garden'}, 
        { image: 'https://res.cloudinary.com/de2nposrf/image/upload/v1697033542/static/bathroom.png', title: 'Bathroom'}, 
        { image: 'https://res.cloudinary.com/de2nposrf/image/upload/v1697033544/static/livingroom.png', title: 'Living'}, 
      ]),[])

    return (
        <div className={styles.explore_wrapper}>
            
            {
                items.map((item, index) => (
                    <Category key={index} item={item} />
                ))
            }

        </div>
    )
}
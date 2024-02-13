import { useProfileToggle } from "@/utils/ProfileToggleProvider";
import styles from "./style.module.scss"

export default function ExpandCollapseWidget({tab}: {tab: React.ReactNode}){

    const { expandContainer, setExpandContainer }: any = useProfileToggle()

    function handleToggle(){
        switch(tab){
            case "comments": 
            expandContainer === tab ? setExpandContainer("rooms") : setExpandContainer("comments"); break
            case "rooms": expandContainer === tab ? setExpandContainer("comments") : setExpandContainer("rooms"); break
            default: setExpandContainer("rooms"); break
        }
    }

    return <span className={styles.expandcollapse_wrapper} onClick={handleToggle}>{expandContainer == tab ? "-" : "+"}</span>
}
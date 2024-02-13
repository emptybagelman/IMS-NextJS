
import styles from "./styles.module.scss"
import Top from "../../components/Profile/Top"
import SideBar from "@/components/Profile/SideBar"
import ProfileMain from "@/components/Profile/Main"
import { ProfileToggleProvider } from "@/utils/ProfileToggleProvider"

export default function Profile(){

    return (
        <div className={styles.profile_wrapper}>
            <ProfileToggleProvider>
                <Top />
                <ProfileMain />
                <SideBar />
            </ProfileToggleProvider>
        </div>
    )
}
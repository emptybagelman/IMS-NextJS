"use client"

import useUserRooms from "@/utils/userRooms";
import styles from "../styles.module.scss";
import useAuthStore from "@/utils/authStore";
import { useEffect } from "react";
import RoomCard from "../RoomCard";
import { useProfileToggle } from "@/utils/ProfileToggleProvider"
import ExpandCollapseWidget from "@/components/ExpandCollapseWidget"

export default function ProfileMain() {
  const { data: userRooms, loading, error, fetchRooms } = useUserRooms();
  const { user } = useAuthStore();
  const { expandContainer }: any = useProfileToggle()


  useEffect(() => {
    fetchRooms({ user_id: String(user) });
  }, [user]);

  if (error) {
    return <div className={styles.profile_main}>Error: {error.message}</div>;
  }

  if (loading) {
    return <div className={styles.profile_main}>Loading...</div>;
  }

  return (
    <section className={styles.main_grid} style={expandContainer === "rooms" ? {"gridColumn": "span 4"} : {"gridColumn": "span 2"}}>
      <ExpandCollapseWidget tab="rooms"/>
      <h3>Your Rooms</h3>
      <div className={styles.room_wrapper}>
        {userRooms && userRooms.map((room) => (
            <RoomCard key={room.id} room={room} />
        ))}
      </div>
    </section>
  );
}

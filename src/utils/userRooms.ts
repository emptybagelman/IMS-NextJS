"use client"
import { useState, useCallback } from 'react';
import { AxiosError } from 'axios';
import { Room } from './interfaces';


interface HookResult {
  data?: Room[];
  loading: boolean;
  error?: AxiosError;
  fetchRooms: (options?: { user_id?: string }) => Promise<void>;
}

const useUserRooms: () => HookResult = () => {
  const [data, setData] = useState<Room[] | undefined>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<AxiosError | any>();

  const fetchRooms = useCallback(async ({ user_id = '' }: { user_id?: string } = {}) => {
    setLoading(true);
    try {
      const res = await fetch(`https://inspiremyserver.onrender.com/rooms/users/${user_id}`);
      const data = await res.json();

      data.data.forEach((room: Room) => {
        room.src = `https://res.cloudinary.com/de2nposrf/image/upload/${room.category}/${room.user_id}/${room.name}/nz.png`;
        room.alt = `IMAGE ID: ${room.id}`;
      });

      setData(data.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    data,
    loading,
    error,
    fetchRooms,
  };
};

export default useUserRooms;

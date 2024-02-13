import axiosInstance from "@/_helpers";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
    isAuthenticated: boolean;
    user: null | number;
    login: (form: { username: string, password: string }) => Promise<void>;
    register: (userInfo: { username: string, email: string, password: string,  }) => Promise<number | undefined>;
    logout: () => void;
  }

  const useAuthStore = create<AuthState>()(
    persist(
      (set) => ({
        isAuthenticated: false,
        user: null,
        login: async (form) => {
          // Login user code
          try {            
            const resp = await axiosInstance.post("/auth/login",form)

            if(resp.status !== 404){

              try {
                const resp2 = await axiosInstance.get(`/users/name/${form.username}`);
                const data = await resp2.data.data;
                set({
                  isAuthenticated:true,
                  user:data.id
                })

              } catch (error) {
                console.log( "could not get user,", error);
              }
            }

          } catch (error) {
              console.error("Error logging in: ",error)
          }

        },
        register: async (userInfo) => {
          // Registering user code

          try {
            
            const resp = await axiosInstance.post("/auth/register", userInfo)
            return resp.status

          } catch (error) {
            console.error("Error signing up", error)
          }

        },
        logout: () => {
          // Logout user code
          try {
              set({
                isAuthenticated:false,
                user: null
              })
          } catch (error) {
            console.error("Error during logout", error)
          }
        },
      }),
      {
        name: "auth",
      }
    )
  );

  export default useAuthStore;
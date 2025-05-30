import { create } from "zustand";
import toast from "react-hot-toast";


export const useThemeStore= create((set)=>({
    currTheme: "",

    changeTheme: (t)=>{
        try {
            set({currTheme: t})
            toast.success("Theme changed successfully")
        } catch (error) {
            console.log("Error in changing themes: "+ error)
        }
    }
}))
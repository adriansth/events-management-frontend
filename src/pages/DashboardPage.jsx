// firebase
import { app } from "../../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
// react
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// icons
import { Plus } from "lucide-react";
import { getUserByUid } from "../utils/requests/user";

const auth = getAuth(app);

export default function DashboardPage() {
   const navigate = useNavigate();

   const [userData, setUserData] = useState(null);

   const unsubscribe = () => {
      onAuthStateChanged(auth, async (user) => {
         if (user) {
            const token = await user.getIdToken();
            if (token) {
               const data = await getUserByUid(token, user.uid);
               setUserData(data);
               console.log(data);
            }
         } else {
            navigate("/");
         }
      });
   };

   useEffect(() => {
      unsubscribe();
   }, []);

   return (
      <div className="w-screen min-h-screen overflow-hidden flex flex-col items-center bg-zinc-900 py-20">
         <div className="w-[600px] flex flex-col gap-y-10">
            <div className="w-full flex items-center justify-between">
               <span className="text-white font-medium text-xl">
                  Your Events
               </span>
               <button className="rounded-xl bg-white px-3 py-2 font-medium hover:bg-slate-200 transition-colors flex items-center gap-x-2 text-sm">
                  <Plus size={20} />
                  <span>Create Event</span>
               </button>
            </div>
         </div>
      </div>
   );
}

// firebase
import { app } from "../../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
// react
import { useState, useEffect, createRef } from "react";
import { useClickAway } from "react-use";
import { useNavigate } from "react-router-dom";
// icons
import { Plus } from "lucide-react";
import { getUserByUid } from "../utils/requests/user";
// atoms
import { createEventModalAtom } from "../utils/atoms/modals";
import { useAtom } from "jotai";
// components
import CreateEventModal from "../components/modals/CreateEventModal";

const auth = getAuth(app);

export default function DashboardPage() {
   const navigate = useNavigate();
   const modalRef = createRef();

   const [userData, setUserData] = useState(null);
   const [createEventModal, setCreateEventModal] =
      useAtom(createEventModalAtom);

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

   useClickAway(modalRef, () => {
      setCreateEventModal(false);
   });

   return (
      <div className="w-screen min-h-screen overflow-hidden flex flex-col items-center bg-zinc-900 py-20 relative">
         <div className="w-[600px] flex flex-col gap-y-10">
            <div className="w-full flex items-center justify-between">
               <span className="text-white font-medium text-xl">
                  Your Events
               </span>
               <button
                  onClick={() => setCreateEventModal(!createEventModal)}
                  className="rounded-xl bg-white px-3 py-2 font-medium hover:bg-slate-200 transition-colors flex items-center gap-x-2 text-sm"
               >
                  <Plus size={20} />
                  <span>Create Event</span>
               </button>
            </div>
         </div>
         {/* create event modal */}
         {createEventModal && userData && (
            <div className="w-screen h-screen bg-black bg-opacity-30 flex items-center justify-center absolute top-0 left-0 overflow-hidden z-[100]">
               <div ref={modalRef} className="w-[40%]">
                  <CreateEventModal uid={userData.uid} />
               </div>
            </div>
         )}
      </div>
   );
}

// atoms
import { useAtom } from "jotai";
import { selectedEventAtom } from "../../utils/atoms/selection";
import { inviteModalAtom } from "../../utils/atoms/modals";
// dayjs
import dayjs from "dayjs";
// icons
import { Check, X } from "lucide-react";
// firebase
import { app } from "../../../firebase";
import { getAuth } from "firebase/auth";
// requests
import { cancelJoiner, acceptJoiner } from "../../utils/requests/event";

const auth = getAuth(app);

export default function EventCard({ type, event, status }) {
   const [, setSelectedEvent] = useAtom(selectedEventAtom);
   const [, setInviteModal] = useAtom(inviteModalAtom);

   const splitDateTime = (input) => {
      const [datePart, timePart] = input.split(/-(?=\d{2}:\d{2})/);
      return [datePart, timePart];
   };

   const handleConfirm = async (e, eventId) => {
      e.preventDefault();
      const uid = auth.currentUser.uid;
      const token = await auth.currentUser.getIdToken();
      if (token && uid && eventId) {
         await acceptJoiner(token, eventId, uid);
      }
   };

   const handleCancel = async (e, eventId) => {
      e.preventDefault();
      const uid = auth.currentUser.uid;
      const token = await auth.currentUser.getIdToken();
      if (token && uid && eventId) {
         await cancelJoiner(token, eventId, uid);
      }
   };

   return (
      <div className="py-3 px-5 rounded-xl w-full bg-zinc-800 flex items-center justify-between">
         <div className="flex flex-col">
            <span className="font-medium text-white text-lg">
               {event.title}
            </span>
            <div className="flex items-center gap-x-2">
               <span className="font-medium text-slate-300">
                  {dayjs(splitDateTime(event.date_time)[0]).format(
                     "MMMM D, YYYY"
                  )}
               </span>
               <span className="text-slate-300">@</span>
               <span className="rounded-lg bg-green-300 bg-opacity-50 text-green-950 font-medium px-1 border border-green-900">
                  {splitDateTime(event.date_time)[1]}
               </span>
            </div>
         </div>
         {type === "invited" && (
            <div className="flex items-center gap-x-2">
               {/* status */}
               {status === "pending" && (
                  <span className="text-xs font-medium bg-amber-300 px-3 py-1 bg-opacity-30 text-white rounded-lg">
                     {status.toUpperCase()}
                  </span>
               )}
               {status === "cancelled" && (
                  <span className="text-xs font-medium bg-red-300 px-3 py-1 bg-opacity-30 text-white rounded-lg">
                     {status.toUpperCase()}
                  </span>
               )}
               {status === "accepted" && (
                  <span className="text-xs font-medium bg-green-300 px-3 py-1 bg-opacity-30 text-white rounded-lg">
                     {status.toUpperCase()}
                  </span>
               )}
               {/* buttons */}
               {status !== "accepted" && (
                  <button
                     onClick={(e) => handleConfirm(e, event.id)}
                     className="flex items-center justify-center p-2 bg-green-300 bg-opacity-50 text-green-950 rounded-xl border border-green-900 hover:bg-white hover:bg-opacity-100 hover:border-white transition-all"
                  >
                     <Check size={20} />
                  </button>
               )}
               {status !== "cancelled" && (
                  <button
                     onClick={(e) => handleCancel(e, event.id)}
                     className="flex items-center justify-center p-2 bg-red-300 bg-opacity-50 text-red-950 rounded-xl border border-red-900 hover:bg-white hover:bg-opacity-100 hover:border-white transition-all"
                  >
                     <X size={20} />
                  </button>
               )}
            </div>
         )}
         {type === "owned" && (
            <button
               onClick={() => {
                  setInviteModal(true);
                  setSelectedEvent(event);
               }}
               className="bg-green-600 rounded-xl px-3 py-2 font-medium text-green-950 hover:bg-green-500 transition-colors"
            >
               Invite
            </button>
         )}
      </div>
   );
}

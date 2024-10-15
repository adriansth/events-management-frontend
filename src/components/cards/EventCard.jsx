// atoms
import { useAtom } from "jotai";
import { selectedEventAtom } from "../../utils/atoms/selection";
import { inviteModalAtom } from "../../utils/atoms/modals";
// dayjs
import dayjs from "dayjs";
// icons
import { Check, X } from "lucide-react";

export default function EventCard({ type, event, status }) {
   const [, setSelectedEvent] = useAtom(selectedEventAtom);
   const [, setInviteModal] = useAtom(inviteModalAtom);

   const splitDateTime = (input) => {
      const [datePart, timePart] = input.split(/-(?=\d{2}:\d{2})/);
      return [datePart, timePart];
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
               {status === "confirmed" && (
                  <span className="text-xs font-medium bg-green-300 px-3 py-1 bg-opacity-30 text-white rounded-lg">
                     {status.toUpperCase()}
                  </span>
               )}
               <button className="flex items-center justify-center p-2 bg-green-300 bg-opacity-50 text-green-950 rounded-xl border border-green-900 hover:bg-white hover:bg-opacity-100 hover:border-white transition-all">
                  <Check size={20} />
               </button>
               <button className="flex items-center justify-center p-2 bg-red-300 bg-opacity-50 text-red-950 rounded-xl border border-red-900 hover:bg-white hover:bg-opacity-100 hover:border-white transition-all">
                  <X size={20} />
               </button>
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

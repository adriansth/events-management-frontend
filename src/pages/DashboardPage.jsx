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
import { createEventModalAtom, inviteModalAtom } from "../utils/atoms/modals";
import { selectedEventAtom } from "../utils/atoms/selection";
import { useAtom } from "jotai";
// components
import CreateEventModal from "../components/modals/CreateEventModal";
import InviteModal from "../components/modals/InviteModal";
// requests
import {
   getEventsByOrganizer,
   getInvitedEvents,
} from "../utils/requests/event";
// dayjs
import dayjs from "dayjs";

const auth = getAuth(app);

export default function DashboardPage() {
   const navigate = useNavigate();
   const modalRef = createRef();

   const [userData, setUserData] = useState(null);
   const [ownedEventsData, setOwnedEventsData] = useState([]);
   const [invitedEventsData, setInvitedEventsData] = useState([]);

   const [selectedEvent, setSelectedEvent] = useAtom(selectedEventAtom);

   const [createEventModal, setCreateEventModal] =
      useAtom(createEventModalAtom);
   const [inviteModal, setInviteModal] = useAtom(inviteModalAtom);

   const unsubscribe = () => {
      onAuthStateChanged(auth, async (user) => {
         if (user) {
            const token = await user.getIdToken();
            if (token) {
               const data = await getUserByUid(token, user.uid);
               const ownedEvents = await getEventsByOrganizer(token, user.uid);
               console.log(ownedEvents);
               const invitedEvents = await getInvitedEvents(token, user.uid);
               setInvitedEventsData(invitedEvents);
               setOwnedEventsData(ownedEvents);
               setUserData(data);
            }
         } else {
            navigate("/");
         }
      });
   };

   const splitDateTime = (input) => {
      const [datePart, timePart] = input.split(/-(?=\d{2}:\d{2})/);
      return [datePart, timePart];
   };

   useEffect(() => {
      unsubscribe();
   }, []);

   useClickAway(modalRef, () => {
      setCreateEventModal(false);
      setInviteModal(false);
   });

   return (
      <div className="w-screen min-h-screen overflow-hidden flex flex-col items-center bg-zinc-900 py-20 relative">
         <div className="w-[600px] flex flex-col gap-y-10">
            {/* owned events */}
            <div className="w-full flex flex-col gap-y-5">
               {/* header */}
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
               {/* owned events list */}
               <div className="w-full flex flex-col gap-y-2">
                  {ownedEventsData.length > 0 ? (
                     ownedEventsData?.map((event, i) => (
                        <div
                           key={i}
                           className="py-3 px-5 rounded-xl w-full bg-zinc-800 flex items-center justify-between"
                        >
                           <div className="flex flex-col">
                              <span className="font-medium text-white text-lg">
                                 {event.title}
                              </span>
                              <div className="flex items-center gap-x-2">
                                 <span className="font-medium text-slate-300">
                                    {dayjs(
                                       splitDateTime(event.date_time)[0]
                                    ).format("MMMM D, YYYY")}
                                 </span>
                                 <span className="text-slate-300">@</span>
                                 <span className="rounded-lg bg-green-300 bg-opacity-50 text-green-950 font-medium px-1 border border-green-900">
                                    {splitDateTime(event.date_time)[1]}
                                 </span>
                              </div>
                           </div>
                           <button
                              onClick={() => {
                                 setInviteModal(true);
                                 setSelectedEvent(event);
                              }}
                              className="bg-green-600 rounded-xl px-3 py-2 font-medium text-green-950 hover:bg-green-500 transition-colors"
                           >
                              Invite
                           </button>
                        </div>
                     ))
                  ) : (
                     <p className="text-slate-300 font-medium text-sm">
                        You have no events yet.
                     </p>
                  )}
               </div>
            </div>
            {/* invited events */}
            <div className="w-full flex flex-col gap-y-5">
               {/* header */}
               <div className="w-full flex items-center justify-between">
                  <span className="text-white font-medium text-xl">
                     You've been invited to
                  </span>
               </div>
               {/* invited events list */}
               <div className="w-full flex flex-col gap-y-2">
                  {invitedEventsData && invitedEventsData?.length > 0 ? (
                     <div className="w-full flex flex-col gap-y-2">
                        {invitedEventsData?.map((event, i) => (
                           <div
                              key={i}
                              className="py-3 px-5 rounded-xl w-full bg-zinc-800 flex flex-col"
                           >
                              <span className="font-medium text-white text-lg">
                                 {event.title}
                              </span>
                              <div className="flex items-center gap-x-2">
                                 <span className="font-medium text-slate-300">
                                    {dayjs(
                                       splitDateTime(event.date_time)[0]
                                    ).format("MMMM D, YYYY")}
                                 </span>
                                 <span className="text-slate-300">@</span>
                                 <span className="rounded-lg bg-green-300 bg-opacity-50 text-green-950 font-medium px-1 border border-green-900">
                                    {splitDateTime(event.date_time)[1]}
                                 </span>
                              </div>
                           </div>
                        ))}
                     </div>
                  ) : (
                     <p className="text-slate-300 font-medium text-xs">
                        You have no events yet.
                     </p>
                  )}
               </div>
            </div>
         </div>
         {/* create event modal */}
         {createEventModal && userData && (
            <div className="w-screen h-screen bg-black bg-opacity-30 flex items-center justify-center absolute top-0 left-0 overflow-hidden z-[100]">
               <div ref={modalRef} className="w-[20%]">
                  <CreateEventModal uid={userData.uid} />
               </div>
            </div>
         )}
         {/* invite modal */}
         {inviteModal && userData && (
            <div className="w-screen h-screen bg-black bg-opacity-30 flex items-center justify-center absolute top-0 left-0 overflow-hidden z-[100]">
               <div ref={modalRef} className="w-[20%]">
                  <InviteModal eventId={selectedEvent.id} />
               </div>
            </div>
         )}
      </div>
   );
}

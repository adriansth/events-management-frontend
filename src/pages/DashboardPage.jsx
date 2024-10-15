// firebase
import { app } from "../../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
// react
import { useState, useEffect, createRef } from "react";
import { useClickAway } from "react-use";
import { useNavigate } from "react-router-dom";
// icons
import { Check, Plus, X } from "lucide-react";
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
import EventCard from "../components/cards/EventCard";

const auth = getAuth(app);

export default function DashboardPage() {
   const navigate = useNavigate();
   const modalRef = createRef();

   const [userData, setUserData] = useState(null);
   const [ownedEventsData, setOwnedEventsData] = useState([]);
   const [invitedEventsData, setInvitedEventsData] = useState(null);

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
               const confirmedEvents = [];
               const pendingEvents = [];
               const cancelledEvents = [];
               invitedEvents.forEach((event) => {
                  const currentJoiner = event.joiners.find(
                     (joiner) => joiner.user_id === user.uid
                  );
                  if (currentJoiner) {
                     if (currentJoiner.status === "accepted") {
                        confirmedEvents.push(event);
                     } else if (currentJoiner.status === "pending") {
                        pendingEvents.push(event);
                     } else if (currentJoiner.status === "cancelled") {
                        cancelledEvents.push(event);
                     }
                  }
               });
               setInvitedEventsData({
                  confirmedEvents,
                  pendingEvents,
                  cancelledEvents,
               });
               console.log(pendingEvents);
               setOwnedEventsData(ownedEvents);
               setUserData(data);
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
                        <div key={i} className="w-full">
                           <EventCard type="owned" event={event} />
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
                  {invitedEventsData?.pendingEvents?.length > 0 ||
                  invitedEventsData?.confirmedEvents?.length > 0 ||
                  invitedEventsData?.canceledEvents?.length > 0 ? (
                     <>
                        {invitedEventsData.confirmedEvents?.length > 0 && (
                           <div className="w-full flex flex-col gap-y-2">
                              {invitedEventsData?.confirmedEvents?.map(
                                 (event, i) => {
                                    const currentJoiner = event.joiners.find(
                                       (joiner) =>
                                          joiner.user_id ===
                                          auth.currentUser.uid
                                    );
                                    return (
                                       <div key={i} className="w-full">
                                          <EventCard
                                             type="invited"
                                             event={event}
                                             status={currentJoiner?.status}
                                          />
                                       </div>
                                    );
                                 }
                              )}
                           </div>
                        )}
                        {invitedEventsData.pendingEvents?.length > 0 && (
                           <div className="w-full flex flex-col gap-y-2">
                              {invitedEventsData?.pendingEvents?.map(
                                 (event, i) => {
                                    const currentJoiner = event.joiners.find(
                                       (joiner) =>
                                          joiner.user_id ===
                                          auth.currentUser.uid
                                    );
                                    return (
                                       <div key={i} className="w-full">
                                          <EventCard
                                             type="invited"
                                             event={event}
                                             status={currentJoiner?.status}
                                          />
                                       </div>
                                    );
                                 }
                              )}
                           </div>
                        )}
                        {invitedEventsData.cancelledEvents?.length > 0 && (
                           <div className="w-full flex flex-col gap-y-2">
                              {invitedEventsData?.cancelledEvents?.map(
                                 (event, i) => {
                                    const currentJoiner = event.joiners.find(
                                       (joiner) =>
                                          joiner.user_id ===
                                          auth.currentUser.uid
                                    );
                                    return (
                                       <div key={i} className="w-full">
                                          <EventCard
                                             type="invited"
                                             event={event}
                                             status={currentJoiner?.status}
                                          />
                                       </div>
                                    );
                                 }
                              )}
                           </div>
                        )}
                     </>
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

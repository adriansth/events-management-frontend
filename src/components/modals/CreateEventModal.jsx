// react
import { useState } from "react";
// requests
import { createEvent } from "../../utils/requests/event";
// firebase
import { app } from "../../../firebase";
import { getAuth } from "@firebase/auth";
// atoms
import { useAtom } from "jotai";
import { createEventModalAtom } from "../../utils/atoms/modals";

const auth = getAuth(app);

export default function CreateEventModal({ uid }) {
   const [title, setTitle] = useState("");
   const [date, setDate] = useState("");
   const [time, setTime] = useState("");
   const [hours, setHours] = useState("");
   const [minutes, setMinutes] = useState("");
   const [location, setLocation] = useState("");

   const [, setCreateEventModal] = useAtom(createEventModalAtom);

   const handleSubmit = async (e) => {
      e.preventDefault();
      if (title && date && time && location) {
         const token = await auth.currentUser.getIdToken();
         await createEvent(
            token,
            uid,
            title,
            `${date}-${time}`,
            `${hours}:${minutes}`,
            location
         );
         setCreateEventModal(false);
      }
   };

   return (
      <div className="w-full p-10 bg-zinc-800 rounded-xl flex flex-col gap-y-5">
         <h2 className="font-medium text-xl text-white">Create Event</h2>
         <form className="w-full flex flex-col gap-y-5">
            {/* name */}
            <div className="w-full flex flex-col gap-y-2">
               <label
                  htmlFor="title"
                  className="font-medium text-sm text-slate-300"
               >
                  Title
               </label>
               <input
                  onChange={(e) => setTitle(e.target.value)}
                  type="text"
                  id="title"
                  required
                  className="rounded-xl bg-zinc-900 border border-zinc-700 px-3 py-2 font-medium text-white outline-none focus:ring-[1px] ring-white transition-all placeholder:text-zinc-700"
                  placeholder="My event"
               />
            </div>
            {/* date and time */}
            <div className="w-full flex items-center gap-x-3">
               {/* date */}
               <div className="w-full flex flex-col gap-y-2">
                  <label
                     htmlFor="date"
                     className="font-medium text-sm text-slate-300"
                  >
                     Date
                  </label>
                  <input
                     onChange={(e) => setDate(e.target.value)}
                     type="date"
                     required
                     className="rounded-xl bg-zinc-900 border border-zinc-700 px-3 py-2 font-medium text-white outline-none focus:ring-[1px] ring-white transition-all placeholder:text-zinc-700"
                  />
               </div>
               {/* time */}
               <div className="w-full flex flex-col gap-y-2">
                  <label
                     htmlFor="time"
                     className="font-medium text-sm text-slate-300"
                  >
                     Time
                  </label>
                  <input
                     onChange={(e) => setTime(e.target.value)}
                     type="time"
                     required
                     className="rounded-xl bg-zinc-900 border border-zinc-700 px-3 py-2 font-medium text-white outline-none focus:ring-[1px] ring-white transition-all placeholder:text-zinc-700"
                  />
               </div>
            </div>
            {/* duration */}
            <div className="w-full flex items-end justify-start gap-x-3">
               {/* hours */}
               <div className="w-full flex flex-col gap-y-2">
                  <label
                     htmlFor="duration"
                     className="font-medium text-sm text-slate-300"
                  >
                     Duration
                  </label>
                  <input
                     onChange={(e) => setHours(e.target.value)}
                     type="text"
                     className="rounded-xl bg-zinc-900 border border-zinc-700 px-3 py-2 font-medium text-white outline-none focus:ring-[1px] ring-white transition-all placeholder:text-zinc-700"
                     placeholder="Hours"
                  />
               </div>
               {/* minutes */}
               <div className="w-full flex flex-col gap-y-2">
                  <input
                     onChange={(e) => setMinutes(e.target.value)}
                     type="text"
                     className="rounded-xl bg-zinc-900 border border-zinc-700 px-3 py-2 font-medium text-white outline-none focus:ring-[1px] ring-white transition-all placeholder:text-zinc-700"
                     placeholder="Minutes"
                  />
               </div>
            </div>
            {/* location */}
            <div className="w-full flex flex-col gap-y-2">
               <label
                  htmlFor="location"
                  className="font-medium text-sm text-slate-300"
               >
                  Location
               </label>
               <input
                  onChange={(e) => setLocation(e.target.value)}
                  type="text"
                  required
                  className="rounded-xl bg-zinc-900 border border-zinc-700 px-3 py-2 font-medium text-white outline-none focus:ring-[1px] ring-white transition-all placeholder:text-zinc-700"
               />
            </div>
            {/* submit button */}
            <button
               onClick={handleSubmit}
               disabled={!title || !date || !time || !location}
               className="w-full mt-3 rounded-xl bg-white px-5 py-3 font-medium hover:bg-slate-200 transition-colors disabled:opacity-50"
            >
               Create Event
            </button>
         </form>
      </div>
   );
}

// firebase
import { app } from "../../../firebase";
import { getAuth } from "firebase/auth";
// requests
import { getUserByEmail } from "../../utils/requests/user";
import { addJoinerToEvent } from "../../utils/requests/event";
// react
import { useState } from "react";
// atoms
import { useAtom } from "jotai";
import { inviteModalAtom } from "../../utils/atoms/modals";

const auth = getAuth(app);

export default function InviteModal({ eventId }) {
   const [email, setEmail] = useState("");
   const [error, setError] = useState("");

   const [, setInviteModal] = useAtom(inviteModalAtom);

   const handleInvite = async (e) => {
      e.preventDefault();
      const token = await auth.currentUser.getIdToken();
      const joiner = await getUserByEmail(token, email);
      if (joiner && eventId) {
         await addJoinerToEvent(token, eventId, joiner.uid);
         setInviteModal(false);
      } else {
         setError("User not registered");
      }
   };

   return (
      <div className="w-full p-10 bg-zinc-800 rounded-xl flex flex-col gap-y-5">
         <h2 className="font-medium text-xl text-white">Invite to Event</h2>
         <p className="text-slate-300 font-medium text-sm">
            Invite people to this event via email.
         </p>
         <div className="w-full flex flex-col gap-y-2">
            <label
               htmlFor="email"
               className="text-sm font-medium text-slate-200"
            >
               Email
            </label>
            <input
               onChange={(e) => setEmail(e.target.value)}
               type="text"
               className="rounded-xl bg-zinc-900 border border-zinc-700 px-3 py-2 font-medium text-white outline-none focus:ring-[1px] ring-white transition-all placeholder:text-zinc-700"
               placeholder="johndoe@mail.com"
            />
         </div>
         {/* error */}
         {error && <p className="font-medium text-red-300 text-sm">{error}</p>}
         <button
            disabled={!email}
            onClick={handleInvite}
            className="w-full bg-white rounded-xl hover:bg-slate-200 transition-colors font-medium px-5 py-3 disabled:opacity-50 disabled:hover:bg-white"
         >
            Invite
         </button>
      </div>
   );
}

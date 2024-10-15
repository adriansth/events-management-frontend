import axios from "axios";

const baseUrl = "http://127.0.0.1:8000";

export const createEvent = async (
   token,
   organizer,
   title,
   dateTime,
   duration,
   location
) => {
   try {
      const response = await axios.post(
         `${baseUrl}/event/`,
         {
            title: title,
            organizer: organizer,
            date_time: dateTime,
            duration: duration,
            location: location,
            joiners: [],
         },
         {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         }
      );
      return response.data;
   } catch (err) {
      console.error(err.message);
   }
};

export const getEventsByOrganizer = async (token, organizer) => {
   try {
      const response = await axios.get(`${baseUrl}/event/owned/${organizer}/`, {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      });
      return response.data;
   } catch (err) {
      console.error(err.message);
   }
};

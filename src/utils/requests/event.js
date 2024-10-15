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

export const addJoinerToEvent = async (token, eventId, userId) => {
   try {
      const response = await axios.post(
         `${baseUrl}/event/${eventId}/join/`,
         null,
         {
            params: {
               user_id: userId,
            },
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

export const acceptJoiner = async (token, eventId, userId) => {
   try {
      const response = await axios.put(
         `${baseUrl}/event/${eventId}/joiner/${userId}/accept/`,
         null,
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

export const cancelJoiner = async (token, eventId, userId) => {
   try {
      const response = await axios.put(
         `${baseUrl}/event/${eventId}/joiner/${userId}/cancel/`,
         null,
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

export const getInvitedEvents = async (token, userId) => {
   try {
      const response = await axios.get(`${baseUrl}/events/invited/${userId}`, {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      });
      return response.data;
   } catch (err) {
      console.error(err.message);
   }
};

import axios from "axios";

const baseUrl = "http://127.0.0.1:8000";

export const createUser = async (token, uid, firstName, lastName, email) => {
   try {
      const response = await axios.post(
         `${baseUrl}/user/`,
         {
            uid: uid,
            first_name: firstName,
            last_name: lastName,
            email: email,
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

export const getUserByUid = async (token, uid) => {
   try {
      const response = await axios.get(`${baseUrl}/user/${uid}`, {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      });
      return response.data;
   } catch (err) {
      console.error(err.message);
   }
};

export const getUserByEmail = async (token, email) => {
   try {
      const response = await axios.get(`${baseUrl}/user/email/${email}`, {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      });
      return response.data;
   } catch (err) {
      console.error(err.message);
   }
};

export const updateUserByUid = async (token, uid, updates) => {
   try {
      const response = await axios.put(`${baseUrl}/user/${uid}`, updates, {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      });
      return response.data;
   } catch (err) {
      console.error(err.message);
   }
};

export const deleteUserByUid = async (token, uid) => {
   try {
      const response = await axios.delete(`${baseUrl}/user/${uid}`, {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      });
      return response.data;
   } catch (err) {
      console.error(err.message);
   }
};

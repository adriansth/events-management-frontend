import axios from "axios";

const baseUrl = "http://127.0.0.1:8000";

export const createUser = async (uid, firstName, lastName, email) => {
   try {
      const response = await axios.post(`${baseUrl}/user/`, {
         uid: uid,
         first_name: firstName,
         last_name: lastName,
         email: email,
      });
      return response.data;
   } catch (err) {
      console.error(err.message);
   }
};

export const getUserByUid = async (uid) => {
   try {
      const response = await axios.get(`${baseUrl}/user/${uid}`);
      return response.data;
   } catch (err) {
      console.error(err.message);
   }
};

export const updateUserByUid = async (uid, updates) => {
   try {
      const response = await axios.put(`${baseUrl}/user/${uid}`, updates);
      return response.data;
   } catch (err) {
      console.error(err.message);
   }
};

export const deleteUserByUid = async (uid) => {
   try {
      const response = await axios.delete(`${baseUrl}/user/${uid}`);
      return response.data;
   } catch (err) {
      console.error(err.message);
   }
};

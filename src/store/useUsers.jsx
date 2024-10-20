import { create } from "zustand";
import { devtools } from "zustand/middleware";
import axios from "axios";

// Calls data from API
const useUser = create(
  devtools((set) => ({
    usersData: [],
    fetchData: async () => {
      try {
        let config = {
          method: "get",
          maxBodyLength: Infinity,
          url: "https://6712d25f6c5f5ced6624bd5c.mockapi.io/api/v1/users",
          headers: {},
        };
        const response = await axios.request(config);
        set({ usersData: await response.data });
      } catch (error) {
        console.log(error);
      }
    },
    deleteData: async (userId, transactionId) => {
      try {
        let config = {
          method: "delete",
          maxBodyLength: Infinity,
          url: `https://6712d25f6c5f5ced6624bd5c.mockapi.io/api/v1/users/${userId}/transactionData/${transactionId}`,
          headers: {},
        };
        const response = await axios.request(config);
        console.log("Delete transaction success");
        set({ usersData: await response.data });
      } catch (error) {
        console.log(error);
      }
    },
  }))
);
export default useUser;

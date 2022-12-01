import axios from "axios";

const api = axios.create({
  baseURL: `https://server.anonytesting.com`,
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
  },
});

// List of all the endpoints

export const sendOtp = (data) => api.post("/api/send-otp", data);
export const verifyOtp = (data) => api.post("/api/verify-otp", data);
export const activate = (data) => api.post("/api/activate", data);
export const logout = () => api.post("/api/logout");
export const createRoom = (data) => api.post("/api/rooms", data);
export const getAllRooms = () => api.get("/api/rooms");
export const getAllUser = () => api.get("/api/users");
export const getAllEdit = () => api.get("/api/Edit");
export const getRoom = (roomId) => api.get(`/api/rooms/${roomId}`);
export const createhost = (data) => api.post(`/api/createhost`,data);
export const edituser = (user,id)  => api.put(`/api/editprofile/${id}`,user );
export const getdelete = (data) => api.delete(`/api/users`,data);
export const getdeleteroom = (data) => api.delete(`/api/dashboard`,data);


// Interceptors
api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      originalRequest &&
      !originalRequest._isRetry
    ) {
      originalRequest.isRetry = true;
      try {
        await axios.get(`https://server.anonytesting.com/api`, {
          withCredentials: true,
        });

        return api.request(originalRequest);
      } catch (err) {
        console.log(err.message);
      }
    }
    throw error;
  }
);

export default api;

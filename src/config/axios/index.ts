import axios from "axios";

// const value = `; ${document.cookie}`;
// const parts = value.split(`jwt_token=`);
// export const token = parts.length === 2 ? parts.pop().split(";").shift() : null;

export const getToken = () => localStorage.getItem("token") && "Bearer " + localStorage.getItem("token");
export const setToken = (token: string) => localStorage.setItem("token", token);

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "X-Requested-With": "XMLHttpRequest",
        Authorization: getToken(),
    },
});

// axiosInstance.interceptors.response.use(
//     function (response) {
//         return response;
//     },
//     function (error) {
//         if (error.response.status === 404) {
//             window.location.href = "/404";
//         }
//         if (error.response.status === 403) {
//             window.location.href = "/forbidden";
//         }
//         return Promise.reject(error);
//     }
// );

export default axiosInstance;
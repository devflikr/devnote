import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { ApiError, ApiRejection, ApiResponse } from ".";
import toast from "react-hot-toast";

export default function fetch<T>(url: string, config: AxiosRequestConfig = {}, data?: unknown, toastID?: string): Promise<ApiResponse<T>> {
    return new Promise((resolve, reject) => {
        axios<ApiResponse<T>>({
            baseURL: "http://localhost:8988/devnote",
            method: "POST",
            responseType: "json",
            url,
            withCredentials: true,
            ...config,
            data,
        }).then(({ data }) => {
            resolve(data);
        }).catch((error: AxiosError<ApiRejection>) => {
            console.error(error);
            let message = "";
            if (error.response) {
                if (error.response.data) {
                    if (error.response.data.message) {
                        message = error.response.data.message;
                        if (error.response.data.data) {
                            message += `: ${JSON.stringify(error.response.data.data)}`;
                        }
                    } else {
                        message = String(error.response.data);
                    }
                } else {
                    message = error.message;
                }
            } else {
                message = "An unknown error occurred";
            }
            const messageElement = document.createElement("span");
            messageElement.innerHTML = message;
            message = messageElement.innerText;
            message = message.replace(/\n/g, " ");
            toast.error(message, { id: toastID });
            reject(parseError(error, message));
        });
    });
}

function parseError(error: AxiosError<ApiRejection>, message: string): ApiError {
    const errorData = error.response?.data;
    const type = (errorData?.type || "").split("/");
    return {
        error: true,
        type: errorData?.type || "",
        status: "error",
        message,
        data: errorData?.data,
        service: type[0],
        target: type[1],
        content: type[2],
    }
}
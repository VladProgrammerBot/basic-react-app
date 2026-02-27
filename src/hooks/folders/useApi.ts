// import { useAlerts } from "../useAlerts";

const api = import.meta.env.VITE_API;

interface useApi {
  body?: {};
  auth?: boolean;
  path: string;
  method: "POST" | "GET" | "PUT" | "DELETE";
}

export const fetchApi = async ({
  body,
  auth = false,
  path,
  method,
}: useApi) => {
  // const { alertError } = useAlerts();

  try {
    await fetch(api + path, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...body,
        ...(auth && { token: localStorage.getItem("token") }),
      }),
    });
  } catch (error) {
    // alertError(path);
  }
};

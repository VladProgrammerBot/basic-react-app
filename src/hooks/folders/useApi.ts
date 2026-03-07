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
    const response = await fetch(api + path, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...body,
        ...(auth && { token: localStorage.getItem("token") }),
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
  } catch (error) {
    alert(
      "An error occurred while communicating with the server. Please try again.",
    );
    console.error("API Error:", error);
    // alertError(path);
  }
};

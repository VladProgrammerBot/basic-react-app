const api = import.meta.env.VITE_API;

interface useApi {
  body?: {};
  auth?: boolean;
  path: string;
  method: "POST" | "GET" | "PUT" | "DELETE";
  onSuccess?: (data: any) => void;
  onError?: (message: string) => void;
}

export const fetchApi = async ({
  body,
  auth = false,
  path,
  method,
  onSuccess,
  onError,
}: useApi) => {

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
    })
      .then((res) => res.json())
      .then((data) => {
        if (onSuccess) {
          onSuccess(data);
        }
      });

    // if (!response.ok) {
    //   throw new Error(`HTTP error: ${response.status}`);
    // }
  } catch (error) {
    console.error("API Error:", error);
    if (onError) {
      onError(error as string);
    }
    // alertError(path);
  }
};

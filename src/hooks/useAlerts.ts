import store from "@/state/store";
import { useEffect, useRef } from "react";

export const useAlerts = () => {
  const pushAlert = store.use.pushAlert();
  const deleteAlert = store.use.deleteAlert();

  const timerRef = useRef<number[]>([]);

  useEffect(() => {
    return () => {
      timerRef.current.forEach((timer) => clearTimeout(timer));
    };
  }, []);

  const useAlert = (props: Omit<alert, "id">) => {
    const newId = Math.floor(Math.random() * 2000000);

    pushAlert({ ...props, id: newId });

    const newTimerId = setTimeout(() => {
      timerRef.current = timerRef.current.filter((id) => id !== newTimerId);
      deleteAlert(newId);
    }, 10000);

    timerRef.current.push(newTimerId);
  };

  const alertError = (feat: string) => {
    useAlert({
      color: "red",
      text: `Failed to ${feat}, try to reload page`,
    });
  };

  return { alertError, useAlert };
};

import type { alertsSlice } from "@/types/storeTypes";
import type { StateCreator } from "zustand";

export const createAlertsSlice: StateCreator<alertsSlice> = (set) => ({
    alerts: [],
    pushAlert: (alert) => set((state) => ({ alerts: [...state.alerts, alert] })),
    deleteAlert: (id) => set((state) => ({ alerts: state.alerts.filter((alert) => alert.id !== id) }))
})
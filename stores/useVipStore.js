import create from "zustand";

export const useVipStore = create((set) => ({
    vips: ["10", "2", "5"],
}));

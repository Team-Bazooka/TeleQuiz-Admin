import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

export const useUser = create<IUserState>()((set) => ({
	user: {} as IUser,
	setUser: (newUser) => set((state) => ({ ...state, user: newUser })),
}));

interface IUserState {
	user: IUser;
	setUser: (newUser: IUser) => void;
}

export interface IUser {
	username: string;
	fname: string;
	lname: string;
	email: string;
	accesstoken: string;
}

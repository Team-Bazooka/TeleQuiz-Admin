import axios from "axios";
import { baseUrl, getHeader } from "./config";

export const getUsers = async (token: string) =>
	await axios
		.get(`${baseUrl}/admin/users`, getHeader(token))
		.then((res) => res.data)
		.then<IGetUser[]>((res) => {
			if (!res.success) {
				throw res.error;
			}
			return res.data as IGetUser[];
		});

export const loadStats = async (token: string) =>
	await axios
		.get(`${baseUrl}/admin/stats`, getHeader(token))
		.then((res) => res.data)
		.then<IGetStat>((res) => {
			if (!res.success) {
				throw res.error;
			}
			return res.data as IGetStat;
		});

interface IGetStat {
	total_quiz: number;
	total_user: number;
	total_admins: number;
}

interface IGetUser {
	id: string;
	telegram_id: string;
	username: string;
	number_of_quiz: number;
	number_of_shared_link: number;
	isActive: boolean;
}

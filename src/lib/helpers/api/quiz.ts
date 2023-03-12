import axios from "axios";
import { baseUrl, getHeader } from "./config";

export interface IAddQuiz {
	questions: string[];
	answers: string[];
	choices: string[][];
	title: string;
	tags: string[];
	description: string;
	language: string;
	token: string;
}

export const AddQuiz = async (newQuiz: IAddQuiz) => {
	const { token, ...values } = newQuiz;
	return await axios.post(`${baseUrl}/admin/quiz`, values, getHeader(token));
};

interface IQuizResponse {
	id: string;
	number_of_questions: number;
	views: number;
	title: string;
	description: string;
	tags: string[];
	language: string;
	created_at: any;
	questions: IQuestionResponse;
}

interface IQuestionResponse {
	content: string;
	choices: string[];
	answer: string;
}

export const LoadQuizzes = async (token: string) =>
	await axios
		.get(baseUrl + "/admin/quizes", getHeader(token))
		.then((res) => res.data)
		.then<IQuizResponse[]>((res) => {
			if (!res?.success) {
				throw res.error;
			}

			return res.data as IQuizResponse[];
		});

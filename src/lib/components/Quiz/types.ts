export interface IQuestion {
	question: string;
	choices: string[];
	answer: string;
}

export interface IChoice {
	value: string;
	error?: string;
}

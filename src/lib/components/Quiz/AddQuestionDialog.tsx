import {
	useToast,
	Flex,
	FormControl,
	FormLabel,
	Textarea,
	FormErrorMessage,
	InputGroup,
	Input,
	InputRightAddon,
	IconButton,
	Button,
	Select,
	ButtonGroup,
	Text,
} from "@chakra-ui/react";
import { FC, useState } from "react";
import { BiX, BiPlus, BiSave } from "react-icons/bi";
import * as yup from "yup";
import { IChoice, IQuestion } from "./types";

const initialChoice: IChoice = { value: "", error: undefined };

interface IAddQuestion {
	index: number;
	addQuestion: (question: IQuestion) => void;
	cancel: () => void;
	ref: any;
}

export const AddQuestionDialog: FC<IAddQuestion> = ({
	addQuestion,
	index,
	cancel,
	ref,
}) => {
	const [question, setQuestion] = useState("");
	const [questionError, setQuestionError] = useState("");
	const [choices, setChoices] = useState([
		initialChoice,
		initialChoice,
	] as IChoice[]);

	const [answer, setAnswer] = useState("");
	const toast = useToast();

	const addChoice = () => {
		if (choices.length < 10) {
			setChoices((values) => [...values, initialChoice]);
		} else {
			toast({
				title: "Can't Add More than 10 choices",
				status: "error",
				position: "bottom-right",
			});
		}
	};

	const changeChoice = (index: number, value: string) => {
		setChoices((val) =>
			val.map((v, i) => {
				if (i == index) {
					return { value, error: v.error };
				}
				return v;
			})
		);
	};

	const setChoiceError = (index: number, error: string) => {
		setChoices((val) =>
			val.map((v, i) => {
				if (i == index) {
					return { value: v.value, error };
				}
				return v;
			})
		);
	};

	const deleteChoice = (index: number) => {
		if (choices.length > 2) {
			setChoices((values) => values.filter((v, i) => i != index));
		} else {
			toast({
				title: "There must be at least 2 choices",
				status: "error",
				position: "bottom-right",
			});
		}
	};

	const save = async () => {
		const questionSchema = yup
			.string()
			.required("Please Enter The Question")
			.max(300, "Maximum Character allowed by telegram are 300");

		const choiceSchema = yup
			.string()
			.required("Please Enter Value of Choice")
			.max(100, "Choice can't exceed 100 Characters");

		try {
			questionSchema.validateSync(question);
			setQuestionError("");
		} catch (e) {
			setQuestionError((e as yup.ValidationError).errors[0]);
			return;
		}

		for (let i = 0; i < choices.length; i++) {
			try {
				choiceSchema.validateSync(choices[i].value);
				setChoiceError(i, "");
			} catch (e) {
				setChoiceError(i, (e as yup.ValidationError).errors[0]);
				return;
			}
		}

		addQuestion({
			question: question,
			answer: answer,
			choices: choices.map((c) => c.value),
		});

		cancel();
	};

	return (
		<Flex direction="column" gap={"5"} p="8" boxShadow={"lg"}>
			<FormControl isInvalid={!!questionError}>
				<FormLabel>Question {index + 1}</FormLabel>
				<Textarea
					value={question}
					onChange={(e) => setQuestion(e.target.value)}
					maxLength={300}
					variant="filled"
				/>
				<FormErrorMessage>{questionError}</FormErrorMessage>
			</FormControl>

			<Flex direction={"column"} ref={ref}>
				<Text fontSize="md">Choices</Text>
				<Flex direction={"column"} gap="4" padding={"5"}>
					{choices.map((choice, index) => (
						<FormControl key={index} isInvalid={!!choice.error}>
							<InputGroup variant="filled">
								<Input
									maxLength={100}
									value={choice.value}
									onChange={(e) =>
										changeChoice(index, e.target.value)
									}
									placeholder={`Choice ${index + 1}`}
								/>
								<InputRightAddon
									onClick={() => deleteChoice(index)}
									p="0"
								>
									<IconButton aria-label="Delete Choice">
										<BiX />
									</IconButton>
								</InputRightAddon>
							</InputGroup>
							<FormErrorMessage>{choice?.error}</FormErrorMessage>
						</FormControl>
					))}
					<Button
						leftIcon={<BiPlus />}
						colorScheme="green"
						mt="3"
						variant={"outline"}
						size="sm"
						onClick={addChoice}
					>
						Add Choice
					</Button>
				</Flex>
				<FormControl>
					<FormLabel>Answer</FormLabel>
					<Select
						variant={"filled"}
						value={answer}
						onChange={(e) => setAnswer(e.target.value)}
					>
						<option disabled value="">
							Choose the Answer
						</option>
						{choices.map((choice, index) => (
							<option key={index} value={index}>
								{choice.value}
							</option>
						))}
					</Select>
				</FormControl>
			</Flex>
			<ButtonGroup mt="5">
				<Button
					onClick={save}
					leftIcon={<BiSave />}
					colorScheme={"green"}
				>
					Save
				</Button>
				<Button onClick={cancel}>Cancel</Button>
			</ButtonGroup>
		</Flex>
	);
};

import { AdminLayout } from "$lib/components/Layout/AdminLayout";
import { AddQuestionDialog } from "$lib/components/Quiz/AddQuestionDialog";
import { QuestionItem } from "$lib/components/Quiz/QuestionItem";
import { IQuestion } from "$lib/components/Quiz/types";
import { AddQuiz, IAddQuiz } from "$lib/helpers/api/quiz";
import { withSessionSsr } from "$lib/helpers/cookies/cookie";
import { IUser } from "$lib/stores/user";
import {
	Button,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	Input,
	Tag,
	TagCloseButton,
	TagLabel,
	Text,
	Textarea,
	useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { FC, useRef, useState } from "react";
import { BiPlus, BiX } from "react-icons/bi";
import { useMutation } from "react-query";
import * as yup from "yup";

export const getServerSideProps = withSessionSsr(async ({ req }) => {
	const user = req.session.user;
	if (!user) {
		return {
			redirect: {
				destination: "/auth/login/",
			},
			props: {},
		};
	}
	return {
		props: {
			user,
		},
	};
});

let quizSchema = yup.object().shape({
	title: yup.string().required("Please Enter the Title"),
	language: yup.string().required("Please Enter the Language"),
	description: yup
		.string()
		.required("Please Enter a description about the quiz"),
});

const CreateQuizPage: FC<{ user: IUser }> = ({ user }) => {
	const [tags, setTags] = useState([] as string[]);
	const [tagName, setTagName] = useState("");
	const [addTag, setAddTag] = useState(false);
	const [questions, setQuestions] = useState([] as IQuestion[]);
	const [isAddOpen, setAddQuestion] = useState(false);
	const addDialogRef = useRef<HTMLDivElement>(null);
	const toast = useToast();
	const router = useRouter();
	const formik = useFormik({
		initialValues: {
			title: "",
			description: "",
			language: "",
		},
		validationSchema: quizSchema,
		onSubmit: (values, actions) => {
			if (questions.length < 1) {
				toast({
					title: "Create at least 1 Question",
					status: "error",
					position: "bottom-right",
				});

				return;
			} else {
				actions.setSubmitting(true);

				let q = questions.map((v) => v.question);
				let c = questions.map((v) => v.choices);
				let a = questions.map((v) => v.answer);

				mutation
					.mutateAsync({
						answers: a,
						choices: c,
						questions: q,
						tags,
						...values,
						token: user.accesstoken,
					})
					.then((res) => {
						router.push("/quizzes");
					})
					.finally(() => {
						actions.setSubmitting(false);
					});
			}
		},
	});

	const removeTag = (t: string) => {
		setTags((values) => values.filter((item) => item != t));
	};

	const addQuestion = (question: IQuestion) => {
		setQuestions((val) => [...val, question]);
	};

	const openAddQuestionDialog = () => {
		setAddQuestion(true);
		addDialogRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	const mutation = useMutation("AddQuiz", (newQuiz: IAddQuiz) =>
		AddQuiz(newQuiz)
	);

	return (
		<AdminLayout user={user}>
			<Flex
				as={"form"}
				onSubmit={(event) => formik.handleSubmit(event as any)}
				direction={"column"}
				flex="1"
				overflow={"auto"}
			>
				<Flex direction="column">
					<Heading size={"lg"}>Create Quiz</Heading>
					<Text>
						Add a Multiple Choice Quiz, by providing all information
					</Text>
				</Flex>
				<Heading mt="10" size={"md"}>
					Quiz information's
				</Heading>
				<Flex direction={"column"} gap="5">
					<Flex mt="4" direction={["column", null, "row"]} gap="5">
						<FormControl
							size={"lg"}
							flex="3"
							isInvalid={!!formik.errors.title}
						>
							<FormLabel>Title</FormLabel>
							<Input
								variant={"filled"}
								size="lg"
								name="title"
								value={formik.values.title}
								onChange={formik.handleChange}
							/>
						</FormControl>
						<FormControl
							size={"lg"}
							flex="1"
							isInvalid={!!formik.errors.language}
						>
							<FormLabel>Language</FormLabel>
							<Input
								variant={"filled"}
								size="lg"
								name="language"
								value={formik.values.language}
								onChange={formik.handleChange}
							/>
						</FormControl>
					</Flex>
					<FormControl
						size={"lg"}
						flex="3"
						isInvalid={!!formik.errors.description}
					>
						<FormLabel>Description</FormLabel>
						<Textarea
							variant={"filled"}
							name="description"
							value={formik.values.description}
							onChange={formik.handleChange}
						></Textarea>
					</FormControl>
					<FormControl size={"lg"} flex="3">
						<FormLabel>Tags</FormLabel>
						<Flex wrap={"wrap"} gap="4" alignItems={"center"}>
							{tags.length > 0 && (
								<Flex gap={"2"} flexWrap="wrap">
									{tags.map((tag, index) => (
										<Tag size={"lg"} key={index}>
											<TagLabel>{tag}</TagLabel>
											<TagCloseButton
												onClick={() => removeTag(tag)}
											/>
										</Tag>
									))}
								</Flex>
							)}
							<Flex gap={"2"}>
								{addTag && (
									<Input
										variant={"filled"}
										width={"200px"}
										size="sm"
										onKeyUp={(event) => {
											event.preventDefault();
											if (event.key === "Enter") {
												setTags((values) => [
													...values,
													tagName,
												]);
												setTagName("");
											}

											return event.key != "Enter";
										}}
										value={tagName}
										onChange={(e) =>
											setTagName(e.target.value)
										}
									></Input>
								)}
								<Button
									size="sm"
									colorScheme={addTag ? "red" : "green"}
									leftIcon={addTag ? <BiX /> : <BiPlus />}
									onClick={() => setAddTag((val) => !val)}
								>
									{addTag ? "Close" : "Add Tag"}
								</Button>
							</Flex>
						</Flex>
					</FormControl>
				</Flex>
				<Heading mt="16" size={"md"}>
					Questions
				</Heading>
				{/* Add Question */}
				<Flex direction={"column"} p="5" gap={"10"}>
					{questions.map((question, index) => (
						<QuestionItem index={index} question={question} />
					))}

					{isAddOpen && (
						<AddQuestionDialog
							ref={addDialogRef}
							addQuestion={addQuestion}
							cancel={() => setAddQuestion(false)}
							index={questions.length}
						/>
					)}

					{!isAddOpen && (
						<Button
							variant={"outline"}
							colorScheme="green"
							onClick={openAddQuestionDialog}
							leftIcon={<BiPlus />}
						>
							Add Question
						</Button>
					)}
				</Flex>
				<Flex py="10" gap={"4"} direction="column">
					<Button
						type="submit"
						isLoading={formik.isSubmitting}
						colorScheme="blue"
						size="lg"
					>
						Create Quiz
					</Button>
					<Button>Cancel</Button>
				</Flex>
			</Flex>
		</AdminLayout>
	);
};

export default CreateQuizPage;

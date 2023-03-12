import { Flex, VStack, Button, Text } from "@chakra-ui/react";
import { FC } from "react";
import { IQuestion } from "./types";

interface IQuestionItem {
	question: IQuestion;
	index: number;
}
export const QuestionItem: FC<IQuestionItem> = ({ question, index }) => {
	return (
		<Flex direction={"column"} p="5" boxShadow={"base"} borderRadius="md">
			<Flex direction={"column"}>
				<Text fontSize={"xl"} fontWeight="bold">
					Q. {index + 1}
				</Text>
				<Text fontSize={"md"} mt="3">
					{question.question}
				</Text>
			</Flex>
			<Flex direction={"column"} mt="8">
				<Text fontSize={"lg"} fontWeight="bold">
					Choices
				</Text>
				<VStack p="5" alignItems={"stretch"}>
					{question.choices.map((choice, choiceIndex) => {
						return (
							<Button
								key={choiceIndex}
								colorScheme={
									choiceIndex === parseInt(question.answer)
										? "blue"
										: "gray"
								}
								justifyContent={"flex-start"}
							>
								{choice}
							</Button>
						);
					})}
				</VStack>
			</Flex>
		</Flex>
	);
};

import {
	Flex,
	Heading,
	Skeleton,
	SkeletonText,
	Stat,
	StatLabel,
	StatNumber,
	Text,
} from "@chakra-ui/react";
import { FC } from "react";

interface IQuizItem {
	tag: string;
	questions: number;
	views: number | string;
	createdAt: string;
}

export const QuizItem: FC<IQuizItem> = ({
	tag,
	questions,
	views,
	createdAt,
}) => {
	return (
		<Flex
			cursor={"pointer"}
			p="5"
			direction={"column"}
			background="blackAlpha.100"
			borderRadius="md"
			transition={"all 200ms ease-out"}
			_hover={{
				background: "blue.50",
			}}
		>
			<Heading size={"md"} mb="4" flex="1">
				{tag}
			</Heading>
			<Flex wrap={"wrap"} mb="5">
				<Stat>
					<StatLabel>Questions</StatLabel>
					<StatNumber>{questions}</StatNumber>
				</Stat>
				<Stat>
					<StatLabel>Views</StatLabel>
					<StatNumber>{views}</StatNumber>
				</Stat>
			</Flex>
			<Text fontSize={"sm"}>Created {createdAt}</Text>
		</Flex>
	);
};

export const QuizItemLoading = () => {
	return (
		<Flex
			cursor={"pointer"}
			p="5"
			direction={"column"}
			background="blackAlpha.50"
			borderRadius="md"
			transition={"all 200ms ease-out"}
			_hover={{
				background: "blue.50",
			}}
		>
			<Flex flex={"1"} mb="10">
				<Skeleton height={"5"} mb="4" w="80%"></Skeleton>
			</Flex>
			<Flex wrap={"wrap"} mb="5" gap={"10"}>
				<Flex direction={"column"} flex="1">
					<SkeletonText mb="2" w="50%" noOfLines={1}></SkeletonText>
					<Skeleton height={"10"}></Skeleton>
				</Flex>
				<Flex direction={"column"} flex="1">
					<SkeletonText mb="2" w="50%" noOfLines={1}></SkeletonText>
					<Skeleton height={"10"}></Skeleton>
				</Flex>
			</Flex>
			<SkeletonText width={"50%"} noOfLines={1}></SkeletonText>
		</Flex>
	);
};

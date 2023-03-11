import { AdminLayout } from "$lib/components/Layout/AdminLayout";
import { QuizItem, QuizItemLoading } from "$lib/components/QuizItem";
import {
	Box,
	Flex,
	Heading,
	IconButton,
	Input,
	InputGroup,
	InputRightAddon,
	InputRightElement,
	SimpleGrid,
	Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { BiPlus, BiSearchAlt, BiSearchAlt2 } from "react-icons/bi";

const QuizzesPage = () => {
	return (
		<AdminLayout>
			<Flex direction="column" flex="1">
				<Flex alignItems={"center"}>
					<Flex direction="column">
						<Heading size={"lg"}>Quizzes</Heading>
						<Text>Create, View, and Manage Quizzes</Text>
					</Flex>
					<Box flex="1"></Box>
					<InputGroup flex="1" variant={"filled"}>
						<Input
							variant={"filled"}
							borderRadius="100px"
							placeholder="Search"
						></Input>
						<InputRightAddon p="0">
							<IconButton
								aria-label="Search Quiz"
								icon={<BiSearchAlt />}
								onClick={() => {}}
							></IconButton>
						</InputRightAddon>
					</InputGroup>
				</Flex>
				<SimpleGrid>
					<SimpleGrid mt="10" columns={[1, 2, 3]} gap="8">
						<Link
							style={{ display: "flex" }}
							href="/quizzes/create"
						>
							<Flex
								flex="1"
								cursor={"pointer"}
								p="5"
								direction={"column"}
								borderRadius="md"
								border={"2px"}
								transition={"all 200ms ease-out"}
								_hover={{
									background: "blue.50",
								}}
								alignItems="center"
								justifyContent={"center"}
							>
								<Box fontSize={"5xl"}>
									<BiPlus size="100px" />
								</Box>
								<Text>Create new Quiz</Text>
							</Flex>
						</Link>
						<QuizItem
							createdAt="2 minutes ago"
							tag="Marvel Cinematic Universe Trivia"
							questions={10}
							views="200K"
						/>
						<QuizItem
							createdAt="2 minutes ago"
							tag="Astronomy Trivia"
							questions={20}
							views="40K"
						/>
						{/* <QuizItemLoading /> */}
					</SimpleGrid>
				</SimpleGrid>
			</Flex>
		</AdminLayout>
	);
};
export default QuizzesPage;

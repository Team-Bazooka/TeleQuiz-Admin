import {
	Avatar,
	BackgroundProps,
	Box,
	Button,
	ColorProps,
	Flex,
	Grid,
	Heading,
	Icon,
	IconButton,
	Input,
	SimpleGrid,
	Stat,
	StatLabel,
	StatNumber,
	Text,
} from "@chakra-ui/react";
import { FC, ReactNode } from "react";
import {
	BiBookAlt,
	BiBookReader,
	BiGroup,
	BiHomeAlt,
	BiHomeAlt2,
	BiIdCard,
	BiLogOut,
	BiLogOutCircle,
	BiMenuAltLeft,
	BiQuestionMark,
	BiSearch,
	BiSearchAlt,
	BiSpreadsheet,
	BiUser,
} from "react-icons/bi";

export default function Home() {
	return (
		<Flex minHeight="100vh" width="100%" direction={"column"}>
			{/* Navbar */}
			<Flex
				alignItems={"center"}
				px={["5", null, "20"]}
				py={["5", null, "8"]}
				gap="5"
			>
				<IconButton
					aria-label="Menu"
					icon={<BiMenuAltLeft />}
					display={["flex", null, "none"]}
				></IconButton>
				<Flex direction={"column"}>
					<Heading color="brandBlue" size="xl">
						TeleQuiz
					</Heading>
					<Text
						color="brandOrange"
						fontSize={"xl"}
						fontWeight="bold"
						textTransform={"uppercase"}
					>
						Admin Panel
					</Text>
				</Flex>
				<Box flex="1"></Box>
				<Flex
					background={"blackAlpha.100"}
					py={["2", null, "4"]}
					px="5"
					borderRadius={"100px"}
					alignItems={"center"}
					gap="3"
				>
					<Avatar size={"sm"}></Avatar>
					<Flex display={["none", null, "flex"]} direction={"column"}>
						<Heading size="sm">Naol Chala</Heading>
						<Text fontSize={"sm"}>naolchala6@gmail.com</Text>
					</Flex>
					<IconButton
						aria-label="logout"
						icon={<BiLogOutCircle />}
					></IconButton>
				</Flex>
			</Flex>

			{/* Container */}
			<Flex flex="1" gap="10" px={["5", null, "20"]}>
				{/* Sidebar */}
				<Flex
					width={["0%", null, "20%"]}
					overflowX="hidden"
					direction={"column"}
					as="aside"
					gap={"2"}
					pb="10"
				>
					<Button
						size={"lg"}
						leftIcon={<BiHomeAlt size="24px" />}
						variant="ghost"
						justifyContent={"flex-start"}
					>
						Home
					</Button>

					<Button
						size={"lg"}
						leftIcon={<BiGroup size="24px" />}
						variant="ghost"
						justifyContent={"flex-start"}
					>
						Manage Users
					</Button>
					<Button
						size={"lg"}
						leftIcon={<BiBookAlt size="24px" />}
						variant="ghost"
						justifyContent={"flex-start"}
					>
						Manage Quizzes
					</Button>
					<Button
						size={"lg"}
						leftIcon={<BiIdCard size="24px" />}
						variant="ghost"
						justifyContent={"flex-start"}
					>
						Manage Admins
					</Button>
					<Box flex="1"></Box>
					<Button
						size={"lg"}
						leftIcon={<BiUser size="24px" />}
						variant="solid"
						colorScheme={"orange"}
						justifyContent={"flex-start"}
					>
						My Account
					</Button>
				</Flex>
				<Flex direction={"column"} flex="1">
					<Heading size={"lg"} mb="4">
						Stats
					</Heading>
					<SimpleGrid columns={3} gap="5">
						<StatCard
							color="white"
							background="brandBlue"
							icon={<BiGroup size="60px" />}
							count={"300"}
							label={"Total Users"}
						/>
						<StatCard
							color="white"
							background="green.500"
							icon={<BiBookReader size="60px" />}
							count={"240"}
							label={"Total Quizzes"}
						/>
						<StatCard
							color="white"
							background="orange.500"
							icon={<BiIdCard size="60px" />}
							count={"30"}
							label={"Total Admins"}
						/>
					</SimpleGrid>
					<Flex mt="16" direction={"column"}>
						<Flex
							justifyContent={"space-between"}
							direction={["column", null, "row"]}
						>
							<Heading size={"lg"}>Recent Quizzes</Heading>
						</Flex>
						<SimpleGrid mt="10" columns={[1, 2, 3]} gap="8">
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
						</SimpleGrid>
					</Flex>
				</Flex>
			</Flex>
		</Flex>
	);
}

interface IQuizItem {
	tag: string;
	questions: number;
	views: number | string;
	createdAt: string;
}

const QuizItem: FC<IQuizItem> = ({ tag, questions, views, createdAt }) => {
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

interface IStatCard {
	background?: string;
	color?: string;
	count: string;
	label: string;
	icon: ReactNode;
}

const StatCard: FC<IStatCard> = ({
	background,
	color,
	count,
	label,
	icon,
}: IStatCard) => {
	return (
		<Flex
			direction={["column", null, "row"]}
			color={color}
			background={background}
			p="5"
			borderRadius={"lg"}
			justifyContent="space-between"
			alignItems={"center"}
			boxShadow="lg"
		>
			{icon}
			<Flex direction={"column"} textAlign="center">
				<Heading>{count}</Heading>
				<Text>{label}</Text>
			</Flex>
		</Flex>
	);
};

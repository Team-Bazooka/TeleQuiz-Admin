import { AdminLayout } from "$lib/components/Layout/AdminLayout";
import { QuizItem } from "$lib/components/QuizItem";
import {
	Flex,
	Heading,
	SimpleGrid,
	Slide,
	SlideFade,
	Stat,
	StatLabel,
	StatNumber,
	Text,
} from "@chakra-ui/react";
import { FC, ReactNode } from "react";
import { BiBookReader, BiGroup, BiIdCard } from "react-icons/bi";

export default function Home() {
	return (
		<AdminLayout>
			<Flex direction={"column"} flex="1">
				<SlideFade in={true}>
					<Heading size={"lg"} mb="4">
						Stats
					</Heading>
					<SimpleGrid columns={[1, 2, 3]} gap="5">
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
				</SlideFade>
				<SlideFade in={true} delay={0.1}>
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
				</SlideFade>
			</Flex>
		</AdminLayout>
	);
}

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
			direction={"row"}
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

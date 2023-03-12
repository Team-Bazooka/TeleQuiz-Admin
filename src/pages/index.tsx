import { AdminLayout } from "$lib/components/Layout/AdminLayout";
import { QuizItem } from "$lib/components/QuizItem";
import { loadStats } from "$lib/helpers/api/users";
import { withSessionSsr } from "$lib/helpers/cookies/cookie";
import { IUser, useUser } from "$lib/stores/user";
import {
	Flex,
	Heading,
	SimpleGrid,
	SlideFade,
	Spinner,
	Text,
} from "@chakra-ui/react";
import { FC, ReactNode } from "react";
import { BiBookReader, BiGroup, BiIdCard } from "react-icons/bi";
import { useQuery } from "react-query";

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

const Home: FC<{ user: IUser }> = ({ user }) => {
	const { isLoading, data, error } = useQuery("Stats", () =>
		loadStats(user.accesstoken)
	);

	return (
		<AdminLayout user={user}>
			<Flex direction={"column"} flex="1">
				<SlideFade in={true}>
					<Heading size={"lg"} mb="4">
						Stats
					</Heading>
					{isLoading ? (
						<Flex
							alignItems={"center"}
							justifyContent="center"
							p="5"
						>
							<Spinner />
						</Flex>
					) : (
						data && (
							<SimpleGrid columns={[1, 2, 3]} gap="5">
								<StatCard
									color="white"
									background="brandBlue"
									icon={<BiGroup size="60px" />}
									count={data.total_user}
									label={"Total Users"}
								/>
								<StatCard
									color="white"
									background="green.500"
									icon={<BiBookReader size="60px" />}
									count={data.total_quiz}
									label={"Total Quizzes"}
								/>
								<StatCard
									color="white"
									background="orange.500"
									icon={<BiIdCard size="60px" />}
									count={data.total_admins}
									label={"Total Admins"}
								/>
							</SimpleGrid>
						)
					)}
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
};

interface IStatCard {
	background?: string;
	color?: string;
	count: string | number;
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

export default Home;

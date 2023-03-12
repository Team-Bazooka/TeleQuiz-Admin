import { AdminLayout } from "$lib/components/Layout/AdminLayout";
import { baseUrl } from "$lib/helpers/api/config";
import { getUsers } from "$lib/helpers/api/users";
import { withSessionSsr } from "$lib/helpers/cookies/cookie";
import { IUser } from "$lib/stores/user";
import {
	Badge,
	Button,
	ButtonGroup,
	Flex,
	Heading,
	Link,
	SkeletonText,
	SlideFade,
	Table,
	Tbody,
	Td,
	Text,
	Thead,
	Tr,
} from "@chakra-ui/react";
import axios from "axios";
import { FC, useState } from "react";
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

const UsersPage: FC<{ user: IUser }> = ({ user }) => {
	const { isLoading, data, error } = useQuery("users", async () =>
		getUsers(user.accesstoken)
	);
	return (
		<AdminLayout user={user}>
			<Flex direction="column" flex="1" overflow={"auto"} height="100%">
				<SlideFade in={true}>
					<Flex direction={"column"}>
						<Heading size={"lg"}>Users</Heading>
						<Text>View & Search Subscribed Users</Text>
					</Flex>
					<Table mt="10">
						<Thead>
							<Tr>
								<Td>Telegram ID</Td>
								<Td>Telegram Username</Td>
								<Td>Quizzes Taken</Td>
								<Td>Links Shared</Td>
								<Td>Status</Td>
							</Tr>
						</Thead>
						{isLoading ? (
							<Tbody>
								{[...Array(10)].map((i, k) => (
									<Tr key={k}>
										{[...Array(5)].map((ti, tk) => (
											<Td key={tk}>
												<SkeletonText noOfLines={1} />
											</Td>
										))}
									</Tr>
								))}
							</Tbody>
						) : (
							<Tbody>
								{data &&
									data.map((u, k) => {
										return (
											<Tr key={u.id}>
												<Td>{u.telegram_id}</Td>
												<Td>
													<Link
														color={"blue.500"}
														href={`http://t.me/${u.username}`}
													>
														@{u.username}
													</Link>
												</Td>
												<Td>{u.number_of_quiz}</Td>
												<Td>
													{u.number_of_shared_link}
												</Td>
												<Td>
													{u.isActive ? (
														<Badge
															variant={"solid"}
															colorScheme="green"
														>
															Active
														</Badge>
													) : (
														<Badge
															variant={"solid"}
														>
															InActive
														</Badge>
													)}
												</Td>
											</Tr>
										);
									})}
							</Tbody>
						)}
					</Table>
					<Flex justifyContent={"center"}>
						<ButtonGroup my="10">
							<Button>Previous</Button>
							<Button>1</Button>
							<Button>2</Button>
							<Button>3</Button>
							<Button>4</Button>
							<Button>5</Button>
							<Button>Next</Button>
						</ButtonGroup>
					</Flex>
				</SlideFade>
			</Flex>
		</AdminLayout>
	);
};
export default UsersPage;

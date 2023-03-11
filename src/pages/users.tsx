import { AdminLayout } from "$lib/components/Layout/AdminLayout";
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
import { useState } from "react";

const UsersPage = () => {
	const [isLoading, setLoading] = useState(true);
	return (
		<AdminLayout>
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
								{[...Array(50)].map((i, k) => {
									return (
										<Tr key={k}>
											<Td>123456</Td>
											<Td>
												<Link
													color={"blue.500"}
													href="http://t.me/naol_chala"
												>
													@naol_chala
												</Link>
											</Td>
											<Td>10</Td>
											<Td>54</Td>
											<Td>
												{k % 2 == 0 ? (
													<Badge
														variant={"solid"}
														colorScheme="green"
													>
														Online
													</Badge>
												) : (
													<Badge variant={"solid"}>
														Offline
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

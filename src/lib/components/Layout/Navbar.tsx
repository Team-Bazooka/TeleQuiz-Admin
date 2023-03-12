import { useUser } from "$lib/stores/user";
import { Flex, Heading, Avatar, IconButton, Box, Text } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import { FC } from "react";
import { BiLogOutCircle, BiMenuAltRight } from "react-icons/bi";

interface INavbar {
	onOpen: () => void;
}
export const Navbar: FC<INavbar> = ({ onOpen }) => {
	const { user } = useUser();
	const router = useRouter();

	const logout = async () => {
		await axios.post("/api/logout");
		router.push("/");
	};

	return (
		<Flex
			alignItems={"center"}
			px={["5", null, "12"]}
			py={["5", null, "8"]}
			gap="5"
		>
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
				display={["none", null, "flex"]}
				background={"blackAlpha.100"}
				py={["2", null, "4"]}
				px="5"
				borderRadius={"100px"}
				alignItems={"center"}
				gap="3"
			>
				<Avatar size={"sm"}></Avatar>
				<Flex display={["none", null, "flex"]} direction={"column"}>
					<Heading size="sm">
						{user.fname} {user.lname}
					</Heading>
					<Text fontSize={"sm"}>{user.email}</Text>
				</Flex>
				<IconButton
					aria-label="logout"
					icon={<BiLogOutCircle />}
					onClick={logout}
				></IconButton>
			</Flex>
			<IconButton
				size="lg"
				colorScheme={"blue"}
				aria-label="Menu"
				icon={<BiMenuAltRight />}
				display={["flex", null, "none"]}
				onClick={onOpen}
			></IconButton>
		</Flex>
	);
};

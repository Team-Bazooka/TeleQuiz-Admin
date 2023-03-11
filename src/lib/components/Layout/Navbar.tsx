import { Flex, Heading, Avatar, IconButton, Box, Text } from "@chakra-ui/react";
import { FC } from "react";
import { BiLogOutCircle, BiMenuAltRight } from "react-icons/bi";

interface INavbar {
	onOpen: () => void;
}
export const Navbar: FC<INavbar> = ({ onOpen }) => {
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
					<Heading size="sm">Naol Chala</Heading>
					<Text fontSize={"sm"}>naolchala6@gmail.com</Text>
				</Flex>
				<IconButton
					aria-label="logout"
					icon={<BiLogOutCircle />}
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

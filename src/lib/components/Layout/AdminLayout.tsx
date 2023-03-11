import {
	Flex,
	Box,
	Heading,
	Avatar,
	IconButton,
	Drawer,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	DrawerHeader,
	DrawerBody,
	SimpleGrid,
	Text,
	useDisclosure,
	SlideFade,
} from "@chakra-ui/react";
import { FC, ReactNode } from "react";
import {
	BiLogOutCircle,
	BiMenuAltRight,
	BiGroup,
	BiBookReader,
	BiIdCard,
} from "react-icons/bi";
import { Navbar } from "./Navbar";
import { MobileMenu, SideMenu } from "./SideMenu";

interface IAdminLayout {
	children: ReactNode;
}
const AdminLayout: FC<IAdminLayout> = ({ children }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	return (
		<Flex height="100vh" width="100%" direction={"column"}>
			{/* Navbar */}
			<Navbar onOpen={onOpen} />
			<MobileMenu onClose={onClose} isOpen={isOpen} />
			{/* Container */}
			<Flex
				position={"relative"}
				flex="1"
				gap="14"
				px={["5", null, "10"]}
			>
				{/* Sidebar */}
				<Flex display={["none", null, "flex"]}>
					<SideMenu />
				</Flex>
				{children}
			</Flex>
		</Flex>
	);
};
export { AdminLayout };

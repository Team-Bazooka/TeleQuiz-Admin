import {
	Button,
	Flex,
	Box,
	Text,
	Drawer,
	DrawerOverlay,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerHeader,
	Heading,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ReactElement, FC } from "react";
import {
	BiHomeAlt,
	BiGroup,
	BiBookAlt,
	BiIdCard,
	BiUser,
} from "react-icons/bi";

interface ISideMenuItem {
	label: string;
	icon: ReactElement;
	pathname: string;
}
const SideMenuItem: FC<ISideMenuItem> = ({ label, icon, pathname }) => {
	const router = useRouter();
	return (
		<Button
			p="5"
			size={"lg"}
			leftIcon={icon}
			variant="ghost"
			justifyContent={"flex-start"}
			isActive={router.pathname == pathname}
			onClick={() => router.push(pathname)}
		>
			{label}
		</Button>
	);
};

export const SideMenu = () => {
	return (
		<Flex
			pb="10"
			gap={"2"}
			direction={"column"}
			overflowX="hidden"
			as="aside"
		>
			<SideMenuItem
				icon={<BiHomeAlt size="24px" />}
				label="Home"
				pathname="/"
			/>
			<SideMenuItem
				icon={<BiGroup size="24px" />}
				label="Manage Users"
				pathname="/users"
			/>
			<SideMenuItem
				icon={<BiBookAlt size="24px" />}
				label="Manage Quizzes"
				pathname="/quizzes"
			/>
			<SideMenuItem
				icon={<BiIdCard size="24px" />}
				label="Manage Admins"
				pathname="/admins"
			/>
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
	);
};

interface IMobileMenu {
	isOpen: boolean;
	onClose: () => void;
}
export const MobileMenu: FC<IMobileMenu> = ({ isOpen, onClose }) => {
	return (
		<Drawer isOpen={isOpen} onClose={onClose}>
			<DrawerOverlay></DrawerOverlay>
			<DrawerContent>
				<DrawerCloseButton></DrawerCloseButton>
				<DrawerHeader>
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
				</DrawerHeader>
				<DrawerBody>
					<SideMenu />
				</DrawerBody>
			</DrawerContent>
		</Drawer>
	);
};

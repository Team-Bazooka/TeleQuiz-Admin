import { IUser, useUser } from "$lib/stores/user";
import { Flex, useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FC, ReactNode, useEffect } from "react";
import LoginPage from "../../../pages/auth/login";
import { Navbar } from "./Navbar";
import { MobileMenu, SideMenu } from "./SideMenu";

interface IAdminLayout {
	user: IUser;
	children?: ReactNode;
}
const AdminLayout: FC<IAdminLayout> = ({ user, children }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { setUser } = useUser();

	useEffect(() => setUser(user), [user]);

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

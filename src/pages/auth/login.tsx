import { colorSchemes } from "$lib/theme";
import {
	Box,
	Button,
	Flex,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Heading,
	IconButton,
	Input,
	InputGroup,
	InputRightElement,
	Text,
	Link,
} from "@chakra-ui/react";
import { BiHide, BiShow } from "react-icons/bi";
import { useState } from "react";

const LoginPage = () => {
	const [showPassword, setShowPassword] = useState(false);

	return (
		<Flex minHeight={"100vh"} width="100%">
			<Box
				width={["0%", null, "40%"]}
				background={`linear-gradient(45deg, ${colorSchemes.brandGreen}, ${colorSchemes.brandBlue}), url('/login-background.jpg')`}
				backgroundSize="cover"
				backgroundBlendMode="overlay"
				boxShadow="lg"
			></Box>
			<Flex
				direction={"column"}
				alignItems="center"
				flex={1}
				p={["10", null, "50px"]}
			>
				<Flex alignItems={"center"} direction={"column"} mb="20">
					<Heading size="2xl" color={"brandBlue"}>
						TeleQuiz
					</Heading>
					<Text
						color={"brandOrange"}
						fontSize="2xl"
						textTransform="uppercase"
						fontWeight="bold"
					>
						Admin Portal
					</Text>
				</Flex>
				<Flex
					flex="1"
					as={"form"}
					direction="column"
					gap="8"
					width={["full", "80%", "60%"]}
				>
					<FormControl>
						<FormLabel>Username</FormLabel>
						<Input name="username" type="text" variant={"filled"} />
						<FormErrorMessage>
							Please Enter A Valid Username
						</FormErrorMessage>
					</FormControl>
					<Flex direction={"column"}>
						<FormControl>
							<FormLabel>Password</FormLabel>
							<InputGroup>
								<Input
									name="password"
									type={showPassword ? "text" : "password"}
									variant="filled"
								/>
								<InputRightElement>
									<IconButton
										size={"lg"}
										aria-label={
											showPassword
												? "Hide Password"
												: "Show Password"
										}
										icon={
											showPassword ? (
												<BiHide />
											) : (
												<BiShow />
											)
										}
										onClick={() =>
											setShowPassword((value) => !value)
										}
										colorScheme="blue"
										variant="ghost"
									></IconButton>
								</InputRightElement>
							</InputGroup>
							<FormErrorMessage>
								Incorrect Password
							</FormErrorMessage>
						</FormControl>
						<Link
							color={"blue.500"}
							alignSelf={"flex-end"}
							mt="3"
							href={"/forget-password"}
						>
							Forgot Password?
						</Link>
					</Flex>

					<Button mt="8" colorScheme={"blue"}>
						Login
					</Button>
				</Flex>
				<Flex wrap={"wrap"} gap="5">
					<Link
						color="brandBlue"
						href="#About"
						fontWeight={"light"}
						fontSize={"md"}
					>
						About Us
					</Link>
					<Link
						color="brandBlue"
						href="#About"
						fontWeight={"light"}
						fontSize={"md"}
					>
						Terms and Services
					</Link>
					<Link
						color="brandBlue"
						href="#About"
						fontWeight={"light"}
						fontSize={"md"}
					>
						Contact Us
					</Link>
				</Flex>
			</Flex>
		</Flex>
	);
};
export default LoginPage;

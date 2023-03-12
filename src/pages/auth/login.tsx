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
	useToast,
} from "@chakra-ui/react";
import { BiHide, BiShow } from "react-icons/bi";
import { useState } from "react";
import { Formik, useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { IUser, useUser } from "$lib/stores/user";
import { useRouter } from "next/router";
import { withSessionSsr } from "$lib/helpers/cookies/cookie";

export const getServerSideProps = withSessionSsr(async ({ req }) => {
	const user = req.session.user;
	if (user) {
		return {
			redirect: {
				destination: "/",
			},
			props: {
				user,
			},
		};
	}
	return {
		props: {},
	};
});

const LoginPage = () => {
	const [showPassword, setShowPassword] = useState(false);
	const { user, setUser } = useUser();

	const loginSchema = yup.object().shape({
		username: yup.string().required("Please, Enter your Username"),
		password: yup
			.string()
			.required("Please, Enter your Password")
			.min(6, "Password must be minimum of 6 characters"),
	});
	const toast = useToast();
	const router = useRouter();

	const formik = useFormik({
		initialValues: {
			username: "",
			password: "",
		},
		onSubmit: async (values, actions) => {
			actions.setSubmitting(true);
			await axios
				.post(`/api/login`, values)
				.then((res) => res.data)
				.then((res) => {
					if (!res.success) {
						toast({
							title: res.error.msg,
							status: "error",
							position: "bottom-right",
						});
						return;
					}

					const user: IUser = res.data;
					setUser(user);
					router.push("/");
				})
				.catch((err) => {
					console.log(err);

					toast({
						title: "Oops, Unknown Error Happened",
						description: "Please, try again",
						status: "error",
						position: "bottom-right",
					});
				})
				.finally(() => actions.setSubmitting(false));
		},
		validationSchema: loginSchema,
		validateOnBlur: false,
		validateOnChange: false,
	});

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
					onSubmit={(e) => formik.handleSubmit(e as any)}
				>
					<FormControl isInvalid={!!formik.errors.username}>
						<FormLabel>Username</FormLabel>
						<Input
							name="username"
							type="text"
							value={formik.values.username}
							onChange={formik.handleChange}
							variant={"filled"}
						/>
						<FormErrorMessage>
							{formik.errors.username}
						</FormErrorMessage>
					</FormControl>
					<Flex direction={"column"}>
						<FormControl isInvalid={!!formik.errors.password}>
							<FormLabel>Password</FormLabel>
							<InputGroup>
								<Input
									name="password"
									type={showPassword ? "text" : "password"}
									variant="filled"
									value={formik.values.password}
									onChange={formik.handleChange}
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
								{formik.errors.password}
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

					<Button
						mt="8"
						colorScheme={"blue"}
						isLoading={formik.isSubmitting}
						onClick={formik.submitForm}
						type="submit"
					>
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

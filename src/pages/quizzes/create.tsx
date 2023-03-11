import { AdminLayout } from "$lib/components/Layout/AdminLayout";
import {
	Button,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	HStack,
	Input,
	Show,
	Tag,
	TagCloseButton,
	TagLabel,
	Text,
	Textarea,
} from "@chakra-ui/react";
import { useState } from "react";
import { BiPlus } from "react-icons/bi";

const CreateQuizPage = () => {
	const [tags, setTags] = useState([] as string[]);
	const [tagName, setTagName] = useState("");
	const [addTag, setAddTag] = useState(false);

	const removeTag = (t: string) => {
		setTags((values) => values.filter((item) => item != t));
	};

	return (
		<AdminLayout>
			<Flex direction={"column"} flex="1" overflow={"auto"}>
				<Flex direction="column">
					<Heading size={"lg"}>Create Quiz</Heading>
					<Text>
						Add a Multiple Choice Quiz, by providing all information
					</Text>
				</Flex>
				<Heading mt="10" size={"md"}>
					Quiz information's
				</Heading>
				<Flex direction={"column"} gap="5">
					<Flex mt="4" direction={["column", null, "row"]} gap="5">
						<FormControl size={"lg"} flex="3">
							<FormLabel>Title</FormLabel>
							<Input variant={"filled"} size="lg" />
						</FormControl>
						<FormControl size={"lg"} flex="1">
							<FormLabel>Language</FormLabel>
							<Input variant={"filled"} size="lg" />
						</FormControl>
					</Flex>
					<FormControl size={"lg"} flex="3">
						<FormLabel>Description</FormLabel>
						<Textarea variant={"filled"}></Textarea>
					</FormControl>
					<FormControl size={"lg"} flex="3">
						<FormLabel>Tags</FormLabel>
						<Flex wrap={"wrap"} gap="4" alignItems={"center"}>
							{tags.length > 0 && (
								<Flex gap={"2"} flexWrap="wrap">
									{tags.map((tag, index) => (
										<Tag size={"lg"} key={index}>
											<TagLabel>{tag}</TagLabel>
											<TagCloseButton
												onClick={() => removeTag(tag)}
											/>
										</Tag>
									))}
								</Flex>
							)}
							<Flex gap={"2"}>
								{addTag && (
									<Input
										variant={"filled"}
										width={"200px"}
										size="sm"
										onKeyUp={(event) => {
											if (event.key === "Enter") {
												setTags((values) => [
													...values,
													tagName,
												]);
												setTagName("");
											}
										}}
										value={tagName}
										onChange={(e) =>
											setTagName(e.target.value)
										}
									></Input>
								)}
								<Button
									size="sm"
									colorScheme={"green"}
									leftIcon={<BiPlus />}
									onClick={() => setAddTag((val) => !val)}
								>
									Add Tag
								</Button>
							</Flex>
						</Flex>
					</FormControl>
				</Flex>
				<Heading mt="16" size={"md"}>
					Questions
				</Heading>
			</Flex>
		</AdminLayout>
	);
};
export default CreateQuizPage;

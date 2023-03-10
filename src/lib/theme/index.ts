import { theme as defaultTheme, ChakraTheme } from "@chakra-ui/react";

const config: ChakraTheme = {
	...defaultTheme,
	fonts: {
		...defaultTheme.fonts,
		heading: `"IBM Plex Sans",  -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
		body: `"Noto Sans JP", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
	},
	styles: {
		global: {
			"html, body": {
				color: "gray.800",
			},
		},
	},
	colors: {
		...defaultTheme.colors,
	},
};

export const colorSchemes = {};

export const theme = config;

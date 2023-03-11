import { theme as defaultTheme, ChakraTheme } from "@chakra-ui/react";

export const colorSchemes = {
	brandBlue: "#157EBF",
	brandGreen: "#02732A",
	brandLime: "#69A62D",
	brandYellow: "#D9CB04",
	brandOrange: "#F28705",
};

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
				color: "gray.700",
			},
		},
	},
	colors: {
		...defaultTheme.colors,
		...colorSchemes,
	},
};

export const theme = config;

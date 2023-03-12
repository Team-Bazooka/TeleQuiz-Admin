export const baseUrl = "http://196.189.124.159/api";
// export const baseUrl = "http://127.0.0.1:3000/api";
export const getHeader = (token: string) => ({
	headers: {
		auth: `Bearer ${token}`,
	},
});

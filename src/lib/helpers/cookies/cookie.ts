import { IUser } from "$lib/stores/user";
import { IronSessionOptions } from "iron-session";
import { withIronSessionApiRoute, withIronSessionSsr } from "iron-session/next";
import {
	GetServerSidePropsContext,
	GetServerSidePropsResult,
	NextApiHandler,
} from "next";

export const cookieConfig: IronSessionOptions = {
	cookieName: "APP_SESSION",
	password: process.env.COOKIE_PASSWORD || "RANDOM",
	cookieOptions: {
		secure: process.env.NODE_ENV === "production" ? true : false,
	},
};

export const withSessionApi = (handler: NextApiHandler) => {
	return withIronSessionApiRoute(handler, cookieConfig);
};

export function withSessionSsr(
	handler: (context: GetServerSidePropsContext) => any
) {
	return withIronSessionSsr(handler, cookieConfig);
}

export const withSessionMiddleware = (handler: NextApiHandler) => {};

declare module "iron-session" {
	interface IronSessionData {
		user: IUser;
	}
}

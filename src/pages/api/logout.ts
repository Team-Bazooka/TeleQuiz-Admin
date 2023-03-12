import { cookieConfig } from "$lib/helpers/cookies/cookie";
import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";

export default withIronSessionApiRoute(async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === "POST") {
		await req.session.destroy();
		return res.json({ msg: "Logged Out" });
	}
},
cookieConfig);

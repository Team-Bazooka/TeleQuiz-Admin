import { baseUrl } from "$lib/helpers/api/config";
import { cookieConfig } from "$lib/helpers/cookies/cookie";
import axios from "axios";
import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";

export default withIronSessionApiRoute(async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === "POST") {
		const { username, password } = req.body;
		const data = await axios
			.post(`${baseUrl}/admin/login`, {
				username,
				password,
			})
			.then((res) => res.data)
			.catch((err) => {
				console.log(err);
				return res.status(500).json({ msg: "Internal Error Happened" });
			});

		if (!!data?.success) {
			req.session["user"] = data.data;
			await req.session.save();
		}

		return res.json(data);
	}
},
cookieConfig);

import { NextApiRequest, NextApiResponse } from "next";
import { createUser } from "../../../lib/database";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const requestToken = req.query.code

  const clientID = process.env.NEXT_PUBLIC_GITHUB_ID;
  const clientSecret = process.env.GITHUB_SECRET;

  const tokenResponse = await fetch(`https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
    }
  })
  const tokenData = await tokenResponse.json();
  const accessToken = tokenData.access_token;

  const userResponse = await fetch(`https://api.github.com/user`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken}`,
    }
  })

  const userData = await userResponse.json()

  const { 
    name = userData.login, 
    login: githubUsername,
    avatar_url: avatarUrl,
  } = userData;

  const userId = await createUser({
    name,
    githubUsername,
    avatarUrl
  })

  return res.redirect(`/ticket/${userId}`);
}

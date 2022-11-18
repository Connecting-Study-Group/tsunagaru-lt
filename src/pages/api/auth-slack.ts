import type { NextApiRequest, NextApiResponse } from "next";
import { firebaseAdmin } from "@/lib/firebaseAdmin";
import { getUserInfo, oauthAccess } from "@/lib/slack";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // GET
  if (req.method === "GET") {
    const slackAuthCode = req.query.code;
    const redirectUri = req.query.state as string | undefined;

    if (!slackAuthCode) {
      console.warn("code query string not find.");
      res.status(400);
      return;
    }

    const userCredential = await oauthAccess(slackAuthCode as string);

    try {
      const user = await getUserInfo(
        userCredential.access_token,
        userCredential.user_id
      );
      // reference: https://openid.net/specs/openid-connect-core-1_0.html#IDToken
      const additionalClaim = {
        name: user.profile.display_name,
        picture: user.profile.image_original,
      };
      const customToken = await firebaseAdmin
        .auth()
        .createCustomToken(userCredential.user_id, additionalClaim);

      if (redirectUri) {
        const url = new URL(redirectUri);
        url.search = `t=${customToken}`;
        res.redirect(303, url.toString());
      } else {
        res.json({
          custom_token: customToken,
          user,
        });
      }
      return;
    } catch (err) {
      res
        .status(500)
        .json(err instanceof Error ? err.message : "エラーが発生しました");
      return;
    }
  } else {
    res.setHeader("Allow", "GET");
    res.status(405).end("Method Not Allowed");
    return;
  }
}

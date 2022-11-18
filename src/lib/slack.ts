import axios from "axios";
import * as qs from "querystring";

export type oauthAccessResponseType = {
  user_id: string;
  access_token: string;
  scope: string;
  team_name: string;
  team_id: string;
};

const slackClient = axios.create({
  baseURL: "https://slack.com/api",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
  transformRequest: [(data) => qs.stringify(data)],
});

// 認証情報にアクセスする
export const oauthAccess = async (
  code: string
): Promise<oauthAccessResponseType> => {
  const requestArgs = {
    client_id: process.env.NEXT_PUBLIC_SLACK_CLIENT_ID as string,
    client_secret: process.env.SLACK_CLIENT_SECRET as string,
    code,
  };

  try {
    const res = await slackClient.post<oauthAccessResponseType>(
      "oauth.access",
      requestArgs
    );
    return res.data;
  } catch (err) {
    console.warn("Slack oauth was failed.", err);
    throw new Error(
      err instanceof Error ? err.message : "Slack oauth was failed."
    );
  }
};

export type SlackUserType = {
  id: string;
  team_id: string;
  name: string;
  deleted: false;
  color: string;
  real_name: string;
  tz: string;
  tz_label: string;
  tz_offset: number;
  profile: {
    title: string;
    phone: string;
    skype: string;
    real_name: string;
    real_name_normalized: string;
    display_name: string;
    display_name_normalized: string;
    fields: unknown;
    status_text: string;
    status_emoji: string;
    status_emoji_display_info: unknown[];
    status_expiration: number;
    avatar_hash: string;
    image_original: string;
    is_custom_image: boolean;
    huddle_state: string;
    first_name: string;
    last_name: string;
    image_24: string;
    image_32: string;
    image_48: string;
    image_72: string;
    image_192: string;
    image_512: string;
    image_1024: string;
    status_text_canonical: string;
    team: string;
  };
  is_admin: boolean;
  is_owner: boolean;
  is_primary_owner: boolean;
  is_restricted: boolean;
  is_ultra_restricted: boolean;
  is_bot: boolean;
  is_app_user: boolean;
  updated: number;
  is_email_confirmed: boolean;
  has_2fa: boolean;
  who_can_share_contact_card: string;
};

// ユーザー情報を取得する
export const getUserInfo = async (token: string, userId: string) => {
  const requestArgs = {
    token,
    user: userId,
  };

  try {
    const res = await slackClient.post<{ user: SlackUserType }>(
      "users.info",
      requestArgs
    );
    return res.data.user;
  } catch (err) {
    console.warn("Slack oauth was failed.", err);
    throw new Error(
      err instanceof Error ? err.message : "Slack oauth was failed."
    );
  }
};

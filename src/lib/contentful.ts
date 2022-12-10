import { createClient } from "contentful-management"

const client = createClient({
  // This is the access token for this space. Normally you get the token in the Contentful web app
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN as string,
})

export default client

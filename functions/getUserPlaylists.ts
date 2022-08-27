import { Handler } from "@netlify/functions";
import axios, { AxiosResponse } from "axios";

const apiKey: string = process.env.REACT_APP_API_KEY as string;
const apiAddress: string = process.env.REACT_APP_API_ADDRESS as string;

const handler: Handler = async (event, context) => {
  //variable to save response and default status code for bad userid
  let response: any = null;
  let statusCode: number = 400;

  const token = event.queryStringParameters?.token;

  //get user nickname/userID from auth0 api with the JWT
  const userResponse: AxiosResponse<any, any> = await axios.get(
    "https://playlistic.us.auth0.com/userinfo",
    { headers: { authorization: `Bearer ${token}` } }
  );
  const userID: string = userResponse.data.nickname;

  //get playlists belonging to user, userID
  await axios
    .get(apiAddress + "/getuserplaylists", {
      headers: {
        userID: userID,
        "x-api-key": apiKey,
      },
    })
    .then((success) => {
      response = success["data"];
      statusCode = 200;
    })
    .catch((error) => {
      response = error["response"]["data"];
    });

  //return result
  return { statusCode: statusCode, body: JSON.stringify(response) };
};

export { handler };

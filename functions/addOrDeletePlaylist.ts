import { Handler } from "@netlify/functions";
import axios, { AxiosResponse } from "axios";

const apiKey: string = process.env.REACT_APP_API_KEY as string;
const apiAddress: string = process.env.REACT_APP_API_ADDRESS as string;

const handler: Handler = async (event: any, context: any) => {
  //variable for status code, default is 400 error
  let statusCode: number = 400;

  const token = event.queryStringParameters?.token;
  const action = event.queryStringParameters?.action;
  const playlistID = event.queryStringParameters?.playlistID;
  const playlistName = event.queryStringParameters?.playlistName;
  const videosString = event.queryStringParameters?.videosString;

  //get user nickname/userID from auth0 api with the JWT
  const userResponse: AxiosResponse<any, any> = await axios.get(
    "https://playlistic.us.auth0.com/userinfo",
    { headers: { authorization: `Bearer ${token}` } }
  );
  const userID: string = userResponse.data.nickname;

  //variable to save response
  let response: any = null;

  //if deleting a playlist
  if (action === "Delete") {
    await axios
      .delete(apiAddress + "/deleteplaylist", {
        headers: {
          userID: userID,
          playlistID: playlistID,
          "x-api-key": apiKey,
        },
      })
      .then((success) => {
        statusCode = 200;
        response = success["data"];
      })
      .catch((error) => {
        response = error["response"]["data"];
      });

    //if adding a playlist
  } else if (action === "Add") {
    const data: {} = {};
    await axios
      .post(apiAddress + "/addplaylist", data, {
        headers: {
          userID: userID,
          playlistID: playlistID,
          videosString: videosString,
          playlistName: playlistName,
          "x-api-key": apiKey,
        },
      })
      .then((success) => {
        statusCode = 200;
        response = success["data"];
      })
      .catch((error) => {
        response = error["response"]["data"];
      });
  }

  //return response from API call
  return {
    statusCode: statusCode,
    "Access-Control-Allow-Origin": "*",
    body: JSON.stringify(response),
  };
};

export { handler };

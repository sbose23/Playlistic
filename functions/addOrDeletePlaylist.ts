import { Handler } from "@netlify/functions";
import axios, { AxiosResponse } from "axios";
const { NetlifyJwtVerifier } = require("@serverless-jwt/netlify");

const apiKey: string = process.env.REACT_APP_API_KEY as string;
const apiAddress: string = process.env.REACT_APP_API_ADDRESS as string;

//JWT verifier. if the JWT passed in as an authorization header is not verified, this function cannot execute
const verifyJwt = NetlifyJwtVerifier({
  issuer: "https://playlistic.us.auth0.com/",
  audience: "https://playlisticauthapi/",
});

const handler: Handler = verifyJwt(async (event: any, context: any) => {
  //variable for status code, default is 400 error
  let statusCode: number = 400;

  const headers = event["headers"];

  //get variables from header
  const token: string = headers["authorization"]?.split(" ")[1];
  const action: string = headers["action"];
  const playlistID: string = headers["playlistid"];
  const playlistName: string = headers["playlistname"];
  const videosString: string = headers["videosstring"];

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
    body: JSON.stringify(response),
  };
});

export { handler };

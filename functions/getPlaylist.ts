import { Handler } from "@netlify/functions";
import axios from "axios";

const apiKey: string = process.env.REACT_APP_API_KEY as string;
const apiAddress: string = process.env.REACT_APP_API_ADDRESS as string;

const handler: Handler = async (event, context) => {
  //variables to track response, default code 400 (playlist does not exist)
  let statusCode: number = 400;
  let response: any = null;

  //get IDs from query
  const userID: string = event.queryStringParameters?.userid as string;
  const playlistID: string = event.queryStringParameters?.playlistid as string;

  //make request, if success (response code 200 from API), set response to data (videos)
  //if error (response code 400 from API), set response to error message
  await axios
    .get(apiAddress + "/getplaylist", {
      headers: {
        userID: userID,
        "x-api-key": apiKey,
        playlistID: playlistID,
      },
    })
    .then((success) => {
      response = success["data"];
      statusCode = 200;
    })
    .catch((error) => {
      response = error["response"]["data"];
    });

  //return the result
  return { statusCode: statusCode, body: JSON.stringify(response) };
};

export { handler };

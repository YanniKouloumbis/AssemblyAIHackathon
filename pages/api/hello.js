//convert the above code into a next js api route
import axios from 'axios';
const apiKey = 'c9a8518423044acbab92d8dace067c70';
export default async function handler(req, res) {
  try {
    const response = await axios.post('https://api.assemblyai.com/v2/realtime/token', // use account token to get a temp user token
      { expires_in: 3600 }, // can set a TTL timer in seconds.
      { headers: { authorization: apiKey } }); // AssemblyAI API Key goes here
    const { data } = response;
    res.status(200).json(data);
  } catch (error) {
    const { response } = error;
    const { status, data } = response;
    res.status(status).json(data);
  }
}
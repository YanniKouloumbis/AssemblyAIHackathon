import { Flex, Avatar, Spinner, Button } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
const { Configuration, OpenAIApi } = require("openai");
import Divider from "../components/Divider";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Messages from "../components/Messages";
import {WordReveal, Reveal, CharacterReveal} from 'react-text-reveal';

function getTranscriptInTimeWindow(transcriptDict, currentTime, window) {
  let windowStart = currentTime - window;
  let windowEnd = currentTime + window;
  let sentences = [];
  transcriptDict["transcript"]["sentences"].forEach(sentence => {
    if (sentence["start"] >= windowStart && sentence["end"] <= windowEnd) {
      sentences.push(sentence);
    }
  });
  return { "transcript": { "sentences": sentences } };
}
function removeWordsFromTranscript(transcriptDict) {
  transcriptDict["transcript"]["sentences"].forEach(sentence => {
    delete sentence["words"];
  });
  return transcriptDict;
}

const Chat = ({transcript, progressRef, isPaused}) => {
  const configuration = new Configuration({
    apiKey: "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",
  });
  const openai = new OpenAIApi(configuration);  
  const [messages, setMessages] = useState([
    { from: "computer", text: "Hi, I'm Pupil.AI, your personal learning assistant. Please pause the video and ask me a question any time!" },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [canPlay, setCanPlay] = useState(false);
  const [loading, setLoading] = useState(false);
  const [videoContext, setVideoContext] = useState("")

  //TRIGGERS ON PAUSE
  useEffect(() => {
    if(isPaused){
      console.log('paused att ' + progressRef.current)
      
      setVideoContext(getTranscriptInTimeWindow(transcript, progressRef.current*1000, 20000)['transcript']['sentences'])
      console.log(videoContext)
      setMessages((old) => [...old, { from: "computer", text: "Have any questions?" }]);
    }
  }, [isPaused]);
  

  const handleSendMessage =  async () => {
    if (!inputMessage.trim().length) {
      return;
    }
    const data = inputMessage;
    setMessages((old) => [...old, { from: "me", text: data }]);
    setInputMessage("");
    setLoading(true);
    //MAKE THE API CALL HERE!!!
    //const data = await openai(dfsfds), cohere
    const answer = await requestResearcherResponse(inputMessage)
    setMessages((old) => [...old, { from: "computer", text: answer }]);
    setLoading(false);
    // setTimeout(() => {
      
    //   //MAKE THE API CALL HERE!!!
    //   setMessages((old) => [...old, { from: "computer", text: data }]);
    //   setLoading(false);
    // }, 1000);
  };
  async function requestResearcherResponse(question) {
    //GTP3 OpenAI Call
    //set researcherResponse to the response from GPT3
    //multiline string
    const prompt = `You are an knowing god responding to an inquiry by a single user, who wants to learn more
    about a particular aspect of a video. The user is currently ${progressRef.current} milliseconds into the video. Below is the transcript of the surrounding portion of the video:

    Transcript:
    ${videoContext}

    Below is the question, please answer it in JSON format. Only answer the question asked. Answer as
    specifically as possible. Prioritize direct answers in displaying information.
    
    {"question": "${question}", "answer":`;
  
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt,
        temperature: 0.7,
        max_tokens: 1400,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });
      //expected response: "answer from AI \n sadfsadfasfsf \n"}
      //create a variable called result that extracts from first right bracket and removes the quotes.
        let result = response.data.choices[0].text.split("}")[0];
        //stripe starting and ending spaces
        result = result.trim();
        result = result.substring(1, result.length-1);
        //remove all new lines
        result = result.replace(/\\n/g, "");
        //replace all spaces with a single space
        result = result.replace(/\s+/g, " ");
        //return  {answer: result}
        return result;
  }
  

  return (
    <Flex w="100%" h="100vh" justify="center" align="center">
      <Flex w={["100%", "100%", "40%"]} h="90%" flexDir="column">
        <Messages messages={messages} loading={loading} />
        <Divider />
        <Footer
          inputMessage={inputMessage}
          setInputMessage={setInputMessage}
          handleSendMessage={handleSendMessage}
        />
      </Flex>
    </Flex>
  );
};




export default Chat;

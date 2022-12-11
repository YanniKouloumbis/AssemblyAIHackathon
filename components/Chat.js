import { Flex, Avatar, Spinner, Button, Box } from "@chakra-ui/react";
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
    { from: "computer", text: "Hi! I'm Pupil.ai, your personal learning assistant. Please pause the video and ask me a question any time!" },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [canPlay, setCanPlay] = useState(false);
  const [loading, setLoading] = useState(false);
  const [videoContext, setVideoContext] = useState("")

  //TRIGGERS ON PAUSE
  useEffect(() => {
    if(isPaused){
      console.log('paused att ' + progressRef.current)
      
      setVideoContext(getTranscriptInTimeWindow(transcript, progressRef.current*1000, 30000)['transcript']['sentences'])
      console.log(videoContext)
      // if last message is from computer, don't add a new one
      if (messages[messages.length - 1]['from'] != "computer" || messages.length == 1) {
        console.log(messages[messages.length - 1])
        setMessages((old) => [...old, { from: "computer", text: "I see you've paused, have any questions?" }]);
      }
    }
  }, [isPaused]);
<<<<<<< HEAD
  
=======


>>>>>>> 14be18fc58df1b115acb0114fcb983cf751a6350
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
    const prompt = `You are educational assistant responding to an inquiry by a single student, who has a question about a particular aspect of a video. The user is currently ${progressRef.current} seconds into the video. Use the transcript and your own knowledge to answer the student's question. Below is the transcript of the surrounding portion of the video:

    Transcript: (List of sentence objects with start and end times in milliseconds)
    ${JSON.stringify(videoContext)}

    Below is the question, please answer it in JSON format. Only answer the question asked. Answer as
    specifically as possible. Prioritize direct answers in displaying information.
    
    {"question": "${question}", "answer":`;
    console.log(prompt)
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
    <Flex w="100%" h="100vh" bg="white" alignItems="center" justify={"center"} p={3} flexDir="column">
      <Flex w="100%" borderWidth={1} borderColor={"gray.100"} borderRadius={4} shadow={"sm"} flexDir="column">
        <Messages messages={messages} loading={loading} />
        {/* <Divider /> */}
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

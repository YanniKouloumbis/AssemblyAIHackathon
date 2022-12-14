import { HStack, Box, Center, SimpleGrid, Spinner, VStack, Text, Spacer, Flex } from '@chakra-ui/react';
import ReactPlayer from 'react-player'
import Chat from '../components/chat'
import { useRouter } from 'next/router'
import React, { useState, useEffect, useRef } from "react";


// Render a YouTube video player
//<ReactPlayer url='https://www.youtube.com/watch?v=ysz5S6PUM-U' />
function getVideoID(videoUrl) {
  // Get the video ID from the URL
  const videoId = videoUrl.split("?v=")[1];
  return videoId;
}
function removeWordsFromTranscript(transcriptDict) {
  transcriptDict["transcript"]["sentences"].forEach(sentence => {
    delete sentence["words"];
  });
  return transcriptDict;
}

export default function Home() {
  const [loadingTranscript, setLoadingTranscript] = useState(true);
  const [transcript, setTranscript] = useState([])
  const [paused, setPaused] = useState(false)
  const router = useRouter()
  const url = router.query.url


  useEffect(() => {
    if(router.isReady){
      console.log(getVideoID(router.query.url))
      fetch(`https://pupil.nolanclement.repl.co/transcript/${getVideoID(url)}`)
      .then(response => response.json())
      .then(data => {
        setTranscript(removeWordsFromTranscript(data));
        setLoadingTranscript(false);
      })
      .catch(error => {
        console.error(error);
      });
    }
  }, [router.isReady]);
  //useRef called progressRef
  const progressRef = useRef();
  //"http://example.com/index.html?url=" + encodeURIComponent(myUrl);
  return (
    // <VStack>
    // <HStack>
    //     <div className="player-wrapper">
    //     <ReactPlayer url={url} controls={true}
    //       className="react-player"
          
    //       onProgress={e => {
    //         progressRef.current = e.playedSeconds;
    //       }}
    //       onPause={e => {
    //         setPaused(true)
    //       }}
    //       onPlay={e => {
    //         setPaused(false)
    //       }}
    //       //access through progressRef.current, send that down to chat component
    //       //MAKE SURE TO USE progressRef.current
    //       ></ReactPlayer >
    //     </div>
    //     <Chat transcript={transcript} progressRef={progressRef} isPaused={paused} />
    // </HStack>
    // {loadingTranscript ? (
    //     <Spinner></Spinner>
    //     ) : (
    //       <Text>Transcript Ready</Text>
    //     )}
    // </VStack>);
    <Flex color='white'>
  <Center w='100%' h='100%'>
   <div className="player-wrapper">
         <ReactPlayer url={url} controls={true}
           className="react-player"
           onProgress={e => {
             progressRef.current = e.playedSeconds;
           }}
           onPause={e => {
             setPaused(true)
           }}
           onPlay={e => {
             setPaused(false)
           }}
           //access through progressRef.current, send that down to chat component
           //MAKE SURE TO USE progressRef.current
           ></ReactPlayer >
         </div> 
         <Chat transcript={transcript} progressRef={progressRef} isPaused={paused} />
  </Center>
    
  
</Flex>
  );
}

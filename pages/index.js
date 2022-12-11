import { HStack, Box, Center, SimpleGrid } from '@chakra-ui/react';
import ReactPlayer from 'react-player'
import Chat from '../components/chat'
import dynamic from 'next/dynamic'
//import RealTimeTranscript from '../components/realTimeTranscript'

// Render a YouTube video player
//<ReactPlayer url='https://www.youtube.com/watch?v=ysz5S6PUM-U' />

export default function Home() {
//Chakra UI chat component
  // const {query} = pageProps;
  // const url =  decodeURIComponent(query.url);
  const RealTimeTranscript = dynamic(() => import('../components/realTimeTranscript'), { ssr: false });
  //var myOtherUrl = 
  //"http://example.com/index.html?url=" + encodeURIComponent(myUrl);
  return (
    <HStack>
        {/* <ReactPlayer url='https://www.youtube.com/watch?v=ysz5S6PUM-U' /> */}
        <Chat />
        <RealTimeTranscript/>
    </HStack>);
}

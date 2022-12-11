import { HStack, Box, Center, SimpleGrid } from '@chakra-ui/react';
import ReactPlayer from 'react-player'
import Chat from '../components/chat'
// Render a YouTube video player
//<ReactPlayer url='https://www.youtube.com/watch?v=ysz5S6PUM-U' />

export default function Home(pageProps) {
//Chakra UI chat component
  // const {query} = pageProps;
  // const url =  decodeURIComponent(query.url);

  //var myOtherUrl = 
  //"http://example.com/index.html?url=" + encodeURIComponent(myUrl);
  return (
    <HStack>
        {/* <ReactPlayer url='https://www.youtube.com/watch?v=ysz5S6PUM-U' /> */}
        <Chat />
    </HStack>);
}

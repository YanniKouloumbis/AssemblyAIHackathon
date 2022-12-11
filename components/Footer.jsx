import React from "react";
import { Flex, Input, Button } from "@chakra-ui/react";

const Footer = ({ inputMessage, setInputMessage, handleSendMessage }) => {
  return (
    <Flex w="100%" mt="5">
      <Input
        placeholder="Type Something..."
        border="1px solid"
        borderLeftRadius={3}
        borderRightRadius={0}
        //light gray border
        _focus={{
          border: ".5px solid ",
        }}
        onKeyPress={async (e) => {
          if (e.key === "Enter") {
            await handleSendMessage();
          }
        }}
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
      />
      <Button
        bg="black"
        color="white"
        borderLeftRadius={1}
        borderRightRadius={3}
        border="1px solid black"
        //on hover, change color to white
        _hover={{
          bg: "white",
          color: "black",
        }}
        disabled={inputMessage.trim().length <= 0}
        onClick={async () => await handleSendMessage()}
      >
        Ask
      </Button>
    </Flex>
  );
};

export default Footer;

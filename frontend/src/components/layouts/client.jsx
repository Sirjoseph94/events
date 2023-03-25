import { Outlet } from "react-router-dom";
import {
  Box,
  Flex,
  Avatar,
  Container,
  Center,
  Spacer,
  Heading,
} from "@chakra-ui/react";

function Client() {
  return (
    <>
      <Flex as="nav" alignItems="center" bg="purple" p="10px">
        <Heading color="#fff">Eventify</Heading>
        <Spacer />
        <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
      </Flex>
      
        <Outlet />

        <Box
          w="100%"
          p="10px"
          bg="purple.500"
          color="gray.100"
          bottom={0}
          left={0}
        >
          <Center>
            <h2>footer div</h2>
          </Center>
        </Box>
    </>
  );
}

export default Client;

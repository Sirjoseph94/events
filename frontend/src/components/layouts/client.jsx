import { Outlet } from "react-router-dom";
import { Box, Flex, Avatar, Container, Center, AvatarBadge } from "@chakra-ui/react";

function Client() {
  return (
    <div>
      <Flex
        bg="#3B185F"
        justify="space-between"
        color="#fff"
      >
        <AvatarBadge></AvatarBadge>
        <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
        <Center>
          <h1>Eventify</h1>
        </Center>
      </Flex>
      <Container>
        <Outlet />
      </Container>
      <Box>
        <Center>
          <h2>footer div</h2>
        </Center>
      </Box>
    </div>
  );
}

export default Client;

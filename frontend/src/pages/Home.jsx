import { Box, Flex, Container, Button, Center } from "@chakra-ui/react";
import EventCard from "../components/EventCard";

export default function home() {
  return (
    <Box as="div" bg="gray.100">
      <Center>
        <Flex direction="column">
          <EventCard />
          <EventCard />
          <EventCard />
          <EventCard />
        </Flex>
      </Center>
    </Box>
  );
}

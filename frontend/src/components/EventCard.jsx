import {
  Card,
  CardBody,
  Stack,
  Flex,
  Heading,
  Text,
  CardFooter,
  ButtonGroup,
  Button,
  Center,
} from "@chakra-ui/react";

export default function EventCard() {
  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="outline"
      my="15px"
    >
      <Flex
        w="200px"
        bgColor="purple"
        color="white"
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Text fontSize="5xl">7</Text>
        <Text fontSize="lg">Oct, 2023</Text>
      </Flex>

      <Stack>
        <CardBody>
          <Heading size="md">The perfect latte</Heading>

          <Text py="2">
            Caffè latte is a coffee beverage of Italian origin made with
            espresso and steamed milk.
          </Text>
          
        </CardBody>

        <CardFooter>
          <ButtonGroup variant="ghost">
            <Button colorScheme="purple">View Event</Button>
            <Button colorScheme="purple">Register</Button>
          </ButtonGroup>
        </CardFooter>
      </Stack>
    </Card>
  );
}

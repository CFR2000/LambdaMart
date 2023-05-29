import React from "react";
import { Flex, Container, Heading, Stack, Text } from "@chakra-ui/react";

type CallToActionProps = {
  heading: string | string[];
  text: string;
  button: React.ReactNode;
  image: React.ReactElement;
};

const CallToAction: React.FC<CallToActionProps> = ({
  heading,
  text,
  button,
  image,
  ...rest
}) => (
  <Container maxW={"5xl"} {...rest}>
    <Stack
      textAlign={"center"}
      align={"center"}
      spacing={{ base: 8, md: 10 }}
      py={{ base: 20, md: 28 }}
    >
      <Heading
        fontWeight={600}
        fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
        lineHeight={"110%"}
      >
        {Array.isArray(heading) ? (
          <>
            {heading[0]}
            <Text as={"span"} color={"orange.400"}>
              {heading[1]}
            </Text>
          </>
        ) : (
          heading
        )}
      </Heading>
      <Text color={"gray.500"} maxW={"3xl"}>
        {text}
      </Text>
      <Stack spacing={6} direction={"row"}>
        {button}
      </Stack>
      <Flex w={"full"}>{image}</Flex>
    </Stack>
  </Container>
);

export default CallToAction;
// <a href="https://storyset.com/web">Web illustrations by Storyset</a>

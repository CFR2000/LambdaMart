/**
 * https://chakra-templates.dev/page-sections/footer
 */
import React from "react";
import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  useColorModeValue,
  useToast,
  VisuallyHidden,
} from "@chakra-ui/react";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { ReactNode } from "react";

const SocialButton = ({
  children,
  label,
  href,
}: {
  children: ReactNode;
  label: string;
  href: string;
}) => {
  const toast = useToast();

  return (
    <chakra.button
      bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
      rounded={"full"}
      w={8}
      h={8}
      cursor={"pointer"}
      onClick={() =>
        toast({
          title: "This is a demo site. Social links are disabled.",
          description:
            "I mean come on, you can't expect me to actually have a social media presence.",
          status: "info",
          duration: 9000,
          isClosable: true,
        })
      }
      as={"a"}
      href={href}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      _hover={{
        bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

const Footer = ({ copyright }: { copyright: string }) => (
  <Box
    bg={useColorModeValue("gray.50", "gray.900")}
    color={useColorModeValue("gray.700", "gray.200")}
  >
    <Container
      as={Stack}
      maxW={"7xl"}
      py={4}
      direction={{ base: "column", md: "row" }}
      spacing={4}
      justify={{ base: "center", md: "space-between" }}
      align={{ base: "center", md: "center" }}
    >
      <Text>{copyright}</Text>
      <Stack direction={"row"} spacing={6}>
        <SocialButton label={"Twitter"} href={"#"}>
          <FaTwitter />
        </SocialButton>
        <SocialButton label={"YouTube"} href={"#"}>
          <FaYoutube />
        </SocialButton>
        <SocialButton label={"Instagram"} href={"#"}>
          <FaInstagram />
        </SocialButton>
      </Stack>
    </Container>
  </Box>
);

export default Footer;

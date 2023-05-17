import React from "react";
import { Link } from "gatsby";
import {
  useColorMode,
  useColorModeValue,
  useDisclosure,
  chakra,
  Link as ChakraLink,
  VStack,
  CloseButton,
  Button,
  Flex,
  HStack,
  Spacer,
  IconButton,
  Box,
} from "@chakra-ui/react";
import { useViewportScroll } from "framer-motion";
import { FaSun, FaMoon } from "react-icons/fa";
import { AiFillHome, AiOutlineMenu } from "react-icons/ai";
import { BsFillCameraVideoFill } from "react-icons/bs";
import { StaticImage } from "gatsby-plugin-image";
import useScrollUp from "../../../hooks/useScrollUp";

const logo = (
  <StaticImage
    src="../../../images/Lambda.png"
    alt="Logo for lambda-mart"
    placeholder="blurred"
    layout="fixed"
    height={30}
  />
);

const Header: React.FC = () => {
  const { toggleColorMode: toggleMode } = useColorMode();
  const text = useColorModeValue("dark", "light");
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);
  const bg = useColorModeValue("white", "gray.800");
  const isScrollUp = useScrollUp();
  const cl = useColorModeValue("gray.800", "white");
  const mobileNav = useDisclosure();

  const MobileNavContent: React.ReactNode = (
    <VStack
      pos="absolute"
      top={0}
      left={0}
      right={0}
      display={mobileNav.isOpen ? "flex" : "none"}
      flexDirection="column"
      p={2}
      pb={4}
      m={2}
      bg={bg}
      spacing={3}
      rounded="sm"
      shadow="sm"
    >
      <CloseButton
        aria-label="Close menu"
        justifySelf="self-start"
        onClick={mobileNav.onClose}
      />
      <Button w="full" variant="ghost" leftIcon={<AiFillHome />}>
        Store
      </Button>
      <Button w="full" variant="ghost" leftIcon={<BsFillCameraVideoFill />}>
        Vendors
      </Button>
    </VStack>
  );

  return (
    <Box height="4.5rem">
      <chakra.header
        shadow={isScrollUp ? "md" : undefined}
        // TODO: Figure out how to get this to work properly
        // position="sticky"
        transition="box-shadow 0.2s"
        bg={bg}
        w="full"
        overflowY="hidden"
      >
        <chakra.div h="4.5rem" mx="auto" maxW="1200px">
          <Flex
            w="full"
            h="full"
            px="6"
            alignItems="center"
            justifyContent="space-between"
          >
            <Flex align="flex-start">
              <ChakraLink as={Link} to="/">
                <HStack>{logo}</HStack>
              </ChakraLink>
            </Flex>
            <Flex>
              <HStack
                spacing="5"
                paddingInline="5"
                display={{
                  base: "none",
                  md: "flex",
                }}
              >
                <Button
                  bg={bg}
                  color="gray.500"
                  display="inline-flex"
                  alignItems="center"
                  fontSize="md"
                  _hover={{
                    color: cl,
                  }}
                  _focus={{
                    boxShadow: "none",
                  }}
                >
                  Store
                </Button>
                <Button
                  bg={bg}
                  color="gray.500"
                  display="inline-flex"
                  alignItems="center"
                  fontSize="md"
                  _hover={{
                    color: cl,
                  }}
                  _focus={{
                    boxShadow: "none",
                  }}
                >
                  Vendors
                </Button>
              </HStack>
            </Flex>
            <Spacer />
            <Flex justify="flex-end" align="center" color="gray.400">
              <HStack
                spacing="5"
                display={{
                  base: "none",
                  md: "flex",
                }}
              >
                <Button colorScheme="brand" variant="ghost" size="sm">
                  Sign in
                </Button>
                <Button colorScheme="brand" variant="solid" size="sm">
                  Sign up
                </Button>
              </HStack>
              <IconButton
                size="md"
                fontSize="lg"
                aria-label={`Switch to ${text} mode`}
                variant="ghost"
                color="current"
                ml={{
                  base: "0",
                  md: "3",
                }}
                onClick={toggleMode}
                icon={<SwitchIcon />}
              />
              <IconButton
                display={{
                  base: "flex",
                  md: "none",
                }}
                aria-label="Open menu"
                fontSize="20px"
                color="gray.800"
                _dark={{
                  color: "inherit",
                }}
                variant="ghost"
                icon={<AiOutlineMenu />}
                onClick={mobileNav.onOpen}
              />
            </Flex>
          </Flex>
          {MobileNavContent}
        </chakra.div>
      </chakra.header>
    </Box>
  );
};

export default Header;

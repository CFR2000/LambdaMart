import React from "react";
import { Link as GatsbyLink } from "gatsby";
import {
  useColorMode,
  useColorModeValue,
  useDisclosure,
  chakra,
  Link,
  VStack,
  CloseButton,
  Button,
  Flex,
  HStack,
  Spacer,
  IconButton,
  Box,
  Card,
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
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);
  const isScrollUp = useScrollUp();
  const mobileNav = useDisclosure();

  const MobileNavContent: React.FC = () => (
    <Card
      pos="fixed"
      top={mobileNav.isOpen ? "4.5rem" : "-8rem"}
      left={0}
      right={0}
      variant="elevated"
      colorScheme="primary"
      align="center"
      transition="all 0.3s"
    >
      <CloseButton
        aria-label="Close menu"
        justifySelf="self-start"
        onClick={mobileNav.onClose}
      />
      <Button
        as={GatsbyLink}
        to="/products"
        w="full"
        variant="ghost"
        leftIcon={<AiFillHome />}
      >
        Store
      </Button>
      <Button
        as={GatsbyLink}
        to="/vendors"
        w="full"
        variant="ghost"
        leftIcon={<BsFillCameraVideoFill />}
      >
        Vendors
      </Button>
    </Card>
  );

  return (
    <>
      <Card
        height="4.5rem"
        position="fixed"
        zIndex="100"
        w="100%"
        top={isScrollUp ? "-4.5rem" : "0"}
        overflowY="hidden"
        variant="filled"
        borderRadius="0"
        transition="all 0.3s"
      >
        <chakra.header h="100%" w="full">
          <Flex
            w="full"
            maxW={"7xl"}
            mx="auto"
            h="full"
            px="6"
            alignItems="center"
            justifyContent="space-between"
          >
            <Flex align="flex-start">
              <Link as={GatsbyLink} to="/">
                <HStack>{logo}</HStack>
              </Link>
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
                <Link
                  as={GatsbyLink}
                  to="/products"
                  colorScheme="gray"
                  display="inline-flex"
                  alignItems="center"
                  fontSize="md"
                >
                  Store
                </Link>
                <Link
                  as={GatsbyLink}
                  to="/vendors"
                  colorScheme="gray"
                  display="inline-flex"
                  alignItems="center"
                  fontSize="md"
                >
                  Vendors
                </Link>
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
                <Button colorScheme="primary" variant="ghost" size="sm">
                  Sign in
                </Button>
                <Button colorScheme="primary" variant="solid" size="sm">
                  Sign up
                </Button>
              </HStack>
              <IconButton
                size="md"
                fontSize="lg"
                aria-label={`Switch colour mode`}
                variant="ghost"
                colorScheme="primary"
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
          <MobileNavContent />
        </chakra.header>
      </Card>
      <Box h="4.5rem" />
    </>
  );
};

export default Header;

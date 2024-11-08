import { Box, Flex, Link } from "@chakra-ui/react";

const Nav = ({ isAuth }: { isAuth: boolean }) => {
  return (
    <Box as="nav" bg="gray.800" px={4} py={3}>
      <Flex
        maxW="container.xl"
        mx="auto"
        align="center"
        justify="flex-end"
        gap={6}
      >
        <Link
          href="/"
          color="white"
          _hover={{ color: "blue.200" }}
          fontWeight="medium"
        >
          Home
        </Link>
        {isAuth && (
          <Link
            href="/characters"
            color="white"
            _hover={{ color: "blue.200" }}
            fontWeight="medium"
          >
            Characters
          </Link>
        )}
        <Link
          href={"/information"}
          color="white"
          _hover={{ color: "blue.200" }}
          fontWeight="medium"
        >
          Information
        </Link>
        {!isAuth && (
          <Link
            href={"/login"}
            color="white"
            _hover={{ color: "blue.200" }}
            fontWeight="medium"
          >
            Login
          </Link>
        )}
      </Flex>
    </Box>
  );
};

export default Nav;

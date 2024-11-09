import { Box, Container, Flex, Link, Text } from "@chakra-ui/react";

interface NavProps {
  isAuth: boolean;
  username?: string;
  jobTitle?: string;
}
const Nav = ({ isAuth, username, jobTitle }: NavProps) => {
  return (
    <Box as="nav" bg="gray.800" px={4} py={3}>
      <Container>
        <Flex
          maxW="container.xl"
          mx="auto"
          align="center"
          justify="flex-start"
          gap={[2, 4]}
          flexWrap={{ base: "wrap", md: "nowrap" }}
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
            href={"/profile"}
            color="white"
            _hover={{ color: "blue.200" }}
            fontWeight="medium"
          >
            Profile
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
          {isAuth && (
            <Box
              display={{ base: "block", md: "flex" }}
              justifyContent="flex-end"
              color="teal.50"
              fontSize="sm"
              mt={{ base: 0, md: "auto" }}
              ml={{ base: 0, md: "auto" }}
              width={{ base: "full", md: "auto" }}
            >
              <Text>
                Welcome, {username} - {jobTitle}
              </Text>
            </Box>
          )}
        </Flex>
      </Container>
    </Box>
  );
};

export default Nav;

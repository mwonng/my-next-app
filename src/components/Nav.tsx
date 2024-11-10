import { Box, Container, Flex, Link, Text } from "@chakra-ui/react";

interface NavProps {
  isAuth: boolean;
  username?: string;
  jobTitle?: string;
  currentPath?: string;
}

const Nav = ({ isAuth, username, jobTitle, currentPath = "" }: NavProps) => {
  return (
    <Box
      as="nav"
      bg="gray.800"
      px={4}
      py={3}
      role="navigation"
      aria-label="Main navigation"
    >
      <Container>
        <Flex
          maxW="container.xl"
          mx="auto"
          align="center"
          justify="flex-start"
          gap={[2, 4]}
          flexWrap={{ base: "wrap", md: "nowrap" }}
          as="ul"
          listStyleType="none"
          role="menubar"
        >
          <Box as="li" role="none">
            <Link
              href="/"
              color="white"
              _hover={{ color: "blue.200" }}
              fontWeight="medium"
              aria-current={currentPath === "/" ? "page" : undefined}
              role="menuitem"
            >
              Home
            </Link>
          </Box>

          {isAuth && (
            <Box as="li" role="none">
              <Link
                href="/characters"
                color="white"
                _hover={{ color: "blue.200" }}
                fontWeight="medium"
                aria-current={
                  currentPath === "/characters" ? "page" : undefined
                }
                role="menuitem"
              >
                Characters
              </Link>
            </Box>
          )}

          <Box as="li" role="none">
            <Link
              href="/profile"
              color="white"
              _hover={{ color: "blue.200" }}
              fontWeight="medium"
              aria-current={currentPath === "/profile" ? "page" : undefined}
              role="menuitem"
            >
              Profile
            </Link>
          </Box>

          {!isAuth && (
            <Box as="li" role="none">
              <Link
                href="/login"
                color="white"
                _hover={{ color: "blue.200" }}
                fontWeight="medium"
                aria-current={currentPath === "/login" ? "page" : undefined}
                role="menuitem"
              >
                Login
              </Link>
            </Box>
          )}

          {isAuth && (
            <Box
              as="li"
              role="none"
              display={{ base: "block", md: "flex" }}
              justifyContent="flex-end"
              color="teal.50"
              fontSize="sm"
              mt={{ base: 0, md: "auto" }}
              ml={{ base: 0, md: "auto" }}
              width={{ base: "full", md: "auto" }}
            >
              <Text aria-label={`Logged in as ${username}, ${jobTitle}`}>
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

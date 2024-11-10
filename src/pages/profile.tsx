import { GetServerSideProps } from "next";
import { useRouter } from "next/navigation";
import nookies from "nookies";
import { useCallback, useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  Center,
  Container,
  Heading,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { toaster } from "@/components/ui/toaster";
import Layout from "@/components/PagesLayout";
import { getAuthServerSide } from "@/lib/dataFetch";

interface ProtectedPageProps {
  username: string;
  jobTitle: string;
  isAuth: boolean;
}

export default function ProtectedPage({
  username: initialUsername,
  jobTitle: initialJobTitle,
  isAuth,
}: ProtectedPageProps) {
  const router = useRouter();
  const [username, setUsername] = useState(initialUsername);
  const [jobTitle, setJobTitle] = useState(initialJobTitle);

  const handleJobTitleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setJobTitle(e.target.value);
      nookies.set(null, "jobTitle", e.target.value, { path: "/" });
    },
    []
  );

  const handleUsernameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setUsername(e.target.value);
      nookies.set(null, "username", e.target.value, { path: "/" });
    },
    []
  );

  const handleLogout = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      nookies.destroy(null, "username");
      nookies.destroy(null, "jobTitle");
      router.push("/login");
    },
    [router]
  );

  useEffect(() => {
    if (!username || !jobTitle) {
      return router.push("/login");
    }
    toaster.create({
      description: "You are authorized to view this page.",
      type: "success",
      duration: 3000,
    });
  }, [jobTitle, router, username]);

  return (
    <Layout isAuth={isAuth} username={username} jobTitle={jobTitle}>
      <Container pt={8} as="main">
        <Stack px={4} textAlign={{ base: "left", md: "center" }}>
          <Heading size="2xl" as="h1">
            This is a protected page.
          </Heading>
          <Text>
            You can only view this page if you have username and job title in
            your cookies.
          </Text>
        </Stack>
        <Center maxW="container.md" py={10}>
          <Card.Root
            width="320px"
            as="form"
            role="form"
            aria-label="Profile Update Form"
          >
            <Card.Body gap="2">
              <Field label="Update Username">
                <Input
                  id="username"
                  name="username"
                  value={username}
                  onChange={handleUsernameChange}
                  placeholder="Enter new username"
                  aria-label="Update username"
                  aria-required="true"
                />
              </Field>

              <Field label="Update Job Title">
                <Input
                  id="jobTitle"
                  name="jobTitle"
                  value={jobTitle}
                  onChange={handleJobTitleChange}
                  placeholder="Enter new job title"
                  aria-label="Update job title"
                  aria-required="true"
                />
              </Field>

              <Box my={"2"}>
                <Button
                  type="button"
                  colorPalette="red"
                  variant="solid"
                  size="lg"
                  w="full"
                  my={"2"}
                  onClick={handleLogout}
                  aria-label="Logout from your account"
                >
                  Logout
                </Button>
              </Box>
            </Card.Body>
          </Card.Root>
        </Center>
      </Container>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { isAuth, username, jobTitle } = await getAuthServerSide(context);

  if (!username || !jobTitle) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      username,
      jobTitle,
      isAuth,
    },
  };
};

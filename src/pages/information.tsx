import { GetServerSideProps } from "next";
import { useRouter } from "next/navigation";
import nookies from "nookies";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  Center,
  Heading,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { toaster } from "@/components/ui/toaster";
import Layout from "@/components/PagesLayout";
import { useAuth } from "@/lib/hooks";

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

  const handleJobTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setJobTitle(e.target.value);
    nookies.set(null, "jobTitle", e.target.value, { path: "/" });
  };
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    nookies.set(null, "username", e.target.value, { path: "/" });
  };
  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    nookies.destroy(null, "username");
    nookies.destroy(null, "jobTitle");
    router.push("/login");
  };

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
    <Layout isAuth={isAuth}>
      <Center maxW="container.md" py={10}>
        <Stack>
          <Heading size="2xl" textAlign="center">
            This is a protected page.
          </Heading>
          <Text>
            You can only view this page if you have username and job title in
          </Text>
          <Box>
            <Text mt={4}>Welcome, {username}</Text>
            <Text mt={2}>Your job title is: {jobTitle}</Text>
            <Text color="gray.600"></Text>
          </Box>

          <Card.Root width="320px">
            <Card.Body gap="2">
              <Field label="Update Username">
                <Input
                  id="username"
                  value={username}
                  onChange={handleUsernameChange}
                  placeholder="Enter new username"
                />
              </Field>

              <Field label="Update Job Title">
                <Input
                  id="jobTitle"
                  value={jobTitle}
                  onChange={handleJobTitleChange}
                  placeholder="Enter new job title"
                />
              </Field>

              <Box my={"2"}>
                <Button
                  type="submit"
                  colorPalette="red"
                  variant="solid"
                  size="lg"
                  w="full"
                  my={"2"}
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </Box>
            </Card.Body>
          </Card.Root>
        </Stack>
      </Center>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { isAuth, username, jobTitle } = useAuth(context);

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

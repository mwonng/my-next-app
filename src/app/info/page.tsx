"use client";
import { parseCookies } from "nookies";
import { useRouter } from "next/navigation";
import nookies from "nookies";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { toaster } from "@/components/ui/toaster";

export default function ProtectedPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [jobTitle, setJobTitle] = useState("");

  const handleJobTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setJobTitle(e.target.value);
    nookies.set(null, "jobTitle", e.target.value, { path: "/" });
  };
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    nookies.set(null, "username", e.target.value, { path: "/" });
  };

  useEffect(() => {
    const cookies = parseCookies();
    const isAuthorized = Boolean(cookies.username) && Boolean(cookies.jobTitle);
    if (!isAuthorized) {
      // Optionally render nothing or a loading spinner until redirect
      return router.push("/login"); // Redirect to login or any other page
    }
    setUsername(cookies.username || "");
    setJobTitle(cookies.jobTitle || "");
    toaster.create({
      description: "You are authorized to view this page.",
      type: "success",
      duration: 3000,
    });
  }, []);

  return (
    <Container maxW="container.md" py={10}>
      <Stack>
        <Box>
          <Heading size="lg">Welcome, {username}</Heading>
          <Text mt={2}>Your job title is: {jobTitle}</Text>
          <Text color="gray.600">This is a protected page.</Text>
        </Box>

        <Box>
          <Stack p={6} borderRadius="md" boxShadow="md" bg="white">
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

            <Button type="submit" colorScheme="blue" size="lg" w="full">
              Update Profile
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
}

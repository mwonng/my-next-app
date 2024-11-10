"use client";
import { useState, FormEvent } from "react";
import { Box, Button, Input, Stack, Heading, Link } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { toaster } from "@/components/ui/toaster";

import { useRouter } from "next/navigation";
import nookies from "nookies";

export default function LoginPage(): JSX.Element {
  const [username, setUsername] = useState<string>("");
  const [jobTitle, setJobTitle] = useState<string>("");
  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!username || !jobTitle) {
      toaster.create({
        description: "All fields are required.",
        type: "error",
        duration: 3000,
      });
      return;
    }

    nookies.set(null, "username", username, { path: "/" });
    nookies.set(null, "jobTitle", jobTitle, { path: "/" });

    router.push("/profile");
  };

  return (
    <Box
      as="main"
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      bg="gray.50"
      px={4}
    >
      <Box
        width={{ base: "100%", sm: "400px" }}
        p={6}
        boxShadow="lg"
        bg="white"
        borderRadius="md"
        role="region"
        aria-labelledby="login-heading"
      >
        <Heading id="login-heading" textAlign="center" mb={6} fontSize="2xl">
          Login
        </Heading>
        <form onSubmit={handleSubmit} aria-label="Login form">
          <Stack>
            <Field label="Username">
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                aria-required="true"
                autoComplete="username"
              />
            </Field>

            <Field label="Job Title">
              <Input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                aria-required="true"
                autoComplete="organization-title"
              />
            </Field>

            <Button
              type="submit"
              width="full"
              mt={4}
              aria-label="Submit login form"
            >
              Login
            </Button>
            <Link
              href="/"
              colorPalette={"teal"}
              variant={"underline"}
              width="full"
              mt={4}
              aria-label="Return to home page"
            >
              Back to Home
            </Link>
          </Stack>
        </form>
      </Box>
    </Box>
  );
}

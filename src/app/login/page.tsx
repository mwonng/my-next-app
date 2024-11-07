"use client";
import { useState, FormEvent } from "react";
import { Box, Button, Input, Stack, Heading } from "@chakra-ui/react";
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

    router.push("/info");
  };

  return (
    <Box
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
      >
        <Heading textAlign="center" mb={6} fontSize="2xl">
          Login
        </Heading>
        <form onSubmit={handleSubmit}>
          <Stack>
            <Field label="Username">
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Field>

            <Field label="Job Title">
              <Input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
              />
            </Field>

            <Button type="submit" colorScheme="teal" width="full" mt={4}>
              Login
            </Button>
          </Stack>
        </form>
      </Box>
    </Box>
  );
}

import { useRouter } from "next/router";
import { Container, Heading, Text, Button, VStack } from "@chakra-ui/react";
import Layout from "@/components/PagesLayout";

export default function ErrorPage() {
  const router = useRouter();
  const { message } = router.query;

  return (
    <Layout isAuth={false}>
      <main>
        <Container maxW="container.xl">
          <VStack
            align="center"
            py={20}
            role="alert"
            aria-labelledby="error-heading"
          >
            <Heading id="error-heading" size="2xl" tabIndex={-1}>
              Oops! Something went wrong
            </Heading>
            <Text fontSize="xl" color="red.500" aria-live="polite">
              {message ||
                "An unexpected error occurred. Please try again later."}
            </Text>
            <Button
              colorScheme="blue"
              onClick={() => router.push("/")}
              aria-label="Return to homepage"
            >
              Return to Home
            </Button>
          </VStack>
        </Container>
      </main>
    </Layout>
  );
}

import { useRouter } from "next/router";
import { Container, Heading, Text, Button, VStack } from "@chakra-ui/react";
import Layout from "@/components/PagesLayout";

export default function ErrorPage() {
  const router = useRouter();
  const { message } = router.query;

  return (
    <Layout isAuth={false}>
      <Container maxW="container.xl">
        <VStack align="center" py={20}>
          <Heading size="2xl">Oops! Something went wrong</Heading>
          <Text fontSize="xl" color="red.500">
            {message || "An unexpected error occurred"}
          </Text>
          <Button colorScheme="blue" onClick={() => router.push("/")}>
            Return to Home
          </Button>
        </VStack>
      </Container>
    </Layout>
  );
}

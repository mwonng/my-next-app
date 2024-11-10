import { GetServerSideProps } from "next";
import { getAuthServerSide } from "@/lib/dataFetch";
import Layout from "@/components/PagesLayout";
import { Button } from "@chakra-ui/react";
import { Center, Container, Card, Image, Link } from "@chakra-ui/react";

interface HomePageProps {
  isAuth: boolean;
  username?: string;
  jobTitle?: string;
}

export default function Home(props: HomePageProps) {
  return (
    <Layout {...props}>
      <Container pt={"8"}>
        <Center>
          <Card.Root width="320px">
            <Card.Body gap="2">
              <Image
                src="https://picsum.photos/500/500"
                alt="Demo"
                rounded={"md"}
              />
              <Card.Title mt="2">Demo Next.js</Card.Title>
              <Card.Description>
                Please go to any navigation link to see the demo.
              </Card.Description>
            </Card.Body>
            <Card.Footer justifyContent="flex-end">
              <Button variant="outline" asChild>
                <Link href="/characters">View list</Link>
              </Button>
              <Button asChild>
                <Link href="/profile">Protected profile</Link>
              </Button>
            </Card.Footer>
          </Card.Root>
        </Center>
      </Container>
    </Layout>
  );
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { isAuth, username, jobTitle } = await getAuthServerSide(context);

  return {
    props: {
      isAuth,
      username: username || null,
      jobTitle: jobTitle || null,
    },
  };
};

// import Image from "next/image";
// import styles from "./page.module.css";
import { Button } from "@/components/ui/button";
import { Center, Container, Card, Image } from "@chakra-ui/react";

export default function Home() {
  return (
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
            <Button variant="outline">View</Button>
            <Button>Join</Button>
          </Card.Footer>
        </Card.Root>
      </Center>
    </Container>
  );
}

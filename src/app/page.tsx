// import Image from "next/image";
// import styles from "./page.module.css";
import { Button } from "@/components/ui/button";
import { Center, Container, Card } from "@chakra-ui/react";
import { Avatar } from "@/components/ui/avatar";

export default function Home() {
  return (
    <Container pt={"8"}>
      <Center>
        <Card.Root width="320px">
          <Card.Body gap="2">
            <Avatar
              src="https://picsum.photos/200/300"
              name="Demo"
              size="lg"
              shape="rounded"
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

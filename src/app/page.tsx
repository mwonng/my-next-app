// import Image from "next/image";
// import styles from "./page.module.css";
import { Button } from "@/components/ui/button";
import { HStack, Container, Link } from "@chakra-ui/react";

export default function Home() {
  return (
    <Container>
      <HStack>
        <Button>Click me</Button>
        <Button>Click me</Button>
        <Link href="/info"> Info page</Link>
      </HStack>
    </Container>
  );
}

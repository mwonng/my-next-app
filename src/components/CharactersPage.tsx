import CharacterList from "@/components/CharacterList";
import { CharactersPageProps } from "@/components/CharacterList";
import { Container, Heading } from "@chakra-ui/react";
import Pagination from "@/components/Pagination";

export function CharactersPage(
  props: CharactersPageProps & {
    currentPage: number;
    totalPages: number;
  }
) {
  return (
    <Container maxW="container.xl">
      <Heading size="4xl" py={4}>
        Characters
      </Heading>
      <CharacterList characters={props.characters} />
      <Pagination
        currentPage={props.currentPage}
        pages={props.totalPages}
        setPage={() => {}}
        hasNextPage={true}
      />
    </Container>
  );
}

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
  if (props.characters.length === 0) {
    return <div>No characters found</div>;
  }

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

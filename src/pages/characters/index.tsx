import { GetServerSideProps } from "next";
import client from "../../lib/apollo-client";
import { ApolloProvider } from "@apollo/client";
import CharacterList from "@/components/CharacterList";
import { CharactersPageProps } from "@/components/CharacterList";
import { Container, Heading } from "@chakra-ui/react";
import { GET_CHARACTERS } from "./[page]";
import Pagination from "@/components/Pagination";

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await client.query({
    query: GET_CHARACTERS,
    variables: { page: 1 },
  });

  return {
    props: {
      characters: data.characters.results,
      totalPages: data.characters.info.pages,
      currentPage: 1,
    },
  };
};

export default function CharactersPage({
  characters,
  currentPage,
  totalPages,
}: CharactersPageProps & { currentPage: number; totalPages: number }) {
  return (
    <ApolloProvider client={client}>
      <Container maxW="container.xl">
        <Heading size="4xl">Characters (Page {currentPage})</Heading>
        <CharacterList characters={characters} />
        <Pagination
          currentPage={currentPage}
          pages={totalPages}
          setPage={() => {}}
          hasNextPage={true}
        />
      </Container>
    </ApolloProvider>
  );
}

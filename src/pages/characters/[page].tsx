import { GetServerSideProps } from "next";
import client from "../../lib/apollo-client";
import { gql } from "@apollo/client";
import { ApolloProvider } from "@apollo/client";
import CharacterList from "@/components/CharacterList";
import { CharactersPageProps } from "@/components/CharacterList";
import { Container, Heading } from "@chakra-ui/react";
import Pagination from "@/components/Pagination";

export const GET_CHARACTERS = gql`
  query GetCharacters($page: Int!) {
    characters(page: $page) {
      info {
        count
        pages
        next
        prev
      }
      results {
        name
        image
        status
        species
        type
        gender
        created
      }
    }
  }
`;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const page = parseInt(context.params?.page as string) || 1;

  const { data } = await client.query({
    query: GET_CHARACTERS,
    variables: { page },
  });

  return {
    props: {
      characters: data.characters.results,
      totalPages: data.characters.info.pages,
      currentPage: page,
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

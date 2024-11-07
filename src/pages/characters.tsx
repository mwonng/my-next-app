import { GetServerSideProps } from "next";
import client from "../lib/apollo-client";
import { gql } from "@apollo/client";
import { ApolloProvider } from "@apollo/client";
import CharacterList from "@/components/CharacterList";
import { CharactersPageProps } from "@/components/CharacterList";
import { Container, Heading } from "@chakra-ui/react";

export const GET_CHARACTERS = gql`
  query GetCharacters($page: Int!) {
    characters(page: $page) {
      info {
        count
      }
      results {
        name
        image
        gender
      }
    }
  }
`;

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await client.query({
    query: GET_CHARACTERS,
    variables: { page: 1 },
  });

  return {
    props: {
      characters: data.characters.results,
    },
  };
};

export default function CharactersPage({ characters }: CharactersPageProps) {
  return (
    <ApolloProvider client={client}>
      <Container maxW="container.xl">
        <Heading size="4xl">Characters</Heading>
        <CharacterList characters={characters} />
      </Container>
    </ApolloProvider>
  );
}

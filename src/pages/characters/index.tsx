import { GetServerSideProps } from "next";
import client, { GET_CHARACTERS } from "../../lib/apollo-client";
import CharacterList from "@/components/CharacterList";
import { CharactersPageProps } from "@/components/CharacterList";
import { Container, Heading } from "@chakra-ui/react";
import Pagination from "@/components/Pagination";
import Layout from "@/components/PagesLayout";
import { parseCookies } from "nookies";
import { useAuth } from "@/lib/hooks";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { isAuth } = useAuth(context);
  const { data } = await client.query({
    query: GET_CHARACTERS,
    variables: { page: 1 },
  });

  return {
    props: {
      characters: data.characters.results,
      totalPages: data.characters.info.pages,
      currentPage: 1,
      isAuth,
    },
  };
};

export default function CharactersPage({
  characters,
  currentPage,
  totalPages,
  isAuth,
}: CharactersPageProps & {
  currentPage: number;
  totalPages: number;
  isAuth: boolean;
}) {
  return (
    <Layout isAuth={isAuth}>
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
    </Layout>
  );
}

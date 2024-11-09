import { GetServerSideProps } from "next";
import { CharactersPageProps } from "@/components/CharacterList";
import Layout from "@/components/PagesLayout";
import { fetchCharacters } from "@/lib/dataFetch";
import { CharactersPage } from "@/components/CharactersPage";
import { AuthData, useAuthGuard } from "@/lib/hooks";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const data = await fetchCharacters(context);
  return data;
};

export default function CharactersList({
  characters,
  currentPage,
  totalPages,
  isAuth,
  username,
  jobTitle,
}: CharactersPageProps &
  AuthData & {
    currentPage: number;
    totalPages: number;
  }) {
  useAuthGuard(isAuth);

  return (
    <Layout isAuth={isAuth} username={username} jobTitle={jobTitle}>
      <CharactersPage
        characters={characters}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </Layout>
  );
}

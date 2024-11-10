import { GetServerSidePropsContext } from "next";
import client, { GET_CHARACTERS } from "./apollo-client";
import { parseCookies } from "nookies";

export interface AuthData {
  username: string | undefined;
  jobTitle: string | undefined;
  isAuth: boolean;
}

export const getAuthServerSide = (
  context: GetServerSidePropsContext
): AuthData => {
  const cookies = parseCookies(context);
  const username = cookies.username;
  const jobTitle = cookies.jobTitle;

  return {
    username,
    jobTitle,
    isAuth: !!username && !!jobTitle,
  };
};

export const fetchCharacters = async (context: GetServerSidePropsContext) => {
  try {
    const page = Number(context.params?.page) || 1;
    const { isAuth, username, jobTitle } = await getAuthServerSide(context);

    const { data } = await client.query({
      query: GET_CHARACTERS,
      variables: { page },
    });

    return {
      props: {
        characters: data.characters.results,
        totalPages: data.characters.info.pages,
        currentPage: page,
        isAuth,
        username,
        jobTitle,
      },
    };
  } catch (error) {
    // Redirect to error page with the error message
    return {
      redirect: {
        destination: `/error?message=${encodeURIComponent(
          error instanceof Error ? error.message : "An error occurred"
        )}`,
        permanent: false,
      },
    };
  }
};

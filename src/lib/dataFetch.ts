import client, { GET_CHARACTERS } from "./apollo-client";
import { useAuth } from "./hooks";

export const fetchCharacters = async (context?: any) => {
  try {
    const page = parseInt(context.params?.page as string) || 1;
    const { isAuth, username, jobTitle } = useAuth(context);

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

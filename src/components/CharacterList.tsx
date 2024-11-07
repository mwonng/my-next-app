"use client";
import { Box, Text, Image, Stack } from "@chakra-ui/react";

export interface Character {
  name: string;
  image: string;
  gender: string;
}

export interface CharactersPageProps {
  characters: Character[];
}

const CharacterList = ({ characters }: CharactersPageProps) => {
  return (
    <Box>
      <Stack>
        {characters.map((character: Character, index: number) => (
          <Box key={index} p={4} borderWidth="1px" borderRadius="md">
            <Stack direction={{ base: "column", md: "row" }}>
              <Image
                src={character.image}
                alt={character.name}
                boxSize="100px"
              />
              <Box>
                <Text fontWeight="bold">{character.name}</Text>
                <Text>Gender: {character.gender}</Text>
              </Box>
            </Stack>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default CharacterList;

"use client";
import { Box, Text, Image, Stack } from "@chakra-ui/react";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

export interface Character {
  name: string;
  image: string;
  gender: string;
  status: string;
  species: string;
  type: string;
  created: string;
}

export interface CharactersPageProps {
  characters: Character[];
}

const CharacterList = ({ characters }: CharactersPageProps) => {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null
  );

  return (
    <Stack>
      <DialogRoot>
        {characters.map((character: Character, index: number) => (
          <Box
            key={index}
            p={4}
            borderWidth="1px"
            borderRadius="md"
            cursor="pointer"
            _hover={{ bg: "gray.50" }}
            onClick={() => setSelectedCharacter(character)}
          >
            <DialogTrigger asChild>
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
            </DialogTrigger>
          </Box>
        ))}

        <DialogContent>
          <DialogHeader>{selectedCharacter?.name}</DialogHeader>
          <DialogCloseTrigger />
          <DialogBody pb={6}>
            <Stack align="center">
              <Image
                src={selectedCharacter?.image}
                alt={selectedCharacter?.name}
                boxSize="200px"
                borderRadius="lg"
              />
              <Text fontSize="md">Gender: {selectedCharacter?.gender}</Text>
              <Text fontSize="md">Status: {selectedCharacter?.status}</Text>
              <Text fontSize="md">Species: {selectedCharacter?.species}</Text>
              <Text fontSize="md">Type: {selectedCharacter?.type}</Text>
              <Text fontSize="md">
                Created at: {selectedCharacter?.created}
              </Text>
              {/* Add more character details here */}
            </Stack>
          </DialogBody>
        </DialogContent>
      </DialogRoot>
    </Stack>
  );
};

export default CharacterList;

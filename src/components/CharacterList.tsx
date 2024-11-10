"use client";
import { Box, Text, Image, Stack, Skeleton } from "@chakra-ui/react";
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
    <Stack as="section" aria-label="Character List">
      <DialogRoot>
        {characters.map((character: Character) => (
          <Box
            key={character.name}
            p={4}
            borderWidth="1px"
            borderRadius="md"
            cursor="pointer"
            _hover={{ bg: "gray.50" }}
            onClick={() => setSelectedCharacter(character)}
            role="button"
            aria-label={`View details for ${character.name}`}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                setSelectedCharacter(character);
              }
            }}
          >
            <DialogTrigger asChild>
              <Stack direction={{ base: "column", md: "row" }}>
                <Image
                  src={character.image}
                  alt={`${character.name} character portrait`}
                  boxSize="100px"
                />
                <Box as="article">
                  <Text as="h2" fontWeight="bold">
                    {character.name}
                  </Text>
                  <Text>Gender: {character.gender || "Not specified"}</Text>
                </Box>
              </Stack>
            </DialogTrigger>
          </Box>
        ))}

        <DialogContent aria-labelledby="character-dialog-title">
          <DialogHeader id="character-dialog-title">
            {selectedCharacter?.name}
          </DialogHeader>
          <DialogCloseTrigger aria-label="Close dialog" />
          <DialogBody pb={6}>
            <Stack align="center">
              <Box position="relative" width="200px" height="200px">
                <Skeleton
                  loading={true}
                  borderRadius="lg"
                  position="absolute"
                  top="0"
                  left="0"
                  width="100%"
                  height="100%"
                >
                  <Image
                    src={selectedCharacter?.image}
                    alt={`${selectedCharacter?.name} detailed portrait`}
                    boxSize="200px"
                    borderRadius="lg"
                    onLoad={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.parentElement?.setAttribute("data-loaded", "true");
                    }}
                  />
                </Skeleton>
              </Box>
              <Text fontSize="md">
                Gender: {selectedCharacter?.gender || "Not specified"}
              </Text>
              <Text fontSize="md">
                Status: {selectedCharacter?.status || "Unknown"}
              </Text>
              <Text fontSize="md">
                Species: {selectedCharacter?.species || "Unknown"}
              </Text>
              <Text fontSize="md">
                Type: {selectedCharacter?.type || "None"}
              </Text>
              <Text fontSize="md">
                Created at: {selectedCharacter?.created || "Unknown"}
              </Text>
            </Stack>
          </DialogBody>
        </DialogContent>
      </DialogRoot>
    </Stack>
  );
};

export default CharacterList;

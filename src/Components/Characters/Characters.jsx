import React, { useEffect, useState } from "react";
import "./Characters.css";
import {
  Card,
  Grid,
  Button,
  Divider,
  Text,
  ButtonGroup,
  Stack,
  Heading,
  Image,
  CardBody,
  CardFooter,
} from "@chakra-ui/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import CharacterInfo from "../CharactersModel/CharacterModel";

const Characters = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [planets, setPlanets] = useState([]);
  const [page, setPage] = useState(1);

  if (page <= 0) {
    setPage(1);
  }
  useEffect(() => {
    const getCharacters = async () => {
      const response = await fetch(
        `https://swapi.dev/api/people/?page=${page}`
      );
      const data = await response.json();
      setCharacters(data.results);
      setLoading(false);
    };
    getCharacters();
  }, [page]);

  useEffect(() => {
    const getPlanet = async () => {
      const response = await fetch(`https://swapi.dev/api/planets/`);
      const data = await response.json();
      setPlanets(data.results);
    };
    getPlanet();
  }, []);

  const filteredCharacters = characters.filter((character) =>
    character.name.toLowerCase()
  );

  const characterImage = (characterName) => {
    const formattedName = characterName.toLowerCase().replace(/ /g, "-");
    return `/img/${formattedName}.jpg`;
  };

  const findPlanetName = (homeworldUrl) => {
    const homeworld = planets.find((planet) => planet.url === homeworldUrl);
    return homeworld ? homeworld.name : "n/a";
  };

  console.log("===>", filteredCharacters);
  return (
    <>
      {filteredCharacters.length === 0 && !loading ? (
        <h4 className="no-results">Life forms in this galaxy, found not.</h4>
      ) : (
        <Grid templateColumns="repeat(5, 1fr)" gap={6}>
          {filteredCharacters.map((person, index) => (
            <Card maxW="sm" key={index} bg="none">
              <CardBody>
                <Image
                  src={`https://peaceful-nasturtium-a1fa14.netlify.app/${characterImage(
                    person.name
                  )}`}
                  alt={person.name}
                  borderRadius="lg"
                />
                <Stack mt="6" spacing="2">
                  <Heading color="#ffe81f" fontSize="md">
                    {person.name}
                  </Heading>
                  <Text color="white" variant="h4">
                    Planet : {findPlanetName(person.homeworld)}
                  </Text>
                  <Text color="white">Skin Color : {person.skin_color}</Text>
                  <Text color="white">Birth Year : {person.birth_year}</Text>
                </Stack>
              </CardBody>
              <Divider />
              <CardFooter>
                <ButtonGroup spacing="2">
                  <CharacterInfo character={person} />
                  <Button className="button-outline" bg="none" color="white">
                    ♡
                  </Button>
                </ButtonGroup>
              </CardFooter>
            </Card>
          ))}
        </Grid>
      )}

      <Grid templateColumns="repeat(3, 1fr)" mt={9} gap={3}>
        <ArrowLeftIcon
          fontWeight="bold"
          color="#ffe81f"
          ml={3}
          bg="none"
          onClick={() => setPage(page - 1)}
        />

        <Text flexShrink="0" color="white" mr={8}>
          Page -
          <Text fontWeight="bold" ml={3} as="span">
            {page}
          </Text>
        </Text>
        <ArrowRightIcon
          fontWeight="bold"
          color="#ffe81f"
          ml={3}
          bg="none"
          onClick={() => setPage(page + 1)}
        />
      </Grid>
    </>
  );
};

export default Characters;

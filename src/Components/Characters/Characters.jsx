import React, { useEffect, useState } from "react";
import "./Characters.css";
import {
  Card,
  CardHeader,
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

const Characters = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [handleSearch, setHandleSearch] = useState("");
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    const getCharacters = async () => {
      const response = await fetch(`https://swapi.dev/api/people/`);
      const data = await response.json();
      setCharacters(data.results);
      setLoading(false);
    };
    getCharacters();
  }, [handleSearch]);

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
    // <div>
    //   {filteredCharacters.length === 0 && !loading ? (
    //     <h4 className="no-results">
    //       Silent is the Force. Life forms in this galaxy, found not.
    //     </h4>
    //   ) : (
    //     <ul className="character-list">
    //       {filteredCharacters.map((person, index) => (
    //         <li key={index}>
    //           <img
    //             className="character-img"
    //             src={characterImage(person.name)}
    //             alt={person.name}
    //           />
    //           <div className="character-info">
    //             <h4>{person.name}</h4>
    //             <p>Planet: {findPlanetName(person.homeworld)}</p>
    //             <p>Birth year: {person.birth_year}</p>
    //           </div>
    //           {/* <CharacterModal character={person} /> */}
    //         </li>
    //       ))}
    //     </ul>
    //   )}
    // </div>
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
              <Heading  color="#ffe81f" fontSize="md">
                {person.name}
              </Heading>
              <Text color="white" variant="h4">
                Planet : {findPlanetName(person.homeworld)}
              </Text>
              <Text color="white">Skin Color : {person.skin_color}</Text>
              <Text color="white">
                Birth year : {person.birth_year}
              </Text>
            </Stack>
          </CardBody>
          <Divider />
          <CardFooter>
            <ButtonGroup spacing="2">
              <Button size="sm" variant="solid" colorScheme="blue">
                info
              </Button>
              <Button size="sm" variant="ghost" colorScheme="blue">
                favorite
              </Button>
            </ButtonGroup>
          </CardFooter>
        </Card>
      ))}
    </Grid>
  );
};

export default Characters;

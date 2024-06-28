import React from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "./CharacterModel.css";
import { Stack, Text, Heading } from "@chakra-ui/react";

const CharacterInfo = ({ character }) => (
  <Popup
    trigger={<button className="button-outline">More info</button>}
    modal
    nested
  >
    {(close) => (
      <div className="modal">
        <button className="close" onClick={close} aria-label="close">
          &times;
        </button>
        <div className="character-modal">
          <img
            className="character-img modal-img"
            src={`https://peaceful-nasturtium-a1fa14.netlify.app/img/${character.name
              .toLowerCase()
              .replace(/ /g, "-")}.jpg`}
            alt={character.name}
          />
          <Stack mt="3" spacing="2">
            <Heading color="#ffe81f" fontSize="2xl">
              {character.name}
            </Heading>
            <Text color="white">Birth year: {character.birth_year}</Text>
            <Text color="white">Gender: {character.gender}</Text>
            <Text color="white">Height: {character.height}</Text>
            <Text color="white">Weight: {character.mass}</Text>
            <Text color="white">Hair color: {character.hair_color}</Text>
            <Text color="white">Skin color: {character.skin_color}</Text>
            <Text color="white">Eye color: {character.eye_color}</Text>
          </Stack>
        </div>
      </div>
    )}
  </Popup>
);

export default CharacterInfo;

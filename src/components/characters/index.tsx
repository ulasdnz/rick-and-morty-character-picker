import { RefObject } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./characters.module.css";
import { toggleSelectedCharacter } from "../../features";
import CharacterName from "../display-name";
import { RootState } from "../../redux/store";

type CharactersProps = {
  activeIndex: number;
  activeItemRef: RefObject<HTMLDivElement>;
};

const Characters = ({ activeIndex, activeItemRef }: CharactersProps) => {
  const dispatch = useDispatch();
  const {
    fetchedData: { data },
    selectedCharacters,
    searchValue,
  } = useSelector((state: RootState) => state.rickAndMorty);

  if (!data?.results.length) {
    return <p style={{ padding: "2rem", color: "gray" }}>No characters found.</p>;
  }

  return (
    <div className={styles.characters}>
      {data.results.map((character, index) => (
        <div
          className={
            activeIndex === index
              ? styles.keyboardFocusedCharacter
              : styles.character
          }
          ref={activeIndex === index ? activeItemRef : undefined}
          key={character.id}
          onClick={() =>
            dispatch(
              toggleSelectedCharacter({ id: character.id, name: character.name })
            )
          }
        >
          <div className={styles.checkbox}>
            <input
              type="checkbox"
              readOnly
              tabIndex={-1}
              aria-label={`Select ${character.name}`}
              checked={selectedCharacters.some(({ id }) => id === character.id)}
            />
          </div>
          <div>
            <img
              alt="Rick And Morty Character Picture"
              src={character.image}
              className={styles.picture}
            ></img>
          </div>
          <div className={styles.info}>
            <div>{CharacterName(character.name, searchValue.trim())}</div>
            <div>{character.episode.length} Episodes</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Characters;

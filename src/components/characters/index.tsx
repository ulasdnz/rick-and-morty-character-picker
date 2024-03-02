import { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./characters.module.css";
import { addToSelectedCharacters } from "../../features";
import CharacterName from "../display-name";
import { RootState } from "../../redux/store";

const Characters = () => {
  const dispatch = useDispatch();
  const {
    fetchedData: { data },
    focusedCharacterIndex,
    selectedCharacters,
    searchValue,
  } = useSelector((state: RootState) => state.rickAndMorty);
  const focusedItemRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!focusedItemRef.current) return;

    focusedItemRef.current.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }, [focusedCharacterIndex]);

  return (
    <div className={styles.characters}>
      {data?.results.map((character, index) => (
        <div
          className={
            focusedCharacterIndex === index
              ? styles.keyboardFocusedCharacter
              : styles.character
          }
          ref={focusedCharacterIndex === index ? focusedItemRef : undefined}
          key={index}
          onClick={() => dispatch(addToSelectedCharacters(character.name))}
        >
          <div className={styles.checkbox}>
            <input
              type="checkbox"
              readOnly
              checked={selectedCharacters?.includes(character.name)}
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

import { ChangeEvent, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./input.module.css";
import {
  setSearchValue,
  setIsOpen,
  deleteSelectedCharacter,
} from "../../features/index.ts";
import { AppDispatch, RootState } from "../../redux/store";
import handleKeyPress from "../../utils/handleKeyPress.ts";
import CloseSvg from "../../assets/close.svg";

const index = () => {
  const {
    searchValue,
    selectedCharacters,
    isOpen,
    fetchedData: { data },
    focusedCharacterIndex,
  }: InitialState = useSelector((state: RootState) => state.rickAndMorty);
  const dispatch = useDispatch<AppDispatch>();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    dispatch(setSearchValue(value));
    !isOpen && dispatch(setIsOpen(true));
  };
  const handleInputClick = () => {
    inputRef.current?.focus();
    dispatch(setIsOpen(true));
  };

  return (
    <div
      className={styles.inputArea}
      onClick={handleInputClick}
      style={isOpen ? { borderColor: "rgb(253, 95, 0)" } : undefined}
    >
      <div className={styles.selectedCharacters}>
        {selectedCharacters?.map((character, index) => (
          <div className={styles.selectedCharacter} key={index}>
            {character}
            <div
              className={styles.closeSvg}
              onClick={() => dispatch(deleteSelectedCharacter(character))}
            >
              <img src={CloseSvg} />
            </div>
          </div>
        ))}
      </div>
      <input
        type="text"
        placeholder="Search characters..."
        value={searchValue}
        ref={inputRef}
        className={styles.input}
        onChange={handleInputChange}
        onKeyDown={(event) =>
          handleKeyPress(event, dispatch, data, focusedCharacterIndex)
        }
      />
    </div>
  );
};

export default index;

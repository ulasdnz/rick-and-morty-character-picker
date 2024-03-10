import { ChangeEvent, KeyboardEvent, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./input.module.css";
import {
  setSearchValue,
  setIsOpen,
  deleteSelectedCharacter,
} from "../../features/index.ts";
import { AppDispatch, RootState } from "../../redux/store";
import CloseSvg from "../../assets/close.svg";

type InputProps = {
  onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
};

const Input = ({ onKeyDown }: InputProps) => {
  const { searchValue, selectedCharacters, isOpen }: InitialState =
    useSelector((state: RootState) => state.rickAndMorty);
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
        {selectedCharacters.map((character) => (
          <div className={styles.selectedCharacter} key={character.id}>
            {character.name}
            <div
              className={styles.closeSvg}
              onClick={() => dispatch(deleteSelectedCharacter(character.id))}
            >
              <img src={CloseSvg} alt={`Remove ${character.name}`} />
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
        onKeyDown={onKeyDown}
      />
    </div>
  );
};

export default Input;

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { useRef } from "react";
import {
  deleteWithBackSpace,
  setIsOpen,
  toggleSelectedCharacter,
} from "../../features";
import Input from "../input";
import styles from "./multiSelect.module.css";
import useOutSideClick from "../../hooks/useOutSideClick.ts";
import useKeyboardNavigation from "../../hooks/useKeyboardNavigation.ts";
import Dropdown from "../dropdown/index.tsx";

const NO_CHARACTERS: Character[] = [];

const MultiSelect = () => {
  const { data } = useSelector(
    (state: RootState) => state.rickAndMorty.fetchedData
  );
  const dispatch = useDispatch();
  const characters = data?.results ?? NO_CHARACTERS;

  const ref = useRef<HTMLInputElement>(null);
  useOutSideClick(ref, () => dispatch(setIsOpen(false)));

  const { activeIndex, activeItemRef, handleKeyDown } = useKeyboardNavigation(
    characters,
    {
      onSelect: ({ id, name }) =>
        dispatch(toggleSelectedCharacter({ id, name })),
      onBackspace: () => dispatch(deleteWithBackSpace()),
      onEscape: () => dispatch(setIsOpen(false)),
    }
  );

  return (
    <div className={styles.wrap} ref={ref}>
      <div className={styles.input}>
        <Input onKeyDown={handleKeyDown} />
        <Dropdown activeIndex={activeIndex} activeItemRef={activeItemRef} />
      </div>
    </div>
  );
};

export default MultiSelect;

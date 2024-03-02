import { KeyboardEvent } from "react";
import {
  setFocusedCharacterIndexDown,
  deleteWithBackSpace,
  setFocusedCharacterIndexUp,
  setIsOpen,
  addToSelectedCharacters,
} from "../features";
import getFocusedCharacter from "./getFocusedCharacter";
import { AppDispatch } from "../redux/store";

export default function handleKeyPress(
  event: KeyboardEvent,
  dispatch: AppDispatch,
  data: ResponseData | null,
  focusedCharacterIndex: number
) {
  switch (event.key) {
    case "Enter":
      var character: string | null = getFocusedCharacter(data, focusedCharacterIndex);
      if (!character) break;
      dispatch(addToSelectedCharacters(character));
      break;
    case "Tab":
      var character: string | null = getFocusedCharacter(data, focusedCharacterIndex);
      if (!character) break;
      dispatch(addToSelectedCharacters(character));
      break;
    case "Escape":
      dispatch(setIsOpen(false));
      break;
    case "ArrowDown":
      dispatch(setFocusedCharacterIndexDown());
      break;
    case "ArrowUp":
      dispatch(setFocusedCharacterIndexUp());
      break;
    case "Backspace":
      dispatch(deleteWithBackSpace());
      break;
  }
}

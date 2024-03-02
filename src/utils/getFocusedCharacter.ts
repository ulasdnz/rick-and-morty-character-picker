export default function getFocusedCharacter(
  data: ResponseData | null,
  focusedCharacterIndex: number
): string | null {
    
  if (!data || focusedCharacterIndex === -1) return null;
  const focusedCharacter = data.results.find(
    (_item, index) => index === focusedCharacterIndex
  );

  return focusedCharacter ? focusedCharacter.name : null;
}

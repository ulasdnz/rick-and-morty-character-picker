const CharacterName = (name: string, searchValue: string) => {
  const index = name.toLowerCase().indexOf(searchValue.toLowerCase());
  const bold = name.substring(index, index + searchValue.length);
  const first = name.substring(0, index);
  const last = name.substring(index + searchValue.length);

  return (
    <p>
      <span>{first}</span>
      <span style={{ fontWeight: "bolder" }}>{bold}</span>
      <span>{last}</span>
    </p>
  );
};

export default CharacterName;

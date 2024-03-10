type Character = {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
};

type ResponseData = {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Character[];
};

type SelectedCharacter = Pick<Character, "id" | "name">;

type InitialState = {
  isOpen: boolean;
  searchValue: string;
  selectedCharacters: SelectedCharacter[];
  fetchedData: {
    status: string;
    data: ResponseData | null;
  };
};

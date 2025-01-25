export interface SwPersonRaw {
  name: string;
  birthYear: string;
  eyeColor: string;
  gender: string;
  hairColor: string;
  height: string;
  mass: string;
  skinColor: string;
  created: string;
  edited: string;
}

export interface SwPerson extends SwPersonRaw {
  createdFormatted: string;
  editedFormatted: string;
}

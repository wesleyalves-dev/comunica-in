import type { Person, PersonOutput } from './interfaces'

export class PersonMapper {
  toOutput(person: Person): PersonOutput {
    return {
      name: person.name,
      birthYear: person.birth_year,
      eyeColor: person.eye_color,
      gender: person.gender,
      hairColor: person.hair_color,
      height: person.height,
      mass: person.mass,
      skinColor: person.skin_color,
      created: new Date(person.created),
      edited: new Date(person.edited)
    }
  }
}

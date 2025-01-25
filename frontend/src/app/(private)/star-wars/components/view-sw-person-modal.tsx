import { Modal } from "@/components/modal";
import type { SwPerson } from "@/services/sw-person";

interface ViewSwPersonModalProps {
  person?: SwPerson;
}

export function ViewSwPersonModal({ person }: ViewSwPersonModalProps) {
  return (
    <Modal id="view-person-modal">
      <h3 className="font-bold text-lg pb-4 select-none">{person?.name}</h3>

      <p>Ano de nascimento: {person?.birthYear}</p>
      <p>Cor dos olhos: {person?.eyeColor}</p>
      <p>Genero: {person?.gender}</p>
      <p>Cor do cabelo: {person?.hairColor}</p>
      <p>Altura (cm): {person?.height}</p>
      <p>Peso (kg): {person?.mass}</p>
      <p>Cor da pele: {person?.skinColor}</p>
      <p>Cadastrado em: {person?.createdFormatted}</p>
      <p>Última alteração: {person?.editedFormatted}</p>
    </Modal>
  );
}

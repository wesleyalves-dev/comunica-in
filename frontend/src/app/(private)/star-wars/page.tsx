"use client";
import { useState } from "react";

import { showModal } from "@/components/modal";
import type { SwPerson } from "@/services/sw-person";
import { useListSwPeople } from "@/hooks/use-list-sw-people";
import { Loader } from "@/components/loader";
import { SwPersonTableRow, ViewSwPersonModal } from "./components";

export default function StarWars() {
  const [selectedPerson, setSelectedPerson] = useState<SwPerson>();
  const { data, isLoading } = useListSwPeople();
  const people = data?.results ?? [];

  function handleViewPersonClick(person: SwPerson) {
    setSelectedPerson(person);
    showModal("view-person-modal");
  }

  return (
    <div>
      <Loader active={isLoading} />
      <div className="dui-card shadow-md">
        <div className="dui-card-body">
          <div>
            <h1 className="inline">Personagens</h1>
          </div>
          <table className="dui-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Ano de nascimento</th>
                <th>Criado em</th>
                <th>Alterado em</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {people.map((person) => (
                <SwPersonTableRow
                  key={person.name}
                  person={person}
                  onViewClick={handleViewPersonClick}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ViewSwPersonModal person={selectedPerson} />
    </div>
  );
}

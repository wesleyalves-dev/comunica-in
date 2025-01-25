"use client";
import { useState } from "react";

import { showModal } from "@/components/modal";
import type { SwPerson } from "@/services/sw-person";
import { SwPersonTableRow, ViewSwPersonModal } from "./components";

export default function StarWars() {
  const [selectedPerson, setSelectedPerson] = useState<SwPerson>();

  const people: SwPerson[] = [
    {
      name: "Luke Skywalker",
      birthYear: "19BBY",
      eyeColor: "blue",
      gender: "male",
      hairColor: "blond",
      height: "172",
      mass: "77",
      skinColor: "fair",
      created: "2014-12-09T13:50:51.644Z",
      edited: "2014-12-20T21:17:56.891Z",
      createdFormatted: "2014-12-09",
      editedFormatted: "2014-12-20",
    },
  ];

  function handleViewPersonClick(person: SwPerson) {
    setSelectedPerson(person);
    showModal("view-person-modal");
  }

  return (
    <div>
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

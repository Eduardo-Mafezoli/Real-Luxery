"use client";

import { useState } from "react";
import {
  MapPin,
  Plus,
  PencilSimple,
  Trash,
  House,
  Buildings,
} from "@phosphor-icons/react";

type Address = {
  id: number;
  label: string;
  type: "casa" | "trabalho" | "outro";
  recipient: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zip: string;
  isDefault: boolean;
};

const enderecosMock: Address[] = [
  {
    id: 1,
    label: "Casa",
    type: "casa",
    recipient: "Eduardo Mafezoli",
    street: "Rua das Flores",
    number: "123",
    complement: "Apto 45",
    neighborhood: "Centro",
    city: "Fortaleza",
    state: "CE",
    zip: "60000-000",
    isDefault: true,
  },
  {
    id: 2,
    label: "Trabalho",
    type: "trabalho",
    recipient: "Eduardo Mafezoli",
    street: "Av. Beira Mar",
    number: "4500",
    neighborhood: "Meireles",
    city: "Fortaleza",
    state: "CE",
    zip: "60165-121",
    isDefault: false,
  },
];

export default function AddressesPage() {
  const [addresses, setAddresses] = useState<Address[]>(enderecosMock);
  const [showForm, setShowForm] = useState(false);

  const handleDelete = (id: number) => {
    setAddresses(addresses.filter((a) => a.id !== id));
  };

  const handleSetDefault = (id: number) => {
    setAddresses(addresses.map((a) => ({ ...a, isDefault: a.id === id })));
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-white rounded-xl p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-titulo text-3xl text-(--color-texto)">
              Meus <span className="text-(--color-primaria)">endereços</span>
            </h1>
            <p className="text-sm text-[#888] mt-1">
              Gerencie seus endereços de entrega
            </p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-4 py-2 bg-(--color-primaria) text-white text-xs tracking-[2px] uppercase hover:opacity-90 transition-opacity"
          >
            <Plus size={14} />
            Novo endereço
          </button>
        </div>

        {/* FORMULÁRIO */}
        {showForm && (
          <div className="mb-8 p-6 border border-gray-100 rounded-xl bg-(--color-fundo)">
            <h3 className="font-titulo text-lg text-(--color-texto) mb-4">
              Novo endereço
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "CEP", placeholder: "00000-000", col: 1 },
                { label: "Destinatário", placeholder: "Nome completo", col: 1 },
                { label: "Rua", placeholder: "Nome da rua", col: 2 },
                { label: "Número", placeholder: "123", col: 1 },
                {
                  label: "Complemento",
                  placeholder: "Apto, bloco... (opcional)",
                  col: 1,
                },
                { label: "Bairro", placeholder: "Bairro", col: 1 },
                { label: "Cidade", placeholder: "Cidade", col: 1 },
                { label: "Estado", placeholder: "UF", col: 1 },
              ].map((field) => (
                <div
                  key={field.label}
                  className={field.col === 2 ? "col-span-2" : ""}
                >
                  <label className="text-xs tracking-[2px] uppercase text-(--color-texto) font-medium block mb-2">
                    {field.label}
                  </label>
                  <input
                    type="text"
                    placeholder={field.placeholder}
                    className="w-full px-4 py-3 border border-gray-200 rounded text-sm outline-none focus:border-(--color-primaria) transition-colors bg-white"
                  />
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-4 justify-end">
              <button
                onClick={() => setShowForm(false)}
                className="px-6 py-2 border border-gray-200 text-xs tracking-[2px] uppercase text-[#888] hover:border-(--color-primaria) hover:text-(--color-primaria) transition-colors"
              >
                Cancelar
              </button>
              <button className="px-6 py-2 bg-(--color-primaria) text-white text-xs tracking-[2px] uppercase hover:opacity-90 transition-opacity">
                Salvar endereço
              </button>
            </div>
          </div>
        )}

        {/* LISTA */}
        {addresses.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            {addresses.map((address) => (
              <div
                key={address.id}
                className={`relative p-5 rounded-xl border-2 transition-colors
                  ${
                    address.isDefault
                      ? "border-(--color-primaria) bg-[#fdf9f9]"
                      : "border-gray-100 hover:border-gray-200"
                  }`}
              >
                {address.isDefault && (
                  <span className="absolute top-3 right-3 text-[0.6rem] tracking-[2px] uppercase bg-(--color-primaria) text-white px-2 py-0.5 rounded-full">
                    Padrão
                  </span>
                )}

                <div className="flex items-center gap-2 mb-3">
                  {address.type === "casa" ? (
                    <House size={16} className="text-(--color-primaria)" />
                  ) : (
                    <Buildings size={16} className="text-(--color-primaria)" />
                  )}
                  <span className="text-xs font-semibold text-(--color-texto) tracking-wide uppercase">
                    {address.label}
                  </span>
                </div>

                <div className="flex flex-col gap-1">
                  <p className="text-sm text-(--color-texto)">
                    {address.recipient}
                  </p>
                  <p className="font-corpo text-xs text-[#888]">
                    {address.street}, {address.number}
                    {address.complement ? ` - ${address.complement}` : ""}
                  </p>
                  <p className="font-corpo text-xs text-[#888]">
                    {address.neighborhood} · {address.city}/{address.state}
                  </p>
                  <p className="font-corpo text-xs text-[#888]">
                    CEP: {address.zip}
                  </p>
                </div>

                <div className="flex items-center gap-3 mt-4 pt-3 border-t border-gray-100">
                  {!address.isDefault && (
                    <button
                      onClick={() => handleSetDefault(address.id)}
                      className="text-xs text-(--color-primaria) hover:opacity-70 transition-opacity"
                    >
                      Definir como padrão
                    </button>
                  )}
                  <div className="flex gap-2 ml-auto">
                    <button className="p-1.5 text-[#aaa] hover:text-(--color-primaria) transition-colors">
                      <PencilSimple size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(address.id)}
                      className="p-1.5 text-[#aaa] hover:text-red-400 transition-colors"
                    >
                      <Trash size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 gap-4">
            <MapPin size={48} className="text-gray-200" />
            <p className="text-sm text-[#888]">Nenhum endereço cadastrado</p>
          </div>
        )}
      </div>
    </div>
  );
}

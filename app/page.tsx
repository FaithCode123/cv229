"use client";
import { useState } from "react";

export default function Home() {
  const [nom, setNom] = useState("");
  const [titre, setTitre] = useState("");
  const [bio, setBio] = useState("");

  return (
    <main className="min-h-screen bg-white p-6 md:p-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-black">CV229</h1>
        <p className="text-gray-600 mt-2">Générateur de CV pour étudiants béninois</p>

        <div className="grid md:grid-cols-2 gap-8 mt-8">
          <div className="space-y-4">
            <input value={nom} onChange={e=>setNom(e.target.value)} placeholder="Nom complet" className="w-full border p-3 rounded-xl" />
            <input value={titre} onChange={e=>setTitre(e.target.value)} placeholder="Titre (ex: Développeur)" className="w-full border p-3 rounded-xl" />
            <textarea value={bio} onChange={e=>setBio(e.target.value)} placeholder="À propos de vous" className="w-full border p-3 rounded-xl h-32" />
          </div>

          <div className="bg-gray-900 text-white p-8 rounded-2xl">
            <h2 className="text-2xl font-bold">{nom || "Votre Nom"}</h2>
            <p className="text-blue-300 mt-1">{titre || "Votre titre"}</p>
            <p className="mt-6 text-sm text-gray-300">{bio || "Votre bio apparaîtra ici..."}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
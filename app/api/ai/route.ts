import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export async function POST(req: Request) {
  try {
    const { type, form } = await req.json();
    
    let prompt = "";
    if (type === "profil") prompt = `Poste: ${form.poste}, Diplôme: ${form.diplomePro}, École: ${form.ecole}. Rédige profil CV 3 phrases.`;
    else if (type === "expertise") prompt = `Améliore: ${form.expertise}`;
    else {
      const num = type.replace("exp", "");
      prompt = `Améliore: ${form[`exp${num}Titre`]} - ${form[`exp${num}Desc`]}`;
    }

    // 1. On essaie Gemini 3.8-flash
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
      const res = await ai.models.generateContent({ model: "gemini-3.8-flash", contents: prompt });
      if (res.text) return NextResponse.json({ text: res.text });
    } catch (e) {
      console.log("Gemini surchargé, on passe en mode local");
    }

    // 2. SECOURS LOCAL - marche toujours, même sans Google
    let text = "";
    if (type === "profil") {
      text = `Jeune diplômé en ${form.diplomePro || 'Licence'} à ${form.ecole || 'FASEG/UAC'}, passionné et motivé pour le poste de ${form.poste || 'assistant'}. Rigoureux, autonome et doté d'un bon esprit d'équipe. Je souhaite mettre mes compétences au service de votre entreprise pour contribuer à sa croissance.`;
    } else if (type === "expertise") {
      text = `Pack Microsoft Office, Gestion administrative, Comptabilité de base, Communication professionnelle, Esprit d'analyse, ${form.expertise}`;
    } else {
      const num = type.replace("exp", "");
      text = `Assuré la gestion quotidienne des opérations, l'accueil client et le suivi administratif. Contribué à l'amélioration des processus et à l'atteinte des objectifs de ${form[`exp${num}Titre`] || 'l\'entreprise'}.`;
    }

    return NextResponse.json({ text });

  } catch (e: any) {
    return NextResponse.json({ text: `Erreur: ${e.message}` });
  }
}
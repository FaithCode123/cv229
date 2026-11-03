import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { type, form } = await req.json();
    
    let prompt = "";
    if (type === "profil") {
      prompt = `Tu es expert RH Bénin pour CV229. Poste: ${form.poste || ''}, Diplôme: ${form.diplome || ''}, Compétences: ${form.competences || ''}. Rédige un paragraphe PROFIL pro, percutant, 3 phrases max, en français.`;
    } else {
      prompt = `Améliore cette expérience CV: "${form.titre || ''} - ${form.desc || ''}". Réécris en 2 lignes pro avec verbes d'action. En français, pour le Bénin.`;
    }

    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
    });

    const data = await res.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "Erreur IA, réessaie.";
    return NextResponse.json({ text });
  } catch (e) {
    return NextResponse.json({ text: "Erreur serveur" }, { status: 500 });
  }
}
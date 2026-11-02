"use client";
import { useState, useEffect } from "react";
const ROSE = "#e9407a";
const BLEU = "#1b2a4e";

export default function CV229Final() {
  const [step, setStep] = useState(1);
  const [photo, setPhoto] = useState<string | null>(null);
  const [form, setForm] = useState({ 
    nom:"", poste:"", tel:"", email:"", adresse:"", quartier:"", 
    diplomePro:"", ecole:"", 
    exp1Titre:"", exp1Desc:"", exp1Annee:"", 
    exp2Titre:"", exp2Desc:"", exp2Annee:"", 
    exp3Titre:"", exp3Desc:"", exp3Annee:"", 
    expertise:"", languesParlees:"", languesEcrites:"", profil:"" 
  });
  const [loaded, setLoaded] = useState(false);

  useEffect(()=>{
    const s = localStorage.getItem("cv229");
    if(s){
      try{ 
        const d=JSON.parse(s); 
        if(d.form) setForm(d.form); 
        if(d.photo) setPhoto(d.photo); 
      }catch{}
    }
    setLoaded(true);
  },[]);

  useEffect(()=>{
    if(!loaded) return;
    localStorage.setItem("cv229", JSON.stringify({form, photo}));
  },[form, photo, loaded]);

  const onPhoto = (e:any)=>{
    const f=e.target.files[0];
    if(!f) return;
    if(f.size>2*1024*1024){ alert("Photo trop lourde, max 2MB"); return; }
    const r=new FileReader();
    r.onload=ev=>setPhoto(ev.target?.result as string);
    r.readAsDataURL(f);
  };

  const check = () => {
    if(!photo){ alert("❌ Photo obligatoire"); return false; }
    for(const [k,v] of Object.entries(form)){
      if(!(v as string).trim()){ alert(`❌ Champ manquant : ${k}`); return false; }
    }
    if(!form.email.includes("@")){ alert("❌ Email invalide"); return false; }
    return true;
  };

  if(step===4){
    const lettre=`Calavi, le 02 Novembre 2026
Objet: Candidature au poste de ${form.poste}

Madame, Monsieur,

Titulaire de ${form.diplomePro} obtenu à ${form.ecole}, je souhaite rejoindre votre équipe en tant que ${form.poste}.

${form.profil}

Mon parcours:
- ${form.exp1Titre} (${form.exp1Annee}) à ${form.quartier}
- ${form.exp2Titre} (${form.exp2Annee})
- ${form.exp3Titre} (${form.exp3Annee})

Parlant ${form.languesParlees}, je reste à disposition au ${form.tel}.

Veuillez agréer, Madame, Monsieur, mes salutations distinguées.

${form.nom}
${form.email} - ${form.adresse}`;
    return(
      <main className="min-h-screen bg-white p-6 flex flex-col items-center">
        <h1 className="font-black text-xl">Page 4 - Merci d&apos;avoir utilisé CV229.ai</h1>
        <div className="w-full max-w-xl mt-6 bg-white border-2 border-black p-6 rounded-2xl shadow-lg">
          <pre className="whitespace-pre-wrap text-[12px] leading-6 bg-amber-50 p-4 rounded-xl">{lettre}</pre>
          <div className="flex gap-2 mt-4">
            <button onClick={()=>{navigator.clipboard.writeText(lettre); alert('Copié !')}} className="bg-black text-white p-3 rounded-xl flex-1 text-xs font-bold">📋 Copier</button>
            <a href={`https://wa.me/?text=${encodeURIComponent("J'ai créé mon CV pro avec CV229.ai 👉 cv229.vercel.app\n\n"+lettre)}`} target="_blank" className="bg-[#25D366] text-white p-3 rounded-xl flex-1 text-xs font-bold text-center">Partager WhatsApp 📲</a>
          </div>
          <button onClick={()=>window.print()} className="w-full mt-3 border p-3 rounded-xl text-xs font-bold">🖨️ Imprimer Lettre</button>
        </div>
        <div className="flex gap-2 mt-6">
          <button onClick={()=>setStep(3)} className="underline text-xs">← Retour CV</button>
          <button onClick={()=>{localStorage.clear(); location.reload();}} className="underline text-xs text-red-500">Recommencer à zéro</button>
        </div>
      </main>
    )
  }

  if(step===3){
    return(
      <>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap'); *{font-family:Inter,sans-serif} @media print{.no-print{display:none} @page{size:A4; margin:0} body{-webkit-print-color-adjust:exact; print-color-adjust:exact}}`}</style>
        <main className="min-h-screen bg-[#f0f0f0] flex justify-center p-0 md:p-6">
          <div className="w-full md:w-[820px] bg-white flex flex-col shadow-xl">
            <div className="flex flex-col md:flex-row flex-1">
              <div className="w-full md:w-[36%] bg-[#fcfcfc] p-7 border-b md:border-b-0 md:border-r">
                <div className="w-40 h-40 rounded-full overflow-hidden mx-auto shadow-lg" style={{border:`4px solid ${ROSE}`}}>{photo ? <img src={photo} className="w-full h-full object-cover" alt="photo"/> : <div className="w-full h-full bg-zinc-100 flex items-center justify-center text-[10px]">PHOTO</div>}</div>
                <div className="mt-8"><div className="flex items-center gap-2"><div className="w-1 h-5" style={{background:ROSE}}></div><h2 className="font-black text-[11px] tracking-[2px]" style={{color:BLEU}}>CONTACT</h2></div><div className="mt-3 space-y-1 text-[11px]"><p>📞 {form.tel}</p><p className="break-all">✉️ {form.email}</p><p>📍 {form.quartier}, {form.adresse}</p></div></div>
                <div className="mt-7"><div className="flex items-center gap-2"><div className="w-1 h-5" style={{background:ROSE}}></div><h2 className="font-black text-[11px] tracking-[2px]" style={{color:BLEU}}>ÉDUCATION</h2></div><div className="mt-3"><p className="font-bold text-[13px]">{form.diplomePro}</p><p className="text-[11px] text-zinc-500">{form.ecole}</p></div></div>
                <div className="mt-7"><div className="flex items-center gap-2"><div className="w-1 h-5" style={{background:ROSE}}></div><h2 className="font-black text-[11px] tracking-[2px]" style={{color:BLEU}}>COMPÉTENCES</h2></div><p className="text-[11px] mt-3 leading-5">{form.expertise}</p></div>
                <div className="mt-7"><div className="flex items-center gap-2"><div className="w-1 h-5" style={{background:ROSE}}></div><h2 className="font-black text-[11px] tracking-[2px]" style={{color:BLEU}}>LANGUES</h2></div><p className="text-[11px] mt-3"><b>Parlé:</b> {form.languesParlees}</p><p className="text-[11px]"><b>Écrit:</b> {form.languesEcrites}</p></div>
              </div>
              <div className="w-full md:w-[64%] p-8">
                <h1 className="text-[34px] font-black leading-none" style={{color:BLEU}}>{form.nom}</h1>
                <p className="text-[11px] tracking-[3px] font-bold mt-2" style={{color:ROSE}}>{form.poste?.toUpperCase()}</p>
                <div className="h-[3px] w-14 mt-3" style={{background:ROSE}}></div>
                <h2 className="font-black text-[11px] mt-7 flex items-center gap-2" style={{color:BLEU}}><span className="w-1 h-5" style={{background:ROSE}}></span>PROFIL</h2><p className="text-[12px] leading-6 mt-2 text-zinc-600">{form.profil}</p>
                <h2 className="font-black text-[11px] mt-7 flex items-center gap-2" style={{color:BLEU}}><span className="w-1 h-5" style={{background:ROSE}}></span>EXPÉRIENCE PROFESSIONNELLE</h2>
                <div className="mt-3 space-y-5">
                  <div><div className="flex justify-between"><p className="font-bold text-[13px]" style={{color:BLEU}}>{form.exp1Titre}</p><span className="text-[10px] bg-zinc-100 px-2 py-1 rounded-full">{form.exp1Annee}</span></div><p className="text-[11px] text-zinc-500 mt-1">{form.exp1Desc}</p></div>
                  <div><div className="flex justify-between"><p className="font-bold text-[13px]" style={{color:BLEU}}>{form.exp2Titre}</p><span className="text-[10px] bg-zinc-100 px-2 py-1 rounded-full">{form.exp2Annee}</span></div><p className="text-[11px] text-zinc-500 mt-1">{form.exp2Desc}</p></div>
                  <div><div className="flex justify-between"><p className="font-bold text-[13px]" style={{color:BLEU}}>{form.exp3Titre}</p><span className="text-[10px] bg-zinc-100 px-2 py-1 rounded-full">{form.exp3Annee}</span></div><p className="text-[11px] text-zinc-500 mt-1">{form.exp3Desc}</p></div>
                </div>
                <div className="mt-8 p-3 bg-zinc-50 rounded-xl border text-[11px]">RÉFÉRENCES - {form.nom} - {form.tel}</div>
              </div>
            </div>
            <div className="h-[8px] w-full" style={{background:ROSE}}></div>
          </div>
          <div className="no-print fixed bottom-0 md:bottom-auto md:top-5 left-0 md:left-auto md:right-5 w-full md:w-[210px] bg-white md:bg-transparent p-3 md:p-0 flex flex-row md:flex-col gap-2 shadow-[0_-10px_20px_rgba(0,0,0,0.1)] md:shadow-none">
            <button onClick={()=>window.print()} className="flex-1 text-white p-3 rounded-xl font-black text-xs" style={{background:ROSE}}>1️⃣ PDF</button>
            <button onClick={()=>setStep(4)} className="flex-1 bg-[#1b2a4e] text-white p-3 rounded-xl font-black text-xs">2️⃣ Lettre</button>
            <button onClick={()=>setStep(1)} className="hidden md:block bg-white border p-2 rounded text-xs">Modifier</button>
          </div>
        </main>
      </>
    )
  }

  return(
    <main className="min-h-screen bg-white flex flex-col items-center p-4">
      <h1 className="font-black text-center">CV229.ai - Version Finale</h1>
      <p className="text-[11px] text-zinc-500">Sauvegarde auto • Champs vides • Tout obligatoire</p>
      <div className="w-full max-w-xl bg-zinc-50 p-5 rounded-2xl border mt-4">
        <label className="text-xs font-bold">Photo * (max 2MB)</label><input type="file" onChange={onPhoto} className="w-full mb-3 text-xs" />
        <div className="grid grid-cols-2 gap-2"><input value={form.nom} onChange={e=>setForm({...form, nom:e.target.value})} placeholder="Nom complet *" className="border p-2 rounded text-sm" /><input value={form.poste} onChange={e=>setForm({...form, poste:e.target.value})} placeholder="Poste *" className="border p-2 rounded text-sm" /></div>
        <div className="grid grid-cols-2 gap-2 mt-2"><input value={form.tel} onChange={e=>setForm({...form, tel:e.target.value})} placeholder="Tél WhatsApp *" className="border p-2 rounded text-sm" /><input value={form.quartier} onChange={e=>setForm({...form, quartier:e.target.value})} placeholder="Quartier * (Sèmè-Podji)" className="border p-2 rounded text-sm" /></div>
        <input value={form.adresse} onChange={e=>setForm({...form, adresse:e.target.value})} placeholder="Ville * (Cotonou)" className="w-full border p-2 rounded mt-2 text-sm" />
        <input value={form.email} onChange={e=>setForm({...form, email:e.target.value})} placeholder="Email *" className="w-full border p-2 rounded mt-2 text-sm" />
        <input value={form.diplomePro} onChange={e=>setForm({...form, diplomePro:e.target.value})} placeholder="Dernier diplôme pro obtenu * (ex: Licence Pro)" className="w-full border-2 p-2 rounded mt-2 text-sm" style={{borderColor:ROSE}} />
        <input value={form.ecole} onChange={e=>setForm({...form, ecole:e.target.value})} placeholder="École / Université *" className="w-full border p-2 rounded mt-2 text-sm" />
        <textarea value={form.profil} onChange={e=>setForm({...form, profil:e.target.value})} placeholder="Profil * (ex: Passionné d'informatique...)" className="w-full border p-2 rounded mt-2 h-14 text-xs" />
        <input value={form.expertise} onChange={e=>setForm({...form, expertise:e.target.value})} placeholder="Expertise / Compétences *" className="w-full border p-2 rounded mt-2 text-sm" />
        <input value={form.languesParlees} onChange={e=>setForm({...form, languesParlees:e.target.value})} placeholder="Langues parlées * (ex: Fon Maternel, Français Courant)" className="w-full border p-2 rounded mt-2 text-sm" />
        <input value={form.languesEcrites} onChange={e=>setForm({...form, languesEcrites:e.target.value})} placeholder="Langues écrites *" className="w-full border p-2 rounded mt-2 text-sm" />
        <div className="mt-4 border-t pt-3">
          <label className="text-xs font-bold">3 EXPÉRIENCES - L&apos;étudiant saisit tout</label>
          <input value={form.exp1Titre} onChange={e=>setForm({...form, exp1Titre:e.target.value})} placeholder="Exp 1 Titre *" className="w-full border p-2 rounded mt-2 text-xs" />
          <input value={form.exp1Desc} onChange={e=>setForm({...form, exp1Desc:e.target.value})} placeholder="Description *" className="w-full border p-2 rounded mt-1 text-xs" />
          <input value={form.exp1Annee} onChange={e=>setForm({...form, exp1Annee:e.target.value})} placeholder="Années * (ex: 2022-2024)" className="w-full border p-2 rounded mt-1 text-xs bg-white" />
          <input value={form.exp2Titre} onChange={e=>setForm({...form, exp2Titre:e.target.value})} placeholder="Exp 2 Titre *" className="w-full border p-2 rounded mt-3 text-xs" />
          <input value={form.exp2Desc} onChange={e=>setForm({...form, exp2Desc:e.target.value})} placeholder="Description *" className="w-full border p-2 rounded mt-1 text-xs" />
          <input value={form.exp2Annee} onChange={e=>setForm({...form, exp2Annee:e.target.value})} placeholder="Années *" className="w-full border p-2 rounded mt-1 text-xs bg-white" />
          <input value={form.exp3Titre} onChange={e=>setForm({...form, exp3Titre:e.target.value})} placeholder="Exp 3 Titre *" className="w-full border p-2 rounded mt-3 text-xs" />
          <input value={form.exp3Desc} onChange={e=>setForm({...form, exp3Desc:e.target.value})} placeholder="Description *" className="w-full border p-2 rounded mt-1 text-xs" />
          <input value={form.exp3Annee} onChange={e=>setForm({...form, exp3Annee:e.target.value})} placeholder="Années *" className="w-full border p-2 rounded mt-1 text-xs bg-white" />
        </div>
        <button onClick={()=>{ if(check()) setStep(3); }} className="w-full text-white p-4 rounded-xl font-black mt-5 shadow-lg" style={{background:ROSE}}>GÉNÉRER MON CV PRO MAX ✨</button>
        <p className="text-[10px] text-zinc-400 text-center mt-2">Sauvegarde automatique - tu peux fermer et revenir</p>
      </div>
    </main>
  )
}
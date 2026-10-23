import type { ReactNode } from "react";

function Text({ x, y, children }: { x: number; y: number; children: ReactNode }) {
  return <text x={x} y={y} textAnchor="middle" fontWeight="650" fontSize="15" fill="#4B4064">{children}</text>;
}
function Cell() {
  return <>
    <ellipse cx="270" cy="137" rx="185" ry="100" fill="#EADCF6" stroke="#9176CD" strokeWidth="5"/>
    <ellipse cx="275" cy="137" rx="70" ry="55" fill="#C3A9EB" stroke="#795CAA" strokeWidth="3"/>
    <circle cx="270" cy="135" r="22" fill="#8060B6"/>
    {[140,180,360,400].map((x,i)=><ellipse key={x} cx={x} cy={i%2?170:97} rx="26" ry="14" fill="#42AAB4" stroke="#247D8C" strokeWidth="2"/>)}
    <path d="M320 93L385 35M130 75L90 35" stroke="#796789" strokeWidth="2"/>
    <Text x={419} y={30}>Núcleo</Text><Text x={75} y={29}>Membrana</Text>
    <Text x={274} y={268}>Citoplasma y orgánulos</Text>
  </>;
}
function Membrane() {
  return <>
    <rect x="20" y="44" width="520" height="182" rx="20" fill="#F2EDF9"/>
    {Array.from({length:12},(_,i)=>{
      const x=44+i*43;
      return <g key={i}>
        <circle cx={x} cy="94" r="12" fill="#37A4B4"/>
        <circle cx={x} cy="182" r="12" fill="#37A4B4"/>
        <path d={"M"+(x-6)+" 106v58 M"+(x+6)+" 106v58"} stroke="#A58BCC" strokeWidth="3"/>
      </g>;
    })}
    <rect x="263" y="71" width="36" height="134" rx="17" fill="#9075C6"/>
    <rect x="275" y="80" width="12" height="116" rx="5" fill="#F8F6FC"/>
    <path d="M281 27v46m-10-10 10 10 10-10" fill="none" stroke="#253439" strokeWidth="3"/>
    <Text x={100} y={27}>Exterior</Text><Text x={440} y={252}>Interior</Text>
    <Text x={275} y={270}>Proteína de transporte</Text>
  </>;
}
function Division() {
  return <>
    <rect x="10" y="20" width="266" height="243" rx="18" fill="#F0E8FA"/>
    <rect x="286" y="20" width="266" height="243" rx="18" fill="#E4F3F5"/>
    <Text x={142} y={47}>MITOSIS</Text><Text x={419} y={47}>MEIOSIS</Text>
    <circle cx="142" cy="100" r="32" fill="#C9B4E8"/><Text x={142} y={107}>2n</Text>
    <circle cx="419" cy="100" r="32" fill="#A4D9DE"/><Text x={419} y={107}>2n</Text>
    <path d="M142 138v25m-9-9 9 9 9-9M419 138v25m-9-9 9 9 9-9" fill="none" stroke="#75618D" strokeWidth="3"/>
    {[91,193].map(x=><g key={x}><circle cx={x} cy="197" r="23" fill="#C9B4E8"/><Text x={x} y={203}>2n</Text></g>)}
    {[327,388,449,510].map(x=><g key={x}><circle cx={x} cy="197" r="21" fill="#A4D9DE"/><Text x={x} y={202}>n</Text></g>)}
    <Text x={142} y={245}>2 células diploides</Text>
    <Text x={419} y={245}>4 células haploides</Text>
  </>;
}
function Gene() {
  return <>
    {["ADN","ARN mensajero","Proteína"].map((label,i)=>{
      const x=20+i*181;
      return <g key={label}>
        <rect x={x} y="65" width="160" height="112" rx="18" fill={i===1?"#DFF2F3":"#EEE6FA"} stroke={i===1?"#37A4B4":"#9176CD"} strokeWidth="3"/>
        <Text x={x+80} y={125}>{label}</Text>
        {i<2&&<path d={"M"+(x+161)+" 122h20l-9-9m9 9-9 9"} fill="none" stroke="#6B708E" strokeWidth="3"/>}
      </g>;
    })}
    <Text x={101} y={224}>Transcripción</Text><Text x={440} y={224}>Traducción</Text>
  </>;
}
function Respiration() {
  return <>
    <rect x="12" y="79" width="135" height="108" rx="17" fill="#DFF2F3"/>
    <Text x={80} y={123}>Glucosa</Text><Text x={80} y={148}>+ Oxígeno</Text>
    <path d="M148 131h45l-10-10m10 10-10 10" stroke="#367E91" strokeWidth="3" fill="none"/>
    <rect x="198" y="66" width="169" height="135" rx="65" fill="#E8D9F5" stroke="#9176CD" strokeWidth="4"/>
    <path d="M222 132q20-45 46 0t48 0t31 0" fill="none" stroke="#9176CD" strokeWidth="7" strokeLinecap="round"/>
    <Text x={281} y={236}>Mitocondria</Text>
    <path d="M369 131h43l-10-10m10 10-10 10" stroke="#367E91" strokeWidth="3" fill="none"/>
    <rect x="417" y="79" width="132" height="108" rx="17" fill="#DFF2F3"/>
    <Text x={484} y={113}>ATP</Text><Text x={484} y={140}>CO₂ + H₂O</Text>
  </>;
}
const diagrams: Record<string, {title:string; note:string; diagram:ReactNode}> = {
  celula:{title:"Una célula eucariota",note:"Esquema simplificado: no representa tamaños reales.",diagram:<Cell/>},
  nucleo:{title:"Núcleo y nucléolo",note:"El núcleo contiene ADN; el nucléolo participa en el ensamblaje ribosómico.",diagram:<Cell/>},
  membrana:{title:"Bicapa de la membrana",note:"Cabezas hidrofílicas en contacto con el agua y colas hidrofóbicas hacia el interior.",diagram:<Membrane/>},
  transporte:{title:"Transporte de membrana",note:"La proteína transportadora puede ayudar al paso de solutos; según el mecanismo puede requerirse energía.",diagram:<Membrane/>},
  acidos:{title:"Información genética",note:"El ADN se transcribe a ARN; su información puede traducirse a proteínas.",diagram:<Gene/>},
  proteinas:{title:"Síntesis de proteínas",note:"La traducción del ARN mensajero ocurre en los ribosomas.",diagram:<Gene/>},
  reproduccion:{title:"Divisiones celulares",note:"Mitosis y meiosis producen resultados distintos.",diagram:<Division/>},
  ciclo:{title:"Mitosis frente a meiosis",note:"Esquema final: la meiosis reduce el número de cromosomas.",diagram:<Division/>},
  gametos:{title:"Reducción cromosómica",note:"En la ovogénesis la división del citoplasma es desigual; no se forman cuatro óvulos funcionales.",diagram:<Division/>},
  metabolismo:{title:"Metabolismo y energía",note:"La respiración aerobia es una ruta del metabolismo que genera ATP.",diagram:<Respiration/>},
  respiracion:{title:"Respiración celular aerobia",note:"Representación general de entradas y productos; no muestra las etapas intermedias.",diagram:<Respiration/>},
};
export default function LessonVisual({ topicId }: { topicId: string }) {
  const item=diagrams[topicId];
  if(!item)return null;
  return <figure className="panel lesson-visual">
    <h2>{item.title}</h2>
    <svg viewBox="0 0 560 285" preserveAspectRatio="xMidYMid meet" role="img" aria-label={item.title}>{item.diagram}</svg>
    <figcaption>{item.note}</figcaption>
  </figure>;
}

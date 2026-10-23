import { topics, type Topic, type Question } from "./content";

// Additional application questions, restricted to the selected curriculum topic.
// All correct answers are authored explicitly and their displayed positions
// are distributed deterministically; no remote service or AI is involved.
const extras: Record<string, [string, string, string, string, string][]> = {
  "celula": [
    ["Una célula produce menos ATP al dañarse sus mitocondrias. ¿Qué proceso resultará afectado?","Respiración aerobia","Replicación del ADN en los cloroplastos","Formación exclusiva de pared celular","Las mitocondrias participan en la producción de ATP mediante respiración aerobia."],
    ["¿Por qué un antibiótico dirigido a ribosomas bacterianos puede afectar su crecimiento?","Porque dificulta fabricar proteínas","Porque destruye el núcleo bacteriano","Porque elimina los cloroplastos","Las bacterias requieren ribosomas para sintetizar proteínas y crecer."],
  ],
  "nucleo": [
    ["Si se bloquearan los poros nucleares, ¿qué proceso se dificultaría?","La salida de ARN mensajero al citoplasma","La entrada de glucosa en la mitocondria","La fotosíntesis de bacterias","El ARN mensajero debe cruzar los poros nucleares para alcanzar los ribosomas."],
    ["¿Cuál sería una consecuencia de reducir la formación de ARN ribosómico?","Menor ensamblaje de subunidades ribosómicas","Más cloroplastos en células animales","Desaparición inmediata de la membrana plasmática","El nucléolo produce ARN ribosómico necesario para formar subunidades de ribosomas."],
  ],
  "membrana": [
    ["¿Qué atraviesa más fácilmente la bicapa lipídica sin transportadores?","Una molécula pequeña no polar","Un ion cargado de sodio","Una proteína grande hidrofílica","Las moléculas pequeñas no polares atraviesan más fácilmente el interior hidrofóbico de la bicapa."],
    ["Una membrana pierde sus proteínas de transporte. ¿Qué función se altera?","El paso selectivo de solutos que necesitan transportadores","La existencia de ADN en el núcleo","La construcción directa de cromosomas","Las proteínas de membrana facilitan el intercambio selectivo de ciertas sustancias."],
  ],
  "transporte": [
    ["Una célula se coloca en un medio hipertónico. ¿Qué tiende a ocurrir?","Pierde agua por ósmosis","Gana agua hasta romperse siempre","Deja de tener membrana","El agua se desplaza hacia el medio con mayor concentración efectiva de solutos."],
    ["¿Qué distingue al transporte activo primario?","Usa directamente energía del ATP para mover sustancias","Siempre ocurre a favor de gradiente sin energía","Solo permite atravesar gases no polares","Bombas como la sodio-potasio utilizan ATP para mover iones contra gradientes."],
  ],
  "acidos": [
    ["Una molécula contiene uracilo y ribosa. ¿Qué es más probable que sea?","ARN","ADN convencional","Triglicérido","El ARN normalmente contiene ribosa y la base uracilo, a diferencia del ADN."],
    ["¿Qué vínculo mantiene unidas las dos hebras complementarias del ADN?","Puentes de hidrógeno entre bases","Enlaces peptídicos entre aminoácidos","Puentes disulfuro entre lípidos","Las bases nitrogenadas complementarias se unen mediante puentes de hidrógeno."],
  ],
  "proteinas": [
    ["Si cambia un codón del ARNm, ¿qué podría modificarse?","El aminoácido incorporado a la proteína","La composición del agua","La cantidad de cromosomas siempre","Un cambio en el codón puede alterar el aminoácido o ser silencioso según el código genético."],
    ["¿Qué función cumple el ARNt durante la traducción?","Transporta aminoácidos y reconoce codones mediante anticodones","Copia directamente todo el ADN nuclear","Forma la membrana plasmática","El ARNt lleva aminoácidos al ribosoma y empareja su anticodón con el ARNm."],
  ],
  "reproduccion": [
    ["Una descendencia generada por fecundación suele tener variabilidad genética porque:","Combina material genético de gametos","Siempre es idéntica a un progenitor","Carece de ADN","La reproducción sexual reúne información genética de dos gametos y contribuye a la variabilidad."],
    ["¿Cuál es una ventaja potencial de la reproducción asexual?","Puede producir descendencia sin pareja reproductiva","Siempre genera más diversidad genética que la sexual","Requiere siempre la unión de gametos","La reproducción asexual puede ocurrir desde un solo organismo sin fecundación."],
  ],
  "ciclo": [
    ["Una célula replica su ADN antes de dividirse. ¿En qué fase ocurre?","Fase S de la interfase","Citocinesis después de la división","Metafase II exclusivamente","La replicación del ADN ocurre en la fase S antes de entrar en mitosis o meiosis."],
    ["¿Por qué la meiosis reduce el número de cromosomas?","Separa cromosomas homólogos en la primera división","Duplica permanentemente el número de cromosomas","Elimina todas las proteínas celulares","La meiosis I separa los homólogos y permite formar células haploides."],
  ],
  "gametos": [
    ["¿Qué resultado produce normalmente una meiosis en espermatogénesis?","Cuatro células haploides que maduran a espermatozoides","Una sola célula diploide idéntica","Dos células somáticas diploides","La espermatogénesis produce cuatro células haploides que pueden diferenciarse."],
    ["¿Por qué el óvulo aporta más citoplasma que un espermatozoide?","La ovogénesis distribuye el citoplasma de forma desigual","Porque nunca pasa por meiosis","Porque contiene el doble de cromosomas","La formación del óvulo conserva la mayor parte del citoplasma en una sola célula."],
  ],
  "metabolismo": [
    ["Una enzima pierde su forma por temperatura extrema. ¿Qué suele suceder?","Disminuye su actividad catalítica","Se convierte automáticamente en ADN","Aumenta siempre la fotosíntesis","La estructura tridimensional de una enzima es esencial para su función catalítica."],
    ["¿Qué caracteriza al catabolismo?","Descompone moléculas y libera energía utilizable","Siempre forma moléculas complejas gastando energía","Solo ocurre en organismos vegetales","Las rutas catabólicas degradan sustancias y permiten obtener energía."],
  ],
  "respiracion": [
    ["Si falta oxígeno en una célula que depende de respiración aerobia, ¿qué ocurre?","Disminuye la producción aerobia de ATP","Aumenta indefinidamente la cadena respiratoria","Se produce fotosíntesis en mitocondrias","El oxígeno actúa como aceptor final de electrones en respiración aerobia."],
    ["¿Dónde ocurre principalmente el ciclo de Krebs en células eucariotas?","Matriz mitocondrial","Nucléolo","Exterior de la membrana plasmática","En eucariotas, el ciclo de Krebs ocurre principalmente en la matriz mitocondrial."],
  ],
  "aparatos": [
    ["¿Cuál es la función principal de las trompas uterinas?","Transportar el ovocito y albergar habitualmente la fecundación","Producir testosterona en testículos","Almacenar la orina","La fecundación suele ocurrir en la trompa uterina, que participa en el transporte del ovocito."],
    ["¿Qué estructuras producen los espermatozoides?","Túbulos seminíferos en los testículos","Vesículas seminales exclusivamente","Próstata exclusivamente","La espermatogénesis se desarrolla en los túbulos seminíferos de los testículos."],
  ],
  "desarrollo": [
    ["¿Qué estructura permite intercambio de nutrientes y gases entre madre y feto?","La placenta","La vesícula biliar fetal","El cristalino","La placenta participa en el intercambio de oxígeno, nutrientes y desechos sin mezclar normalmente la sangre directamente."],
    ["¿Qué caracteriza especialmente a la etapa embrionaria temprana?","La formación inicial de órganos y estructuras","La madurez pulmonar completa","La independencia inmediata del recién nacido","Durante la organogénesis embrionaria se establecen estructuras fundamentales del cuerpo."],
  ],
  "cancer": [
    ["Un resultado de tamizaje anormal implica:","Necesidad de valoración y posibles pruebas confirmatorias","Diagnóstico definitivo de cáncer","Que no se requiere seguimiento","El tamizaje identifica indicios y necesita evaluación posterior para confirmar diagnósticos."],
    ["¿Por qué la vacuna contra el VPH puede prevenir algunos cánceres?","Reduce infecciones por tipos de VPH asociados a cáncer","Elimina cualquier tumor ya formado","Sustituye todos los controles médicos","La vacunación evita infecciones que pueden provocar ciertos tipos de cáncer."],
  ],
  "anticonceptivos": [
    ["¿Qué medida reduce simultáneamente el riesgo de embarazo e ITS?","Uso correcto y constante del preservativo","Tomar antibióticos antes de cada relación","Usar únicamente un DIU","El preservativo contribuye a prevenir embarazos y muchas infecciones de transmisión sexual."],
    ["¿Qué es importante al elegir un método anticonceptivo?","Considerar salud, eficacia, preferencias y asesoramiento informado","Elegir siempre el método que usa otra persona","Asumir que todos previenen ITS","La elección informada considera necesidades personales, características del método y salud."],
  ],
};

function rotate(question: Question, index: number): Question {
  const offset = [...question.prompt].reduce(
    (sum, character) => sum + character.charCodeAt(0),
    index + 1,
  ) % 3;
  const options = question.options;
  return {
    ...question,
    options: options.map((_, i) => options[(i + offset) % 3]),
    correct: (question.correct - offset + 3) % 3,
  };
}

export function challengeQuestions(topic: Topic): Question[] {
  const additional = extras[topic.id];
  if (!additional || additional.length !== 2) {
    throw new Error(`Faltan preguntas avanzadas para: ${topic.id}`);
  }
  return [
    topic.advanced,
    ...additional.map(([prompt, correct, wrongA, wrongB, explanation]) => ({
      prompt,
      options: [correct, wrongA, wrongB],
      correct: 0,
      explanation,
    })),
  ].map(rotate);
}

export function validateChallengeBanks() {
  return topics.every((topic) => challengeQuestions(topic).length === 3);
}

export type Question = {
  prompt: string;
  options: string[];
  correct: number;
  explanation: string;
};
export type Topic = {
  id: string;
  unit: number;
  title: string;
  sections: { title: string; text: string }[];
  questions: Question[];
  advanced: Question;
  flow: string[];
};
export const units = [
  {
    id: 1,
    title: "Biología de la vida",
    subtitle: "Un universo dentro de ti",
    description:
      "Explora las pequeñas estructuras que hacen posible algo extraordinario: la vida.",
    color: "violet",
    symbol: "cell",
  },
  {
    id: 2,
    title: "Reproducción celular",
    subtitle: "La vida se multiplica",
    description:
      "Descubre cómo las células se dividen, se transforman y obtienen energía.",
    color: "teal",
    symbol: "dna",
  },
  {
    id: 3,
    title: "Salud sexual y reproductiva",
    subtitle: "Conocer para cuidarnos",
    description:
      "Comprende el cuerpo humano y toma decisiones informadas sobre tu salud.",
    color: "rose",
    symbol: "heart",
  },
  {
    id: 4,
    title: "Sexualidad humana integral",
    subtitle: "Decisiones con conciencia",
    description:
      "Aprende sobre anticoncepción, prevención y cuidado compartido.",
    color: "amber",
    symbol: "leaf",
  },
];
function topic(
  id: string,
  unit: number,
  title: string,
  sections: [string, string][],
  facts: [string, string, string, string, string][],
  flow: string[],
  advanced: [string, string, string, string, string],
): Topic {
  const q = (
    f: [string, string, string, string, string],
    i: number,
  ): Question => ({
    prompt: f[0],
    options: i % 2 ? [f[2], f[1], f[3]] : [f[1], f[2], f[3]],
    correct: i % 2 ? 1 : 0,
    explanation: f[4],
  });
  return {
    id,
    unit,
    title,
    sections: sections.map(([title, text]) => ({ title, text })),
    questions: facts.map(q),
    flow,
    advanced: q(advanced, 1),
  };
}
export const topics: Topic[] = [
  topic(
    "celula",
    1,
    "La célula",
    [
      [
        "La unidad de la vida",
        "Todos los seres vivos están formados por una o más células. La célula es la unidad mínima capaz de realizar las funciones vitales: intercambiar materia y energía, responder al entorno y reproducirse. Toda célula procede de otra célula.",
      ],
      [
        "Dos formas de organización",
        "Las procariotas, como las bacterias, carecen de núcleo delimitado por membrana: su ADN está en el nucleoide. Las eucariotas poseen núcleo y compartimentos llamados orgánulos. Animales, plantas, hongos y protistas son eucariotas.",
      ],
      [
        "Un equipo microscópico",
        "La membrana regula el intercambio; el citoplasma alberga reacciones; los ribosomas fabrican proteínas y las mitocondrias participan en la respiración aerobia. Las células vegetales tienen pared de celulosa, una gran vacuola y, en tejidos fotosintéticos, cloroplastos.",
      ],
    ],
    [
      [
        "¿Cuál es la unidad básica de los seres vivos?",
        "La célula",
        "El órgano",
        "El átomo",
        "Las células realizan las funciones vitales y forman todos los organismos.",
      ],
      [
        "¿Qué estructura está presente en bacterias?",
        "Ribosomas",
        "Núcleo membranoso",
        "Cloroplastos",
        "Las bacterias tienen ribosomas, pero no un núcleo delimitado.",
      ],
      [
        "¿Qué orgánulo realiza la fotosíntesis?",
        "Cloroplasto",
        "Lisosoma",
        "Nucléolo",
        "Los cloroplastos captan energía luminosa en células fotosintéticas.",
      ],
    ],
    ["Membrana", "Citoplasma", "Núcleo"],
    [
      "Una célula tiene ADN pero carece de núcleo. ¿Qué puedes concluir?",
      "Puede ser procariota",
      "No es una célula",
      "Es necesariamente vegetal",
      "Las procariotas poseen ADN sin una envoltura nuclear.",
    ],
  ),
  topic(
    "nucleo",
    1,
    "Núcleo y nucléolo",
    [
      [
        "El archivo celular",
        "El núcleo eucariota contiene la mayor parte del ADN. La cromatina combina ADN y proteínas; al dividirse la célula se condensa formando cromosomas. Los genes contienen instrucciones para producir ARN y proteínas.",
      ],
      [
        "Una frontera con puertas",
        "La envoltura nuclear tiene dos membranas y poros que controlan el paso de moléculas. El ARN mensajero sale al citoplasma y muchas proteínas nucleares ingresan por estos poros.",
      ],
      [
        "El taller del nucléolo",
        "El nucléolo es una región sin membrana donde se produce gran parte del ARN ribosómico y se ensamblan subunidades de los ribosomas. Estas salen al citoplasma, donde participan en la síntesis de proteínas.",
      ],
    ],
    [
      [
        "¿Qué almacena principalmente el núcleo?",
        "ADN",
        "Bilis",
        "Almidón",
        "El núcleo contiene la mayor parte del ADN eucariota.",
      ],
      [
        "¿Qué se ensambla en el nucléolo?",
        "Subunidades ribosómicas",
        "Mitocondrias",
        "Membranas celulares",
        "El nucléolo participa en la formación de ribosomas.",
      ],
      [
        "¿Por dónde sale el ARN del núcleo?",
        "Poros nucleares",
        "Pared celular",
        "Cloroplastos",
        "Los poros regulan el intercambio entre núcleo y citoplasma.",
      ],
    ],
    ["ADN", "ARN", "Poros nucleares"],
    [
      "Una célula produce muchas proteínas. ¿Qué región puede ser muy activa?",
      "Nucléolo",
      "Pared de celulosa",
      "Vacuola exclusivamente",
      "Una alta producción de ribosomas requiere actividad nucleolar.",
    ],
  ),
  topic(
    "membrana",
    1,
    "Membrana celular",
    [
      [
        "Una frontera dinámica",
        "La membrana plasmática delimita todas las células. Su bicapa de fosfolípidos tiene cabezas hidrofílicas orientadas al agua y colas hidrofóbicas hacia el interior.",
      ],
      [
        "Mosaico fluido",
        "Proteínas y lípidos se mueven lateralmente. Algunas proteínas transportan sustancias; otras reciben señales o actúan como enzimas. En células animales, el colesterol ayuda a modular la fluidez.",
      ],
      [
        "Reconocimiento y equilibrio",
        "Los carbohidratos unidos a lípidos o proteínas intervienen en el reconocimiento celular. La permeabilidad selectiva permite mantener condiciones internas distintas de las externas. La membrana no es una pared rígida.",
      ],
    ],
    [
      [
        "¿Cuál es la base de la membrana?",
        "Bicapa de fosfolípidos",
        "Capa de ADN",
        "Pared de hueso",
        "Los fosfolípidos forman la barrera básica.",
      ],
      [
        "¿Hacia dónde se orientan las colas hidrofóbicas?",
        "Al interior de la bicapa",
        "Hacia el agua exterior",
        "Hacia el núcleo solamente",
        "Las colas evitan el contacto directo con el agua.",
      ],
      [
        "¿Qué significa permeabilidad selectiva?",
        "Regula qué sustancias atraviesan",
        "Deja pasar todo",
        "No deja pasar nada",
        "El paso depende de propiedades moleculares y proteínas de transporte.",
      ],
    ],
    ["Medio externo", "Bicapa lipídica", "Citoplasma"],
    [
      "Una molécula polar grande no cruza la bicapa sola. ¿Qué podría necesitar?",
      "Una proteína transportadora",
      "Transformarse en ADN",
      "Una pared más gruesa",
      "Las proteínas facilitan el paso de muchas sustancias polares.",
    ],
  ),
  topic(
    "transporte",
    1,
    "Transporte a través de la membrana plasmática",
    [
      [
        "A favor del gradiente",
        "En la difusión, las partículas se desplazan de mayor a menor concentración. La difusión simple atraviesa la bicapa; la facilitada usa canales o transportadores. Ninguna requiere gasto directo de ATP.",
      ],
      [
        "El viaje del agua",
        "La ósmosis es el movimiento neto de agua a través de una membrana selectiva hacia el lado con mayor concentración de solutos que no la atraviesan. Una célula animal puede hincharse en un medio hipotónico y perder agua en uno hipertónico.",
      ],
      [
        "Contra el gradiente",
        "El transporte activo requiere energía directa o indirecta para mover sustancias contra su gradiente. La bomba sodio-potasio utiliza ATP. En endocitosis y exocitosis, vesículas incorporan o liberan materiales.",
      ],
    ],
    [
      [
        "¿Qué transporte requiere energía para ir contra el gradiente?",
        "Transporte activo",
        "Difusión simple",
        "Ósmosis",
        "Mover sustancias contra su gradiente necesita energía.",
      ],
      [
        "¿Qué se mueve en la ósmosis?",
        "Agua",
        "Cromosomas",
        "Ribosomas",
        "La ósmosis describe el movimiento neto de agua.",
      ],
      [
        "¿Qué proceso incorpora material en vesículas?",
        "Endocitosis",
        "Exocitosis",
        "Traducción",
        "La membrana se invagina para incorporar materiales.",
      ],
    ],
    ["Mayor concentración", "Membrana", "Menor concentración"],
    [
      "Una célula animal pierde agua en una solución. ¿Cómo es el medio respecto a ella?",
      "Hipertónico",
      "Hipotónico",
      "Siempre isotónico",
      "Un medio hipertónico favorece la salida neta de agua.",
    ],
  ),
  topic(
    "acidos",
    1,
    "Estructura y propiedades de los ácidos nucleicos",
    [
      [
        "El alfabeto molecular",
        "ADN y ARN son polímeros de nucleótidos. Cada nucleótido contiene un fosfato, un azúcar y una base nitrogenada. El ADN usa desoxirribosa y el ARN, ribosa.",
      ],
      [
        "Dos moléculas relacionadas",
        "El ADN suele formar una doble hélice de cadenas antiparalelas. Sus bases son A, T, C y G; A se aparea con T y C con G. El ARN suele ser monocatenario y usa uracilo en lugar de timina.",
      ],
      [
        "Información que se conserva",
        "La secuencia de bases contiene información genética. La complementariedad permite copiar el ADN antes de la división. ARN mensajero, ribosómico y de transferencia cumplen funciones distintas en la expresión de genes.",
      ],
    ],
    [
      [
        "¿Cuál es la unidad de los ácidos nucleicos?",
        "Nucleótido",
        "Aminoácido",
        "Ácido graso",
        "Los nucleótidos se enlazan formando ADN o ARN.",
      ],
      [
        "¿Qué base sustituye a la timina en el ARN?",
        "Uracilo",
        "Guanina",
        "Citosina",
        "El ARN usa uracilo, además de A, C y G.",
      ],
      [
        "¿Qué base se aparea con guanina en el ADN?",
        "Citosina",
        "Adenina",
        "Timina",
        "Las parejas complementarias son A-T y C-G.",
      ],
    ],
    ["Nucleótidos", "Secuencia", "Información genética"],
    [
      "Una hebra de ADN tiene ACG. ¿Cuál es su secuencia complementaria?",
      "TGC",
      "ACG",
      "UGC",
      "En ADN, A se aparea con T, C con G y G con C.",
    ],
  ),
  topic(
    "proteinas",
    1,
    "Síntesis de proteínas",
    [
      [
        "Transcripción",
        "La ARN polimerasa utiliza una hebra de ADN como molde para sintetizar ARN. En eucariotas, el ARN mensajero se procesa en el núcleo antes de llegar al citoplasma. No todo el ADN codifica proteínas.",
      ],
      [
        "Traducción",
        "El ribosoma lee el ARN mensajero en grupos de tres bases llamados codones. Los ARN de transferencia llevan aminoácidos y sus anticodones reconocen los codones correspondientes.",
      ],
      [
        "De cadena a función",
        "Los aminoácidos se unen mediante enlaces peptídicos. Un codón de terminación detiene la traducción. La cadena se pliega y a veces se modifica para funcionar como enzima, receptor o componente estructural.",
      ],
    ],
    [
      [
        "¿Qué se produce durante la transcripción?",
        "ARN",
        "Una célula hija",
        "Glucosa",
        "La transcripción copia información de ADN a ARN.",
      ],
      [
        "¿Dónde ocurre la traducción?",
        "En ribosomas",
        "En el nucléolo exclusivamente",
        "En la pared celular",
        "Los ribosomas leen el ARN mensajero.",
      ],
      [
        "¿Cuántas bases tiene un codón?",
        "Tres",
        "Dos",
        "Seis",
        "Cada codón está formado por tres nucleótidos.",
      ],
    ],
    ["ADN", "ARN mensajero", "Proteína"],
    [
      "Una mutación cambia un codón pero no el aminoácido. ¿Por qué es posible?",
      "Varios codones pueden codificar el mismo aminoácido",
      "El ADN nunca influye",
      "Cada codón tiene un solo nucleótido",
      "El código genético es redundante: varios codones pueden tener igual significado.",
    ],
  ),
  topic(
    "reproduccion",
    2,
    "Reproducción sexual y asexual",
    [
      [
        "Continuidad de la vida",
        "La reproducción permite formar nuevos organismos. En la asexual no hay fusión de gametos: participan procesos como fisión binaria, gemación o fragmentación. Los descendientes suelen ser genéticamente muy similares al progenitor, salvo mutaciones.",
      ],
      [
        "Combinación genética",
        "La reproducción sexual implica unión de gametos durante la fecundación. La meiosis y la fecundación contribuyen a la diversidad genética. No siempre requiere dos individuos: algunos organismos pueden autofecundarse.",
      ],
      [
        "Estrategias y ambiente",
        "La reproducción asexual puede ser rápida en ambientes favorables. La diversidad sexual puede ayudar a una población ante cambios ambientales. Ninguna estrategia es universalmente superior; dependen del organismo y del entorno.",
      ],
    ],
    [
      [
        "¿Qué caracteriza a la reproducción sexual?",
        "Fusión de gametos",
        "Ausencia de ADN",
        "Siempre gemación",
        "La fecundación une gametos.",
      ],
      [
        "¿Cuál es un ejemplo de reproducción asexual?",
        "Gemación",
        "Fecundación",
        "Unión de óvulo y espermatozoide",
        "La gemación forma un nuevo organismo sin fusión de gametos.",
      ],
      [
        "¿Qué suele aumentar con la reproducción sexual?",
        "Diversidad genética",
        "Identidad absoluta",
        "Ausencia de variación",
        "Meiosis y fecundación combinan información genética.",
      ],
    ],
    ["Gametos", "Fecundación", "Descendencia"],
    [
      "¿Los descendientes asexuales son siempre idénticos?",
      "No, pueden ocurrir mutaciones",
      "Sí, sin excepción",
      "No tienen material genético",
      "Las mutaciones pueden introducir variación aun sin reproducción sexual.",
    ],
  ),
  topic(
    "ciclo",
    2,
    "Reproducción celular: ciclo celular, mitosis y meiosis",
    [
      [
        "Preparar antes de dividir",
        "En G1 la célula crece; en S replica su ADN; en G2 se prepara para la división. Estas etapas forman la interfase. Los puntos de control ayudan a detener el ciclo si hay problemas.",
      ],
      [
        "Mitosis y citocinesis",
        "En profase los cromosomas se condensan; en metafase se alinean; en anafase se separan las cromátidas hermanas; en telofase se reorganizan los núcleos. La citocinesis divide el citoplasma. Normalmente se conservan el número cromosómico y la información genética.",
      ],
      [
        "Meiosis y diversidad",
        "La meiosis tiene dos divisiones tras una sola replicación de ADN. En meiosis I se separan cromosomas homólogos; en meiosis II, cromátidas hermanas. Reduce a la mitad el número cromosómico y genera diversidad mediante recombinación y distribución independiente.",
      ],
    ],
    [
      [
        "¿En qué fase se replica el ADN?",
        "Fase S",
        "G1",
        "Telofase",
        "La síntesis de ADN ocurre durante la fase S de la interfase.",
      ],
      [
        "¿Qué se separa en meiosis I?",
        "Cromosomas homólogos",
        "Células completas",
        "Ribosomas",
        "Los homólogos se separan en la primera división meiótica.",
      ],
      [
        "¿Qué divide el citoplasma?",
        "Citocinesis",
        "Transcripción",
        "Replicación",
        "La citocinesis separa físicamente las células hijas.",
      ],
    ],
    ["G1 → S → G2", "División nuclear", "Citocinesis"],
    [
      "Una célula humana diploide tiene 46 cromosomas. ¿Cuántos tendrá un gameto normal?",
      "23",
      "46",
      "92",
      "La meiosis reduce de 2n a n: de 46 a 23 en humanos.",
    ],
  ),
  topic(
    "gametos",
    2,
    "Gametogénesis",
    [
      [
        "Formar células sexuales",
        "La gametogénesis produce gametos haploides mediante meiosis y diferenciación. En humanos, los testículos producen espermatozoides y los ovarios contienen células que maduran en el proceso de ovogénesis.",
      ],
      [
        "Espermatogénesis",
        "Desde la pubertad, células germinales de los túbulos seminíferos originan espermatocitos. La meiosis forma células haploides que se diferencian en espermatozoides con cabeza, pieza intermedia y flagelo.",
      ],
      [
        "Ovogénesis",
        "Comienza antes del nacimiento y presenta pausas prolongadas. La distribución desigual del citoplasma produce una célula grande y cuerpos polares. El ovocito secundario completa la meiosis II si ocurre fecundación.",
      ],
    ],
    [
      [
        "¿Qué número cromosómico tienen los gametos normales?",
        "Haploide",
        "Diploide",
        "Siempre cuatro juegos",
        "Los gametos tienen un solo juego de cromosomas.",
      ],
      [
        "¿Dónde ocurre la espermatogénesis humana?",
        "Testículos",
        "Próstata",
        "Vejiga",
        "Se desarrolla en los túbulos seminíferos testiculares.",
      ],
      [
        "¿Cómo se distribuye el citoplasma en la ovogénesis?",
        "De forma desigual",
        "Siempre por igual",
        "No existe citoplasma",
        "La mayor parte se conserva en una célula.",
      ],
    ],
    ["Célula germinal", "Meiosis", "Gameto haploide"],
    [
      "¿Qué desencadena completar la meiosis II del ovocito humano?",
      "La fecundación",
      "La respiración pulmonar",
      "La mitosis de una bacteria",
      "El ovocito secundario termina meiosis II al ser fecundado.",
    ],
  ),
  topic(
    "metabolismo",
    2,
    "Metabolismo celular",
    [
      [
        "Una red de reacciones",
        "El metabolismo reúne todas las reacciones químicas celulares. Las vías metabólicas transforman moléculas en una secuencia regulada. Las enzimas aceleran reacciones al reducir la energía de activación, sin consumirse en ellas.",
      ],
      [
        "Construir y descomponer",
        "El catabolismo degrada moléculas y permite liberar energía aprovechable. El anabolismo construye moléculas complejas y requiere energía. Ambos procesos están conectados: los productos de uno pueden alimentar al otro.",
      ],
      [
        "ATP y regulación",
        "El ATP transfiere energía para procesos como transporte activo y síntesis. No es una reserva ilimitada: se regenera continuamente a partir de ADP. La actividad enzimática depende de factores como temperatura, pH y disponibilidad de sustratos.",
      ],
    ],
    [
      [
        "¿Qué hace una enzima?",
        "Reduce la energía de activación",
        "Se consume siempre",
        "Crea energía de la nada",
        "Las enzimas aceleran reacciones sin alterar su balance energético.",
      ],
      [
        "¿Qué proceso construye moléculas complejas?",
        "Anabolismo",
        "Catabolismo",
        "Difusión",
        "El anabolismo requiere energía para sintetizar moléculas.",
      ],
      [
        "¿Qué molécula transfiere energía de uso inmediato?",
        "ATP",
        "Celulosa",
        "ADN exclusivamente",
        "El ATP acopla reacciones que liberan y requieren energía.",
      ],
    ],
    ["Nutrientes", "Reacciones enzimáticas", "ATP y biomoléculas"],
    [
      "Una enzima pierde su forma por calor intenso. ¿Qué puede ocurrir?",
      "Disminuye su actividad",
      "Duplica siempre su velocidad",
      "Se convierte en ADN",
      "La desnaturalización puede alterar el sitio activo.",
    ],
  ),
  topic(
    "respiracion",
    2,
    "Respiración celular",
    [
      [
        "Energía de los nutrientes",
        "La respiración celular transforma energía química de nutrientes en ATP. No es lo mismo que respirar aire: la ventilación facilita el intercambio gaseoso del organismo; la respiración celular ocurre dentro de las células.",
      ],
      [
        "Etapas de la respiración aerobia",
        "La glucólisis ocurre en el citoplasma y produce piruvato. En eucariotas, la oxidación del piruvato y el ciclo de Krebs ocurren en la matriz mitocondrial. La cadena de transporte de electrones está en la membrana mitocondrial interna.",
      ],
      [
        "Oxígeno y fermentación",
        "El oxígeno acepta electrones al final de la cadena y se forma agua. El gradiente de protones impulsa la ATP sintasa. Si no se utiliza esa cadena, la fermentación regenera NAD+ y permite continuar la glucólisis, con mucho menor rendimiento energético.",
      ],
    ],
    [
      [
        "¿Dónde ocurre la glucólisis?",
        "Citoplasma",
        "Núcleo",
        "Matriz exclusivamente",
        "La glucólisis no necesita estar dentro de una mitocondria.",
      ],
      [
        "¿Qué papel tiene el oxígeno en la cadena respiratoria?",
        "Aceptor final de electrones",
        "Fabricar ADN",
        "Romper ribosomas",
        "El oxígeno recibe electrones y contribuye a formar agua.",
      ],
      [
        "¿Qué produce directamente la ATP sintasa?",
        "ATP",
        "Cromosomas",
        "Celulosa",
        "La ATP sintasa aprovecha un gradiente de protones.",
      ],
    ],
    ["Glucólisis", "Ciclo de Krebs", "Cadena respiratoria"],
    [
      "¿Por qué la fermentación permite continuar la glucólisis?",
      "Regenera NAD+",
      "Produce oxígeno",
      "Reemplaza el ADN",
      "El NAD+ es necesario para que continúe la oxidación en glucólisis.",
    ],
  ),
  topic(
    "aparatos",
    3,
    "Aparato reproductor masculino y femenino",
    [
      [
        "Estructuras y funciones",
        "En la anatomía reproductiva masculina, los testículos producen espermatozoides y hormonas como testosterona. Los espermatozoides maduran en el epidídimo y viajan por conductos deferentes; las glándulas aportan líquido seminal. La uretra es una vía de salida.",
      ],
      [
        "Anatomía reproductiva femenina",
        "Los ovarios contienen ovocitos y producen hormonas como estrógenos y progesterona. Las trompas uterinas transportan el ovocito y suelen ser el lugar de fecundación. El útero puede alojar el embarazo; el cuello uterino conecta con la vagina. La vulva corresponde a los genitales externos.",
      ],
      [
        "Conocer y respetar",
        "El ciclo menstrual incluye cambios ováricos y del endometrio regulados por hormonas. Su duración puede variar y no todas las personas tienen ciclos de 28 días. La anatomía no define la identidad, el valor ni las capacidades de una persona. El consentimiento y el respeto son esenciales.",
      ],
    ],
    [
      [
        "¿Dónde se producen los espermatozoides?",
        "Testículos",
        "Próstata",
        "Vejiga",
        "Los testículos contienen túbulos seminíferos.",
      ],
      [
        "¿Dónde suele ocurrir la fecundación?",
        "Trompa uterina",
        "Vagina",
        "Vulva",
        "Habitualmente ocurre en una trompa uterina.",
      ],
      [
        "¿Cómo se llaman los genitales externos femeninos?",
        "Vulva",
        "Útero",
        "Endometrio",
        "Vulva y vagina designan estructuras diferentes.",
      ],
    ],
    ["Gónadas", "Gametos y hormonas", "Función reproductiva"],
    [
      "¿Un ciclo diferente de 28 días es siempre una enfermedad?",
      "No, existe variación",
      "Sí, en todos los casos",
      "Solo dura 7 días",
      "Los ciclos varían; los síntomas o preocupaciones se consultan con personal de salud.",
    ],
  ),
  topic(
    "desarrollo",
    3,
    "Desarrollo embrionario y fetal",
    [
      [
        "De cigoto a implantación",
        "La fecundación une gametos y origina un cigoto. Divisiones mitóticas sucesivas producen una mórula y después un blastocisto, que puede implantarse en el endometrio. La fecundación y la implantación son procesos distintos.",
      ],
      [
        "Etapa embrionaria",
        "Durante las primeras ocho semanas después de la fecundación se establecen los principales esbozos de órganos. La gastrulación origina tres capas: ectodermo, mesodermo y endodermo, que contribuyen a diferentes tejidos.",
      ],
      [
        "Etapa fetal y cuidado",
        "Desde la novena semana tras la fecundación se habla de feto; predominan crecimiento y maduración. La placenta permite intercambiar gases, nutrientes y desechos sin que normalmente se mezclen directamente ambas sangres. La edad gestacional clínica suele contarse desde la última menstruación, unas dos semanas antes de la fecundación. El control prenatal orienta el cuidado.",
      ],
    ],
    [
      [
        "¿Qué célula surge de la fecundación?",
        "Cigoto",
        "Neurona",
        "Glóbulo rojo",
        "El cigoto contiene la información genética de ambos gametos.",
      ],
      [
        "¿Dónde se implanta normalmente el blastocisto?",
        "Endometrio",
        "Ovario",
        "Vagina",
        "La implantación ocurre en el revestimiento del útero.",
      ],
      [
        "¿Qué estructura facilita el intercambio maternofetal?",
        "Placenta",
        "Vejiga",
        "Epidídimo",
        "La placenta facilita el intercambio sin mezcla directa habitual de sangre.",
      ],
    ],
    ["Cigoto", "Blastocisto", "Embrión → feto"],
    [
      "¿Por qué edad gestacional y edad desde fecundación pueden diferir?",
      "Se cuentan desde referencias distintas",
      "El ADN cambia cada semana",
      "La implantación ocurre antes de fecundar",
      "La edad gestacional clínica se cuenta desde la última menstruación.",
    ],
  ),
  topic(
    "cancer",
    3,
    "Cáncer en mujeres y varones",
    [
      [
        "Cuando falla el control",
        "El cáncer comprende enfermedades en las que células alteradas se multiplican sin control y pueden invadir tejidos. Algunas se diseminan a otros lugares: metástasis. No todo tumor es maligno y no todos los cánceres forman tumores sólidos.",
      ],
      [
        "Prevención basada en evidencia",
        "Evitar tabaco, protegerse del sol y mantener hábitos saludables ayuda a reducir riesgos, sin eliminarlos por completo. La vacunación contra VPH previene infecciones que pueden causar varios cánceres; no trata un cáncer ya existente. El cáncer puede afectar a personas de distintos sexos; los órganos presentes también influyen en el riesgo.",
      ],
      [
        "Detección y atención",
        "El cáncer de mama, cuello uterino, próstata y testículo afecta órganos diferentes. El tamizaje busca enfermedad o lesiones antes de los síntomas y depende de edad, riesgo y guías locales. Una lesión persistente o cambio inusual merece consulta profesional; un síntoma aislado no confirma cáncer.",
      ],
    ],
    [
      [
        "¿Qué caracteriza al cáncer?",
        "Crecimiento celular descontrolado",
        "Toda división normal",
        "Una infección siempre contagiosa",
        "Las alteraciones permiten proliferación e invasión de tejidos.",
      ],
      [
        "¿Qué puede prevenir la vacuna contra VPH?",
        "Infecciones asociadas a algunos cánceres",
        "Todos los cánceres",
        "Una fractura",
        "La vacuna previene infecciones por tipos de VPH; no trata cáncer existente.",
      ],
      [
        "¿Qué es metástasis?",
        "Diseminación a otros sitios",
        "Reparación de ADN",
        "División normal",
        "Las células malignas pueden alcanzar otros órganos.",
      ],
    ],
    ["Alteración celular", "Proliferación", "Posible invasión"],
    [
      "¿Una prueba de tamizaje positiva confirma por sí sola cáncer?",
      "No, requiere evaluación posterior",
      "Sí, siempre",
      "No necesita seguimiento",
      "El tamizaje identifica posibles alteraciones que requieren valoración clínica.",
    ],
  ),
  topic(
    "anticonceptivos",
    4,
    "Métodos anticonceptivos",
    [
      [
        "Decisiones informadas",
        "La anticoncepción permite prevenir embarazos. Elegir un método depende de necesidades, salud y preferencias, con información clara y atención profesional. El consentimiento debe ser libre, informado y reversible; ninguna persona debe ser presionada a una relación o a usar un método.",
      ],
      [
        "Métodos y mecanismos",
        "Los preservativos forman una barrera; las píldoras, implantes y otros métodos hormonales modifican procesos como la ovulación o el moco cervical. El DIU de cobre dificulta la fecundación y el DIU hormonal modifica principalmente el moco cervical y el entorno uterino. Los métodos permanentes requieren una decisión informada.",
      ],
      [
        "Protección compartida",
        "Los preservativos usados correcta y consistentemente reducen el riesgo de embarazo y muchas infecciones de transmisión sexual, aunque no eliminan todo riesgo. Otros anticonceptivos no protegen frente a ITS. La doble protección combina preservativo con otro método eficaz. La anticoncepción de emergencia se utiliza después de una relación sin protección o un fallo, cuanto antes; no interrumpe un embarazo establecido.",
      ],
    ],
    [
      [
        "¿Qué método también reduce el riesgo de muchas ITS?",
        "Preservativo",
        "Píldora",
        "DIU",
        "Los preservativos aportan protección frente a muchas ITS con uso correcto y constante.",
      ],
      [
        "¿Qué significa doble protección?",
        "Preservativo y otro anticonceptivo eficaz",
        "Dos preservativos superpuestos",
        "Dos píldoras al azar",
        "Combina prevención de ITS con prevención de embarazo; no se superponen preservativos.",
      ],
      [
        "¿La anticoncepción de emergencia interrumpe un embarazo establecido?",
        "No",
        "Sí, siempre",
        "Solo si es un implante",
        "La anticoncepción de emergencia previene embarazos; no es abortiva.",
      ],
    ],
    ["Información", "Elección libre", "Uso correcto"],
    [
      "Alguien usa un implante. ¿Qué aporta además el preservativo?",
      "Reducir el riesgo de ITS",
      "Anular el implante",
      "Garantizar riesgo cero",
      "El implante no protege frente a ITS y el preservativo añade protección.",
    ],
  ),
];
export const sources = [
  {
    title: "Biología celular · NCBI Bookshelf",
    url: "https://www.ncbi.nlm.nih.gov/books/NBK21054/",
  },
  {
    title: "Anticoncepción · OMS",
    url: "https://www.who.int/news-room/fact-sheets/detail/family-planning-contraception",
  },
  {
    title: "VPH y cáncer · OMS",
    url: "https://www.who.int/news-room/fact-sheets/detail/human-papilloma-virus-and-cancer",
  },
];

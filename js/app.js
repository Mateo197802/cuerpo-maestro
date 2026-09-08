/**
 * APLICACIÓN INTERACTIVA: PROGRAMA CLÍNICO "CUERPO MAESTRO"
 * Portal de Información e Inscripción de Pacientes
 * Universidad Yachay Tech / UTPL / ALFA Hospital
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initOrganExplorer();
  initCellSimulator();
  initArmComparator();
  initAtpCalculator();
  initEnrollmentForm();
  initInteractiveBackground();
});

/* ==========================================================================
   1. NAVEGACIÓN SUAVE Y SCROLL SPY
   ========================================================================== */
function initNavigation() {
  const header = document.querySelector('.site-header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    let current = '';
    const scrollPosition = window.scrollY + 140;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   2. EXPLORADOR ANATÓMICO Y METABÓLICO DEL HERO (6 ÓRGANOS)
   ========================================================================== */
const ORGAN_DATA = {
  brain: {
    num: '1',
    name: 'Cerebro: Ritmos Circadianos y Control del Estrés',
    desc: 'El descanso nocturno y el orden de las comidas regulan las hormonas leptina y grelina, reduciendo la ansiedad por dulces y estabilizando el cortisol.',
    img: 'assets/organ_brain.jpg'
  },
  heart: {
    num: '2',
    name: 'Corazón y Vasos: Presión Arterial Estable',
    desc: 'La reducción de sodio y la actividad física guiada estimulan el óxido nítrico en las arterias, relajando los vasos y reduciendo la presión arterial.',
    img: 'assets/organ_heart.jpg'
  },
  liver: {
    num: '3',
    name: 'Hígado: Aclaramiento de Grasa y Lípidos',
    desc: 'Al regular los carbohidratos refinados, el hígado reduce la síntesis de triglicéridos y descongestiona la grasa acumulada (esteatosis o hígado graso).',
    img: 'assets/organ_liver.jpg'
  },
  pancreas: {
    num: '4',
    name: 'Páncreas: Secreción Equilibrada de Insulina',
    desc: 'Evita la sobrecarga de las células beta del páncreas produciendo insulina en pulsos estables, previniendo la fatiga celular y la diabetes.',
    img: 'assets/organ_pancreas.jpg'
  },
  waist: {
    num: '5',
    name: 'Cintura: Reducción de Grasa Visceral Profunda',
    desc: 'La grasa abdominal es la más peligrosa metabólicamente. El programa prioriza su reducción sostenida, comprobada mediante bioimpedancia clínica.',
    img: 'assets/organ_visceral_fat.jpg'
  },
  muscle: {
    num: '6',
    name: 'Músculos: Sensibilidad a la Insulina y Energía',
    desc: 'El ejercicio estructurado activa los receptores GLUT4 en los músculos para absorber la glucosa como energía pura, evitando que se convierta en grasa.',
    img: 'assets/organ_muscle.jpg'
  }
};

function initOrganExplorer() {
  const hotspots = document.querySelectorAll('.organ-hotspot');
  const titleEl = document.getElementById('organTitle');
  const descEl = document.getElementById('organDesc');
  const thumbEl = document.getElementById('organThumbImg');
  const displayBox = document.getElementById('organInfoDisplay');
  const galleryCards = document.querySelectorAll('.organ-gallery-card[data-organ]');

  function selectOrgan(organKey) {
    const data = ORGAN_DATA[organKey];
    if (!data) return;

    hotspots.forEach(p => {
      if (p.getAttribute('data-organ') === organKey) {
        p.classList.add('active');
      } else {
        p.classList.remove('active');
      }
    });

    if (displayBox) {
      displayBox.style.opacity = '0.3';
      setTimeout(() => {
        if (titleEl) {
          titleEl.innerHTML = `
            <svg class="icon icon-sm" style="color: var(--mit-gold);" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
            ${data.num}. ${data.name}
          `;
        }
        if (descEl) descEl.textContent = data.desc;
        if (thumbEl) {
          thumbEl.src = data.img;
          thumbEl.alt = data.name;
        }
        displayBox.style.opacity = '1';
      }, 120);
    }
  }

  hotspots.forEach(pin => {
    pin.addEventListener('click', () => {
      const organKey = pin.getAttribute('data-organ');
      selectOrgan(organKey);
    });
  });

  // Permitir interacción bidireccional desde las tarjetas de Sección II
  galleryCards.forEach(card => {
    card.addEventListener('click', () => {
      const organKey = card.getAttribute('data-organ');
      selectOrgan(organKey);
      const heroModel = document.querySelector('.body-interactive-card');
      if (heroModel && window.innerWidth < 992) {
        heroModel.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  });
}

/* ==========================================================================
   2.1 SIMULADOR CELULAR Y MITOCONDRIAL (AMPK & ATP)
   ========================================================================== */
function initCellSimulator() {
  const btnSyndrome = document.getElementById('btnCellSyndrome');
  const btnMaster = document.getElementById('btnCellMaster');

  const glut4Gate = document.getElementById('glut4Gate');
  const glut4Text = document.getElementById('glut4Text');
  const ampkCircle = document.getElementById('ampkCircle');
  const ampkText = document.getElementById('ampkText');
  const mitoOuter = document.getElementById('mitoOuter');
  const mitoCrestas = document.getElementById('mitoCrestas');
  const mitoTitle = document.getElementById('mitoTitle');
  const krebsCircle = document.getElementById('krebsCircle');
  const krebsText = document.getElementById('krebsText');
  const atpSpark = document.getElementById('atpSpark');
  const atpOutputLabel = document.getElementById('atpOutputLabel');
  const lipidDroplet = document.getElementById('lipidDroplet');
  const lipidLabel = document.getElementById('lipidLabel');

  const badge = document.getElementById('cellStateIndicatorBadge');
  const title = document.getElementById('cellStateTitle');
  const desc = document.getElementById('cellStateDesc');
  const calloutBox = document.getElementById('cellCalloutBox');
  const calloutTitle = document.getElementById('cellCalloutTitle');
  const calloutText = document.getElementById('cellCalloutText');
  const metricAmpk = document.getElementById('metricAmpk');
  const metricMito = document.getElementById('metricMito');

  if (!btnSyndrome || !btnMaster) return;

  btnSyndrome.addEventListener('click', () => {
    btnSyndrome.className = 'cell-toggle-btn active-alert';
    btnMaster.className = 'cell-toggle-btn';

    // SVG updates
    if (glut4Gate) glut4Gate.setAttribute('fill', '#ea580c');
    if (glut4Text) {
      glut4Text.textContent = 'GLUT4 (Bloqueado)';
      glut4Text.setAttribute('fill', '#ea580c');
    }
    if (ampkCircle) {
      ampkCircle.setAttribute('fill', '#ffedd5');
      ampkCircle.setAttribute('stroke', '#ea580c');
    }
    if (ampkText) {
      ampkText.textContent = 'AMPK OFF';
      ampkText.setAttribute('fill', '#c2410c');
    }
    if (mitoOuter) {
      mitoOuter.setAttribute('fill', '#fff7ed');
      mitoOuter.setAttribute('stroke', '#ea580c');
    }
    if (mitoCrestas) mitoCrestas.setAttribute('stroke', '#f97316');
    if (mitoTitle) {
      mitoTitle.textContent = 'MITOCONDRIA (Estrés)';
      mitoTitle.setAttribute('fill', '#ea580c');
    }
    if (krebsCircle) {
      krebsCircle.setAttribute('stroke', '#ea580c');
      krebsCircle.setAttribute('fill', '#ffedd5');
    }
    if (krebsText) {
      krebsText.textContent = 'Quema Reducida';
      krebsText.setAttribute('fill', '#c2410c');
    }
    if (atpSpark) {
      atpSpark.setAttribute('fill', '#fef08a');
      atpSpark.setAttribute('stroke', '#eab308');
      atpSpark.classList.remove('atp-active-icon');
    }
    if (atpOutputLabel) atpOutputLabel.textContent = 'Baja Energía (Fatiga)';
    if (lipidDroplet) {
      lipidDroplet.setAttribute('opacity', '1');
      lipidDroplet.setAttribute('rx', '25');
      lipidDroplet.setAttribute('ry', '20');
    }
    if (lipidLabel) {
      lipidLabel.textContent = 'Grasa Bloqueada';
      lipidLabel.setAttribute('fill', '#c2410c');
    }

    // Text updates
    if (badge) {
      badge.className = 'badge badge-accent';
      badge.textContent = 'Estado 1: Sobrecarga Celular y Resistencia';
    }
    if (title) title.textContent = 'Célula con Síndrome Metabólico';
    if (desc) desc.textContent = 'Cuando consumimos calorías en exceso o carbohidratos refinados continuamente, las compuertas de glucosa (GLUT4) se vuelven insensibles a la insulina. El azúcar no entra eficientemente al músculo, se desvía para formar grasa abdominal y las mitocondrias sufren estrés oxidativo, provocando cansancio crónico y picos de glucosa.';
    if (calloutBox) calloutBox.className = 'cell-status-callout cell-status-syndrome';
    if (calloutTitle) calloutTitle.textContent = 'Consecuencia Biológica:';
    if (calloutText) calloutText.textContent = 'Sensor AMPK apagado. La grasa no entra a quemarse en las mitocondrias, el azúcar en sangre permanece elevado y el cuerpo acumula grasa visceral en la cintura.';
    if (metricAmpk) {
      metricAmpk.textContent = 'Inactiva / Baja';
      metricAmpk.style.color = '#ea580c';
    }
    if (metricMito) {
      metricMito.textContent = 'Estrés Oxidativo';
      metricMito.style.color = '#ea580c';
    }
  });

  btnMaster.addEventListener('click', () => {
    btnMaster.className = 'cell-toggle-btn active';
    btnSyndrome.className = 'cell-toggle-btn';

    // SVG updates
    if (glut4Gate) glut4Gate.setAttribute('fill', '#0f766e');
    if (glut4Text) {
      glut4Text.textContent = 'GLUT4 (Activo & Abierto)';
      glut4Text.setAttribute('fill', '#0f766e');
    }
    if (ampkCircle) {
      ampkCircle.setAttribute('fill', '#ccfbf1');
      ampkCircle.setAttribute('stroke', '#0f766e');
    }
    if (ampkText) {
      ampkText.textContent = 'AMPK ON';
      ampkText.setAttribute('fill', '#0f766e');
    }
    if (mitoOuter) {
      mitoOuter.setAttribute('fill', '#f0fdfa');
      mitoOuter.setAttribute('stroke', '#0f766e');
    }
    if (mitoCrestas) mitoCrestas.setAttribute('stroke', '#14b8a6');
    if (mitoTitle) {
      mitoTitle.textContent = 'MITOCONDRIA (Alta Eficiencia)';
      mitoTitle.setAttribute('fill', '#0f766e');
    }
    if (krebsCircle) {
      krebsCircle.setAttribute('stroke', '#0f766e');
      krebsCircle.setAttribute('fill', '#ccfbf1');
    }
    if (krebsText) {
      krebsText.textContent = 'Beta-Oxidación Rápida';
      krebsText.setAttribute('fill', '#0f766e');
    }
    if (atpSpark) {
      atpSpark.setAttribute('fill', '#fde047');
      atpSpark.setAttribute('stroke', '#ca8a04');
      atpSpark.classList.add('atp-active-icon');
    }
    if (atpOutputLabel) atpOutputLabel.textContent = 'Alta Producción de ATP';
    if (lipidDroplet) {
      lipidDroplet.setAttribute('opacity', '0.45');
      lipidDroplet.setAttribute('rx', '15');
      lipidDroplet.setAttribute('ry', '12');
    }
    if (lipidLabel) {
      lipidLabel.textContent = 'Grasa en Quema';
      lipidLabel.setAttribute('fill', '#0f766e');
    }

    // Text updates
    if (badge) {
      badge.className = 'badge badge-brand';
      badge.textContent = 'Estado 2: Fisiología Optimizada "Cuerpo Maestro"';
    }
    if (title) title.textContent = 'Célula con Sensibilidad y Quema de Grasa';
    if (desc) desc.textContent = 'El estímulo del ejercicio guiado y el plan nutricional activan la enzima AMPK (el sensor maestro de energía celular). Las compuertas GLUT4 se abren sin esfuerzo, la glucosa se utiliza para nutrir el músculo y las mitocondrias multiplican su capacidad de quemar los depósitos de grasa como combustible limpio.';
    if (calloutBox) calloutBox.className = 'cell-status-callout cell-status-healthy';
    if (calloutTitle) calloutTitle.textContent = 'Beneficio Celular en el Paciente:';
    if (calloutText) calloutText.textContent = 'Activación de AMPK y sirtuinas. La grasa acumulada se moviliza hacia las mitocondrias, el azúcar en sangre se estabiliza y experimentas mayor vitalidad y energía sostenida.';
    if (metricAmpk) {
      metricAmpk.textContent = 'Alta / Encendida';
      metricAmpk.style.color = '#0f766e';
    }
    if (metricMito) {
      metricMito.textContent = 'Beta-Oxidación Óptima';
      metricMito.style.color = '#0f766e';
    }
  });
}

/* ==========================================================================
   3. COMPARADOR DE LOS 4 PLANES DE ALIMENTACIÓN
   ========================================================================== */
const ARM_DATA = {
  g1: {
    code: 'Plan 1 (Grupo Activo)',
    title: 'Plan de Déficit Saludable Moderado (-20%)',
    caloricStatus: 'Reducción ligera del 20% sobre tu consumo calórico diario',
    window: 'Horarios convencionales de desayuno, almuerzo y cena según tu rutina',
    macros: { protein: 20, carb: 55, fat: 25 },
    macroText: 'Alimentación balanceada clásica pero en porciones controladas para perder grasa',
    pathway: [
      { text: 'Déficit Leve (-20%)', active: true },
      { text: 'Sensor Celular AMPK', active: false },
      { text: 'Quema Grasa Visceral', active: true },
      { text: 'Salud Arterial', active: false }
    ],
    mechanisms: [
      'Facilita la movilización y quema de la grasa acumulada en el abdomen.',
      'Mejora la sensibilidad del cuerpo a la insulina, disminuyendo el azúcar en sangre.',
      'Reduce la presión en el sistema circulatorio y alivia el hígado graso.',
      'Acompañado de ejercicio para proteger y tonificar tu masa muscular.'
    ],
    transversalActive: true,
    accentBadge: 'Déficit Controlado'
  },
  g2: {
    code: 'Plan 2 (Grupo Activo)',
    title: 'Plan Optimizado en Proteínas y Grasas Buenas (30/40/30)',
    caloricStatus: 'Calorías completas normales (sin pasar hambre)',
    window: 'Comidas distribuidas a lo largo del día priorizando saciedad',
    macros: { protein: 30, carb: 40, fat: 30 },
    macroText: '30% Proteínas (pollo, pescado, huevos), 40% Carbohidratos integrales, 30% Grasas saludables (aguacate, aceite de oliva)',
    pathway: [
      { text: 'Proteína Óptima (30%)', active: true },
      { text: 'Protección Muscular', active: false },
      { text: 'Glucosa Estable', active: true },
      { text: 'Saciedad Continua', active: false }
    ],
    mechanisms: [
      'Aumenta la saciedad por más horas, eliminando la ansiedad de picar entre comidas.',
      'Evita los picos bruscos de glucosa e insulina después de comer.',
      'Protege y fortalece el músculo gracias a un aporte proteico óptimo.',
      'Mejora los niveles de colesterol bueno (HDL) y disminuye los triglicéridos.'
    ],
    transversalActive: true,
    accentBadge: 'Proteínas & Grasas Buenas'
  },
  g3: {
    code: 'Plan 3 (Grupo Activo)',
    title: 'Plan de Horario Estratégico (Ayuno Intermitente 16:8)',
    caloricStatus: 'Calorías normales organizadas en un bloque de 8 horas',
    window: 'Ventana de alimentación de 8 horas (ej. 10:00 am a 6:00 pm) y 16 h de descanso digestivo',
    macros: { protein: 25, carb: 45, fat: 30 },
    macroText: 'Comidas nutritivas dentro de tu ventana diurna elegida',
    pathway: [
      { text: 'Descanso Digestivo 16h', active: true },
      { text: 'Sincronización Circadiana', active: false },
      { text: 'Autofagia Celular', active: true },
      { text: 'Sensibilidad a la Insulina', active: false }
    ],
    mechanisms: [
      'Sincroniza tu metabolismo con tus ritmos naturales de día y noche.',
      'Favorece la limpieza y renovación celular durante las horas de descanso nocturno.',
      'Mejora notablemente la digestión, la agilidad mental y los niveles de energía matutina.',
      'Excelente regulador de la presión arterial y la resistencia a la insulina.'
    ],
    transversalActive: true,
    accentBadge: 'Crono-Alimentación 16:8'
  },
  g4: {
    code: 'Plan 4 (Grupo de Comparación)',
    title: 'Plan de Guía Nutricional Habitual',
    caloricStatus: 'Alimentación regular con recomendaciones estándar de salud',
    window: 'Tus horarios habituales de alimentación',
    macros: { protein: 15, carb: 60, fat: 25 },
    macroText: 'Dieta cotidiana con pautas generales de alimentación saludable',
    pathway: [
      { text: 'Pautas Nutricionales', active: false },
      { text: 'Educación Básica', active: true },
      { text: 'Monitoreo de Salud', active: false },
      { text: 'Exámenes Gratuitos', active: true }
    ],
    mechanisms: [
      'Recibes información y educación general sobre alimentación saludable.',
      'Permite al equipo comparar científicamente las mejoras frente a los hábitos cotidianos.',
      'Acceso total a todos tus análisis de laboratorio y bioimpedancia sin costo.',
      'Al finalizar el estudio, recibirás todas las recomendaciones de los planes más efectivos.'
    ],
    transversalActive: false,
    accentBadge: 'Guía Saludable General'
  }
};

function initArmComparator() {
  const tabButtons = document.querySelectorAll('.arm-tab-btn');
  const armCodeEl = document.getElementById('armCode');
  const armTitleEl = document.getElementById('armTitle');
  const armBadgeEl = document.getElementById('armBadge');
  const armCaloricEl = document.getElementById('armCaloric');
  const armWindowEl = document.getElementById('armWindow');
  const armMacrosTextEl = document.getElementById('armMacrosText');
  const barProtein = document.getElementById('barProtein');
  const barCarb = document.getElementById('barCarb');
  const barFat = document.getElementById('barFat');
  const textProtein = document.getElementById('textProtein');
  const textCarb = document.getElementById('textCarb');
  const textFat = document.getElementById('textFat');
  const armMechanismsList = document.getElementById('armMechanismsList');
  const transversalStatusEl = document.getElementById('transversalStatus');
  const pathwayFlow = document.querySelector('.pathway-flow');

  if (!tabButtons.length || !armTitleEl) return;

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const armKey = btn.getAttribute('data-arm');
      const data = ARM_DATA[armKey];
      if (!data) return;

      armCodeEl.textContent = data.code;
      armTitleEl.textContent = data.title;
      armBadgeEl.textContent = data.accentBadge;
      armCaloricEl.textContent = data.caloricStatus;
      armWindowEl.textContent = data.window;
      armMacrosTextEl.textContent = data.macroText;

      barProtein.style.width = `${data.macros.protein}%`;
      barCarb.style.width = `${data.macros.carb}%`;
      barFat.style.width = `${data.macros.fat}%`;

      textProtein.textContent = `${data.macros.protein}% Proteína`;
      textCarb.textContent = `${data.macros.carb}% Carbohidratos`;
      textFat.textContent = `${data.macros.fat}% Grasas Saludables`;

      // Cascada de vías bioquímicas
      if (pathwayFlow && data.pathway) {
        pathwayFlow.innerHTML = data.pathway.map((p, idx) => `
          <span class="pathway-node ${p.active ? 'active-node' : ''}">${p.text}</span>
          ${idx < data.pathway.length - 1 ? '<span class="pathway-arrow">&rarr;</span>' : ''}
        `).join('');
      }

      armMechanismsList.innerHTML = data.mechanisms
        .map(item => `<li>${item}</li>`)
        .join('');

      if (data.transversalActive) {
        transversalStatusEl.className = 'callout-box';
        transversalStatusEl.innerHTML = `
          <h5>Acompañamiento "Cuerpo Maestro" Incluido</h5>
          <p>Este grupo cuenta con el apoyo de un <strong>nutricionista clínico</strong>, talleres educativos y <strong>ejercicio físico supervisado</strong> por un preparador especializado.</p>
        `;
      } else {
        transversalStatusEl.className = 'callout-box callout-warm';
        transversalStatusEl.innerHTML = `
          <h5>Grupo de Control y Comparación</h5>
          <p>Mantiene sus actividades habituales mientras recibe material educativo básico y evaluaciones médicas completas periódicas.</p>
        `;
      }
    });
  });
}

/* ==========================================================================
   4. AUTO-EVALUADOR CON SIMULACIÓN DE GRASA ABDOMINAL
   ========================================================================== */
function initAtpCalculator() {
  let currentSex = 'male';

  const sexBtns = document.querySelectorAll('.sex-btn');
  const inputWaist = document.getElementById('inputWaist');
  const sliderWaist = document.getElementById('sliderWaist');
  const inputTG = document.getElementById('inputTG');
  const sliderTG = document.getElementById('sliderTG');
  const inputHDL = document.getElementById('inputHDL');
  const sliderHDL = document.getElementById('sliderHDL');
  const inputSys = document.getElementById('inputSys');
  const sliderSys = document.getElementById('sliderSys');
  const inputDia = document.getElementById('inputDia');
  const sliderDia = document.getElementById('sliderDia');
  const inputGlucose = document.getElementById('inputGlucose');
  const sliderGlucose = document.getElementById('sliderGlucose');
  const inputFatPct = document.getElementById('inputFatPct');
  const sliderFatPct = document.getElementById('sliderFatPct');

  const waistThresholdLabel = document.getElementById('waistThresholdLabel');
  const hdlThresholdLabel = document.getElementById('hdlThresholdLabel');

  const criteriaCounter = document.getElementById('criteriaCounter');
  const criteriaCountText = document.getElementById('criteriaCountText');
  const eligibilityVerdict = document.getElementById('eligibilityVerdict');
  const verdictDetail = document.getElementById('verdictDetail');

  const checkWaist = document.getElementById('checkWaist');
  const checkTG = document.getElementById('checkTG');
  const checkHDL = document.getElementById('checkHDL');
  const checkBP = document.getElementById('checkBP');
  const checkGlucose = document.getElementById('checkGlucose');
  const lancetStagingBadge = document.getElementById('lancetStagingBadge');

  // Elementos de la simulación de corte abdominal
  const outerWaistEllipse = document.getElementById('outerWaistEllipse');
  const visceralFatEllipse = document.getElementById('visceralFatEllipse');
  const waistFeedbackNote = document.getElementById('waistFeedbackNote');

  if (!inputWaist || !criteriaCounter) return;

  function linkInputSlider(inputEl, sliderEl) {
    if (!inputEl || !sliderEl) return;
    inputEl.addEventListener('input', () => {
      sliderEl.value = inputEl.value;
      calculateDiagnosis();
    });
    sliderEl.addEventListener('input', () => {
      inputEl.value = sliderEl.value;
      calculateDiagnosis();
    });
  }

  linkInputSlider(inputWaist, sliderWaist);
  linkInputSlider(inputTG, sliderTG);
  linkInputSlider(inputHDL, sliderHDL);
  linkInputSlider(inputSys, sliderSys);
  linkInputSlider(inputDia, sliderDia);
  linkInputSlider(inputGlucose, sliderGlucose);
  linkInputSlider(inputFatPct, sliderFatPct);

  sexBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      sexBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentSex = btn.getAttribute('data-sex');

      if (currentSex === 'male') {
        waistThresholdLabel.textContent = 'Umbral: ≥ 102 cm (Hombres)';
        hdlThresholdLabel.textContent = 'Umbral: < 40 mg/dL (Bajo)';
      } else {
        waistThresholdLabel.textContent = 'Umbral: ≥ 88 cm (Mujeres)';
        hdlThresholdLabel.textContent = 'Umbral: < 50 mg/dL (Bajo)';
      }
      calculateDiagnosis();
    });
  });

  function calculateDiagnosis() {
    const waist = parseFloat(inputWaist.value) || 0;
    const tg = parseFloat(inputTG.value) || 0;
    const hdl = parseFloat(inputHDL.value) || 0;
    const sys = parseFloat(inputSys.value) || 0;
    const dia = parseFloat(inputDia.value) || 0;
    const glucose = parseFloat(inputGlucose.value) || 0;
    const fatPct = parseFloat(inputFatPct.value) || 0;

    const waistCutoff = currentSex === 'male' ? 102 : 88;
    const waistMet = waist >= waistCutoff;
    const tgMet = tg >= 150;
    const hdlMet = (currentSex === 'male' && hdl < 40) || (currentSex === 'female' && hdl < 50);
    const bpMet = sys >= 130 || dia >= 85;
    const glucoseMet = glucose >= 100;

    let metCount = 0;
    if (waistMet) metCount++;
    if (tgMet) metCount++;
    if (hdlMet) metCount++;
    if (bpMet) metCount++;
    if (glucoseMet) metCount++;

    updateCheckItem(checkWaist, waistMet);
    updateCheckItem(checkTG, tgMet);
    updateCheckItem(checkHDL, hdlMet);
    updateCheckItem(checkBP, bpMet);
    updateCheckItem(checkGlucose, glucoseMet);

    criteriaCounter.textContent = `${metCount} / 5`;

    if (metCount >= 3) {
      criteriaCounter.className = 'counter-number alert';
      criteriaCountText.textContent = 'Signos metabólicos detectados (≥ 3)';
      eligibilityVerdict.className = 'badge badge-accent';
      eligibilityVerdict.textContent = '¡Calificas para ingresar al estudio!';
      verdictDetail.innerHTML = `<strong>Perfil Apto:</strong> Cumples con al menos 3 signos de salud metabólica que el programa busca mejorar. Completa el formulario a continuación para postular tu cupo gratuito.`;
    } else {
      criteriaCounter.className = 'counter-number';
      criteriaCountText.textContent = 'Indicadores leves (< 3)';
      eligibilityVerdict.className = 'badge badge-neutral';
      eligibilityVerdict.textContent = 'Condición metabólica estable';
      verdictDetail.innerHTML = `<strong>Información:</strong> Presentas ${metCount} parámetro(s) alterado(s). Para el estudio clínico se prioriza a personas con 3 o más componentes. De todas formas, puedes postularte si sospechas de otros factores de riesgo.`;
    }

    // Actualización dinámica del corte transversal abdominal
    if (outerWaistEllipse && visceralFatEllipse) {
      // Mapear perímetro de cintura (60cm - 150cm) a radio gráfico (50px - 90px)
      const scaleWaist = 50 + ((waist - 60) / 90) * 40;
      outerWaistEllipse.setAttribute('rx', Math.min(90, Math.max(50, scaleWaist)));
      outerWaistEllipse.setAttribute('ry', Math.min(52, Math.max(28, scaleWaist * 0.58)));

      // Mapear grasa visceral
      const scaleVisceral = 35 + ((fatPct - 10) / 45) * 30;
      visceralFatEllipse.setAttribute('rx', Math.min(65, Math.max(35, scaleVisceral)));
      visceralFatEllipse.setAttribute('ry', Math.min(38, Math.max(20, scaleVisceral * 0.58)));

      if (waistMet) {
        outerWaistEllipse.setAttribute('stroke', '#c2410c');
        outerWaistEllipse.setAttribute('fill', '#fff7ed');
        visceralFatEllipse.setAttribute('stroke', '#ea580c');
        visceralFatEllipse.setAttribute('fill', '#ffedd5');
        waistFeedbackNote.textContent = `Cintura de ${waist} cm: Adiposidad visceral aumentada`;
        waistFeedbackNote.style.color = '#c2410c';
      } else {
        outerWaistEllipse.setAttribute('stroke', '#0f766e');
        outerWaistEllipse.setAttribute('fill', '#f0fdfa');
        visceralFatEllipse.setAttribute('stroke', '#14b8a6');
        visceralFatEllipse.setAttribute('fill', '#ccfbf1');
        waistFeedbackNote.textContent = `Cintura de ${waist} cm: Perímetro en rango normal`;
        waistFeedbackNote.style.color = '#0f766e';
      }
    }

    const fatCutoff = currentSex === 'male' ? 25 : 32;
    if (fatPct >= fatCutoff && waistMet) {
      lancetStagingBadge.className = 'badge badge-accent';
      lancetStagingBadge.textContent = 'Prioridad: Grasa Visceral Elevada';
    } else if (fatPct >= fatCutoff || waistMet) {
      lancetStagingBadge.className = 'badge badge-navy';
      lancetStagingBadge.textContent = 'Moderado: Grasa en Aumento';
    } else {
      lancetStagingBadge.className = 'badge badge-neutral';
      lancetStagingBadge.textContent = 'Composición en Rango Saludable';
    }
  }

  function updateCheckItem(element, isMet) {
    if (!element) return;
    if (isMet) {
      element.className = 'check-indicator met';
      element.textContent = '✓';
    } else {
      element.className = 'check-indicator unmet';
      element.textContent = '—';
    }
  }

  calculateDiagnosis();
}

/* ==========================================================================
   5. INTEGRACIÓN Y GESTIÓN DE GOOGLE FORMS
   ========================================================================== */
function initEnrollmentForm() {
  const iframe = document.getElementById('officialFormsIframe');
  const directLink = document.getElementById('directFormsLink');
  const inputUrl = document.getElementById('inputGoogleFormsUrl');
  const btnUpdate = document.getElementById('btnUpdateFormsUrl');

  if (!iframe || !directLink) return;

  // Cargar URL personalizada previa de localStorage si existe
  const savedUrl = localStorage.getItem('cuerpo_maestro_google_forms_url');
  if (savedUrl) {
    iframe.src = savedUrl.includes('embedded=true') ? savedUrl : `${savedUrl}?embedded=true`;
    directLink.href = savedUrl;
    if (inputUrl) inputUrl.value = savedUrl;
  }

  if (btnUpdate && inputUrl) {
    btnUpdate.addEventListener('click', () => {
      const newUrl = inputUrl.value.trim();
      if (!newUrl) return;

      const embedUrl = newUrl.includes('embedded=true') 
        ? newUrl 
        : (newUrl.includes('?') ? `${newUrl}&embedded=true` : `${newUrl}?embedded=true`);
      
      iframe.src = embedUrl;
      directLink.href = newUrl;
      localStorage.setItem('cuerpo_maestro_google_forms_url', newUrl);

      btnUpdate.textContent = '¡Formulario Conectado!';
      btnUpdate.style.backgroundColor = '#0f766e';
      btnUpdate.style.color = '#ffffff';
      setTimeout(() => {
        btnUpdate.textContent = 'Vincular Formulario';
        btnUpdate.style.backgroundColor = '';
        btnUpdate.style.color = '';
      }, 2500);
    });
  }
}

/* ==========================================================================
   6. MALLA INTERACTIVA DE FONDO (CANVAS MIT CRITICAL DATA - ROMA)
   ========================================================================== */
function initInteractiveBackground() {
  const canvas = document.getElementById('mitInteractiveCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Paleta de partículas inspirada en MIT Roma
  const COLOR_PALETTE = [
    { r: 232, g: 183, b: 94 },  // MIT Gold
    { r: 157, g: 208, b: 211 }, // MIT Celadon
    { r: 228, g: 86,  b: 42 },  // MIT Terracotta
    { r: 255, g: 247, b: 234 }  // MIT Ivory
  ];

  let width = 0;
  let height = 0;
  let dpr = Math.min(window.devicePixelRatio || 1, 2);
  let particles = [];
  let shockwaves = [];
  let animId = null;

  const mouse = {
    x: -9999,
    y: -9999,
    active: false,
    radius: 175
  };

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    ctx.scale(dpr, dpr);
    initParticles();
  }

  function initParticles() {
    const isMobile = width < 768;
    const count = isMobile ? 36 : Math.min(75, Math.floor((width * height) / 16000));
    particles = [];

    for (let i = 0; i < count; i++) {
      const col = COLOR_PALETTE[Math.floor(Math.random() * COLOR_PALETTE.length)];
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        baseRadius: Math.random() * 1.5 + 1.2,
        color: col,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.02
      });
    }
  }

  // Interacción del ratón y táctil
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.active = true;
  });

  window.addEventListener('mouseleave', () => {
    mouse.active = false;
  });

  window.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      mouse.x = e.touches[0].clientX;
      mouse.y = e.touches[0].clientY;
      mouse.active = true;
    }
  }, { passive: true });

  window.addEventListener('touchend', () => {
    setTimeout(() => { mouse.active = false; }, 1500);
  });

  // Efecto de impulso/onda al hacer clic o tap
  window.addEventListener('click', (e) => {
    const clickX = e.clientX;
    const clickY = e.clientY;
    shockwaves.push({
      x: clickX,
      y: clickY,
      radius: 0,
      maxRadius: 140,
      alpha: 0.55
    });

    // Impulso radial a partículas cercanas
    particles.forEach(p => {
      const dx = p.x - clickX;
      const dy = p.y - clickY;
      const dist = Math.hypot(dx, dy);
      if (dist < 180 && dist > 0.1) {
        const force = (1 - dist / 180) * 2.2;
        p.vx += (dx / dist) * force;
        p.vy += (dy / dist) * force;
      }
    });
  });

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function render() {
    ctx.clearRect(0, 0, width, height);

    // Actualizar y renderizar ondas de clic
    for (let s = shockwaves.length - 1; s >= 0; s--) {
      const sw = shockwaves[s];
      sw.radius += 3.5;
      sw.alpha *= 0.94;

      ctx.beginPath();
      ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(232, 183, 94, ${sw.alpha})`;
      ctx.lineWidth = 1.2;
      ctx.stroke();

      if (sw.radius > sw.maxRadius || sw.alpha < 0.02) {
        shockwaves.splice(s, 1);
      }
    }

    const maxLinkDist = width < 768 ? 105 : 125;

    // Actualizar partículas
    const pLen = particles.length;
    for (let i = 0; i < pLen; i++) {
      const p = particles[i];

      if (!prefersReduced) {
        // Interacción suave con el cursor (atracción tenue)
        if (mouse.active) {
          const mdx = mouse.x - p.x;
          const mdy = mouse.y - p.y;
          const mDist = Math.hypot(mdx, mdy);
          if (mDist < mouse.radius && mDist > 15) {
            const pull = (1 - mDist / mouse.radius) * 0.035;
            p.vx += (mdx / mDist) * pull;
            p.vy += (mdy / mDist) * pull;
          }
        }

        // Fricción suave para evitar hipervelocidad
        p.vx *= 0.985;
        p.vy *= 0.985;

        p.x += p.vx;
        p.y += p.vy;

        // Rebote suave en bordes
        if (p.x < 0) { p.x = 0; p.vx *= -1; }
        else if (p.x > width) { p.x = width; p.vx *= -1; }
        if (p.y < 0) { p.y = 0; p.vy *= -1; }
        else if (p.y > height) { p.y = height; p.vy *= -1; }

        p.pulsePhase += p.pulseSpeed;
      }

      // Dibujar filamentos entre partículas cercanas
      for (let j = i + 1; j < pLen; j++) {
        const p2 = particles[j];
        const dx = p2.x - p.x;
        const dy = p2.y - p.y;
        const dist = Math.hypot(dx, dy);

        if (dist < maxLinkDist) {
          const alpha = (1 - dist / maxLinkDist) * 0.38;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${alpha})`;
          ctx.lineWidth = 0.85;
          ctx.stroke();
        }
      }

      // Conexión del cursor a la partícula si está cerca
      if (mouse.active) {
        const cdx = mouse.x - p.x;
        const cdy = mouse.y - p.y;
        const cDist = Math.hypot(cdx, cdy);
        if (cDist < mouse.radius) {
          const cAlpha = (1 - cDist / mouse.radius) * 0.5;
          ctx.beginPath();
          ctx.moveTo(mouse.x, mouse.y);
          ctx.lineTo(p.x, p.y);
          ctx.strokeStyle = `rgba(232, 183, 94, ${cAlpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      // Dibujar nodo partícula
      const currentRadius = p.baseRadius + Math.sin(p.pulsePhase) * 0.4;
      ctx.beginPath();
      ctx.arc(p.x, p.y, Math.max(0.5, currentRadius), 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, 0.85)`;
      ctx.fill();

      // Halo sutil para partículas destacadas
      if (p.baseRadius > 2.2) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, currentRadius * 2.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, 0.12)`;
        ctx.fill();
      }
    }

    if (!prefersReduced) {
      animId = requestAnimationFrame(render);
    }
  }

  // Manejo de pausa cuando la pestaña está oculta
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      if (animId) cancelAnimationFrame(animId);
    } else {
      if (!prefersReduced) animId = requestAnimationFrame(render);
    }
  });

  window.addEventListener('resize', () => {
    resize();
  });

  resize();
  if (prefersReduced) {
    render();
  } else {
    animId = requestAnimationFrame(render);
  }
}


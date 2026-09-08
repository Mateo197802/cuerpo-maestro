/**
 * APLICACIÓN INTERACTIVA: PROGRAMA CLÍNICO "CUERPO MAESTRO"
 * Portal de Información e Inscripción de Pacientes
 * Universidad Yachay Tech / UTPL / ALFA Hospital
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initOrganExplorer();
  initArmComparator();
  initAtpCalculator();
  initEnrollmentForm();
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
   2. EXPLORADOR ANATÓMICO Y METABÓLICO DEL HERO
   ========================================================================== */
const ORGAN_DATA = {
  brain: {
    num: '1',
    name: 'Cerebro: Ritmos Circadianos y Control del Estrés',
    desc: 'El descanso nocturno y el orden de las comidas regulan las hormonas leptina y grelina, reduciendo la ansiedad por dulces y estabilizando el cortisol.'
  },
  heart: {
    num: '2',
    name: 'Corazón y Vasos: Presión Arterial Estable',
    desc: 'La reducción de sodio y la actividad física guiada estimulan el óxido nítrico en las arterias, relajando los vasos y reduciendo la presión arterial.'
  },
  liver: {
    num: '3',
    name: 'Hígado: Aclaramiento de Grasa y Lípidos',
    desc: 'Al regular los carbohidratos refinados, el hígado reduce la síntesis de triglicéridos y descongestiona la grasa acumulada (hígado graso).'
  },
  waist: {
    num: '4',
    name: 'Cintura: Reducción de Grasa Visceral Profunda',
    desc: 'La grasa abdominal es la más peligrosa metabólicamente. El programa prioriza su reducción sostenida, comprobada mediante bioimpedancia clínica.'
  },
  muscle: {
    num: '5',
    name: 'Músculos: Sensibilidad a la Insulina y Energía',
    desc: 'El ejercicio estructurado activa los receptores GLUT4 en los músculos para absorber la glucosa como energía pura, evitando que se convierta en grasa.'
  }
};

function initOrganExplorer() {
  const hotspots = document.querySelectorAll('.organ-hotspot');
  const titleEl = document.getElementById('organTitle');
  const descEl = document.getElementById('organDesc');
  const displayBox = document.getElementById('organInfoDisplay');

  if (!hotspots.length || !titleEl || !descEl) return;

  hotspots.forEach(pin => {
    pin.addEventListener('click', () => {
      hotspots.forEach(p => p.classList.remove('active'));
      pin.classList.add('active');

      const organKey = pin.getAttribute('data-organ');
      const data = ORGAN_DATA[organKey];
      if (!data) return;

      displayBox.style.opacity = '0';
      setTimeout(() => {
        titleEl.innerHTML = `
          <svg class="icon icon-sm" style="color: var(--color-brand);" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
          ${data.num}. ${data.name}
        `;
        descEl.textContent = data.desc;
        displayBox.style.opacity = '1';
      }, 150);
    });
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
   5. FORMULARIO DE INSCRIPCIÓN DE PACIENTES
   ========================================================================== */
function initEnrollmentForm() {
  const form = document.getElementById('patientEnrollmentForm');
  const successBox = document.getElementById('enrollmentSuccess');

  if (!form || !successBox) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('patientName').value.trim();
    const phone = document.getElementById('patientPhone').value.trim();

    const patientData = {
      name: name,
      age: document.getElementById('patientAge').value,
      sex: document.getElementById('patientSex').value,
      canton: document.getElementById('patientCanton').value,
      phone: phone,
      email: document.getElementById('patientEmail').value,
      date: new Date().toISOString()
    };

    try {
      const existing = JSON.parse(localStorage.getItem('cuerpo_maestro_inscritos') || '[]');
      existing.push(patientData);
      localStorage.setItem('cuerpo_maestro_inscritos', JSON.stringify(existing));
    } catch (err) {
      console.log('Almacenamiento local:', err);
    }

    form.style.display = 'none';
    successBox.classList.add('show');
    successBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
}

/**
 * APLICACIÓN INTERACTIVA: PROTOCOLO CLÍNICO "CUERPO MAESTRO"
 * Universidad Yachay Tech / UTPL / ALFA Hospital
 * PII26-12 (2026-2027)
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initArmComparator();
  initAtpCalculator();
  initVariablesTable();
  initGanttFilter();
});

/* ==========================================================================
   1. NAVEGACIÓN Y SCROLL SPY
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
    const scrollPosition = window.scrollY + 120;

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
   2. COMPARADOR DE LOS 4 BRAZOS DE INTERVENCIÓN
   ========================================================================== */
const ARM_DATA = {
  g1: {
    code: 'Grupo 1 (Intervención Activa)',
    title: 'Cuerpo Maestro + Restricción Calórica (-20%)',
    n: '20 Participantes',
    window: 'Ad libitum con déficit cuantitativo (~20% bajo el gasto energético total)',
    caloricStatus: 'Déficit calórico continuo moderado (-20%)',
    macros: { protein: 20, carb: 55, fat: 25 },
    macroText: 'Distribución equilibrada tradicional con déficit calórico del 20%',
    mechanisms: [
      'Activación de sensores energéticos AMPK y elevación en relación NAD+/NADH.',
      'Estimulación de desacetilasas SIRT1 y SIRT3 favoreciendo la biogénesis mitocondrial.',
      'Lipólisis sostenida y movilización de triglicéridos ectópicos intrahepáticos.',
      'Riesgo monitorizado: posible adaptación metabólica y compensación del gasto basal a largo plazo.'
    ],
    transversalActive: true,
    accentBadge: 'Déficit Energético Cuantitativo'
  },
  g2: {
    code: 'Grupo 2 (Intervención Activa)',
    title: 'Cuerpo Maestro + Modulación Macronutricional (30/40/30)',
    n: '20 Participantes',
    window: 'Dieta isocalórica estandarizada (sin restricción calórica deliberada)',
    caloricStatus: 'Isocalórica normoenergética',
    macros: { protein: 30, carb: 40, fat: 30 },
    macroText: '30% Proteínas de alto valor, 40% Carbohidratos complejos / bajo índice glicémico, 30% Grasas mono/poliinsaturadas',
    mechanisms: [
      'Atenuación de excursiones de glucemia e insulinemia postprandial mediante carbohidratos complejos y fibra.',
      'Preservación superior de masa magra y mayor efecto térmico de los alimentos por ingesta proteica optimizada (30%).',
      'Modulación del perfil lipídico aterogénico mediante sustitución de grasas saturadas por monoinsaturadas (omega-9) y poliinsaturadas (omega-3).',
      'Optimización de la saciedad mediada por péptidos gastrointestinales (PYY y GLP-1).'
    ],
    transversalActive: true,
    accentBadge: 'Modulación Cualitativa Isocalórica'
  },
  g3: {
    code: 'Grupo 3 (Intervención Activa)',
    title: 'Cuerpo Maestro + TRF 16:8 (Alimentación Restringida en Tiempo)',
    n: '20 Participantes',
    window: 'Ventana de ingesta de 8 horas / Ayuno circadiano de 16 horas diarias',
    caloricStatus: 'Normocalórica o restricción espontánea temporal',
    macros: { protein: 25, carb: 45, fat: 30 },
    macroText: 'Distribución habitual estructurada dentro del horario diurno estricto',
    mechanisms: [
      'Alineación con los ritmos circadianos centrales y periféricos (genes reloj CLOCK, BMAL1).',
      'Inducción de autofagia celular y aclaramiento de organelos dañados durante la ventana de 16 h.',
      'Mejora notable en la sensibilidad a la insulina hepática y muscular por vaciamiento del glucógeno.',
      'Disminución de la presión arterial sistólica/diastólica y reducción de estrés oxidativo vascular.'
    ],
    transversalActive: true,
    accentBadge: 'Crononutrición y Ritmo Circadiano'
  },
  g4: {
    code: 'Grupo 4 (Control Paralelo)',
    title: 'Control: Hábitos Habituales + Educación Básica',
    n: '20 Participantes',
    window: 'Horarios habituales sin supervisión ni crono-restricción',
    caloricStatus: 'Sin modificación voluntaria prescrita',
    macros: { protein: 15, carb: 60, fat: 25 },
    macroText: 'Patrón dietético libre espontáneo de la población de Imbabura',
    mechanisms: [
      'Mantenimiento de la línea de base individual sin intervención estructurada.',
      'Recibe consejería nutricional general estándar (ética institucional no restrictiva).',
      'Sin acompañamiento conductual ni prescripción estructurada de ejercicio físico de "Cuerpo Maestro".',
      'Permite aislar y contrastar la eficacia neta de las 3 estrategias combinadas frente a la historia natural.'
    ],
    transversalActive: false,
    accentBadge: 'Brazo de Control No Activo'
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

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const armKey = btn.getAttribute('data-arm');
      const data = ARM_DATA[armKey];
      if (!data) return;

      // Actualizar información con transiciones fluidas
      armCodeEl.textContent = data.code;
      armTitleEl.textContent = data.title;
      armBadgeEl.textContent = data.accentBadge;
      armCaloricEl.textContent = data.caloricStatus;
      armWindowEl.textContent = data.window;
      armMacrosTextEl.textContent = data.macroText;

      // Barras de nutrientes
      barProtein.style.width = `${data.macros.protein}%`;
      barCarb.style.width = `${data.macros.carb}%`;
      barFat.style.width = `${data.macros.fat}%`;

      textProtein.textContent = `${data.macros.protein}% Proteína`;
      textCarb.textContent = `${data.macros.carb}% Carbohidratos`;
      textFat.textContent = `${data.macros.fat}% Grasas`;

      // Mecanismos fisiológicos
      armMechanismsList.innerHTML = data.mechanisms
        .map(item => `<li>${item}</li>`)
        .join('');

      // Estado transversal Cuerpo Maestro
      if (data.transversalActive) {
        transversalStatusEl.className = 'callout-box';
        transversalStatusEl.innerHTML = `
          <h5>Pilar Transversal "Cuerpo Maestro" Activo</h5>
          <p>Este grupo recibe de forma protocolizada los 3 componentes comunes: <strong>Educación Nutricional</strong> continua, <strong>Acompañamiento Conductual</strong> (modelo transteórico) y <strong>Actividad Física Supervisada</strong> (prescripción de fuerza + aeróbica).</p>
        `;
      } else {
        transversalStatusEl.className = 'callout-box callout-warm';
        transversalStatusEl.innerHTML = `
          <h5>Sin Intervención "Cuerpo Maestro" (Control)</h5>
          <p>Este grupo no recibe educación conductual intensiva ni entrenamiento físico supervisado; mantiene su rutina habitual y sólo recibe información informativa estándar en salud general.</p>
        `;
      }
    });
  });
}

/* ==========================================================================
   3. EVALUADOR CLÍNICO ATP III & CONSENSO LANCET 2025
   ========================================================================== */
function initAtpCalculator() {
  let currentSex = 'male'; // 'male' | 'female'

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

  // Labels dinámicos según sexo
  const waistThresholdLabel = document.getElementById('waistThresholdLabel');
  const hdlThresholdLabel = document.getElementById('hdlThresholdLabel');

  // Indicadores y checklist
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

  // Sincronización input <-> slider
  function linkInputSlider(inputEl, sliderEl) {
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

  // Cambio de Sexo
  sexBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      sexBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentSex = btn.getAttribute('data-sex');

      if (currentSex === 'male') {
        waistThresholdLabel.textContent = 'Umbral ATP III: ≥ 102 cm';
        hdlThresholdLabel.textContent = 'Umbral ATP III: < 40 mg/dL';
      } else {
        waistThresholdLabel.textContent = 'Umbral ATP III: ≥ 88 cm';
        hdlThresholdLabel.textContent = 'Umbral ATP III: < 50 mg/dL';
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

    // Criterios ATP III
    const waistMet = (currentSex === 'male' && waist >= 102) || (currentSex === 'female' && waist >= 88);
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

    // Actualizar Checklist UI
    updateCheckItem(checkWaist, waistMet);
    updateCheckItem(checkTG, tgMet);
    updateCheckItem(checkHDL, hdlMet);
    updateCheckItem(checkBP, bpMet);
    updateCheckItem(checkGlucose, glucoseMet);

    criteriaCounter.textContent = `${metCount} / 5`;

    if (metCount >= 3) {
      criteriaCounter.className = 'counter-number alert';
      criteriaCountText.textContent = 'Criterios diagnósticos confirmados (≥ 3)';
      eligibilityVerdict.className = 'badge badge-accent';
      eligibilityVerdict.textContent = 'Cumple criterios de inclusión';
      verdictDetail.innerHTML = `<strong>Apto para el protocolo:</strong> El sujeto califica con diagnóstico clínico positivo para Síndrome Metabólico de acuerdo a NCEP-ATP III armonizado [2,3]. Puede ingresar a uno de los 4 brazos de estudio en T0.`;
    } else {
      criteriaCounter.className = 'counter-number';
      criteriaCountText.textContent = 'Criterios insuficientes (< 3)';
      eligibilityVerdict.className = 'badge badge-neutral';
      eligibilityVerdict.textContent = 'No elegible para intervención';
      verdictDetail.innerHTML = `<strong>Exclusión del estudio:</strong> Se requieren al menos 3 de 5 componentes ATP III para cumplir el criterio de inclusión. Actualmente presenta ${metCount} parámetro(s) alterado(s).`;
    }

    // Estadificación contemporánea The Lancet 2025 & ADA 2026
    const fatCutoff = currentSex === 'male' ? 25 : 32;
    if (fatPct >= fatCutoff && waistMet) {
      lancetStagingBadge.className = 'badge badge-accent';
      lancetStagingBadge.textContent = 'Lancet 2025: Obesidad Clínica Confirmada';
    } else if (fatPct >= fatCutoff || waistMet) {
      lancetStagingBadge.className = 'badge badge-navy';
      lancetStagingBadge.textContent = 'Lancet 2025: Obesidad Preclínica / Grasa Aumentada';
    } else {
      lancetStagingBadge.className = 'badge badge-neutral';
      lancetStagingBadge.textContent = 'Lancet 2025: Grasa Corporal en Rango Normal';
    }
  }

  function updateCheckItem(element, isMet) {
    if (isMet) {
      element.className = 'check-indicator met';
      element.textContent = '✓';
    } else {
      element.className = 'check-indicator unmet';
      element.textContent = '—';
    }
  }

  // Ejecutar primera evaluación
  calculateDiagnosis();
}

/* ==========================================================================
   4. TABLA DE OPERACIONALIZACIÓN DE VARIABLES (ANEXO C)
   ========================================================================== */
const VARIABLES_DATA = [
  { name: 'Grupo de intervención', cat: 'Intervención', def: 'Estrategia asignada a cada participante', ind: 'RC / MM / TRF / Control', scale: 'Nominal', type: 'Independiente' },
  { name: 'Tiempo de evaluación', cat: 'Temporal', def: 'Momento de medición pre y post intervención', ind: 'T0 (Basal) / T1 (6 meses)', scale: 'Nominal dicotómica', type: 'Independiente intra-sujeto' },
  { name: 'Porcentaje de Grasa Corporal', cat: 'Antropometría', def: 'Estimación de masa adiposa mediante bioimpedancia eléctrica de grado clínico (Desenlace Primario)', ind: '% grasa corporal total', scale: 'Continua', type: 'Dependiente (PRIMARIO)' },
  { name: 'Masa magra / Muscular', cat: 'Antropometría', def: 'Estimación de masa libre de grasa preservada', ind: 'kg masa magra', scale: 'Continua', type: 'Dependiente' },
  { name: 'Peso corporal', cat: 'Antropometría', def: 'Masa corporal total en ayunas', ind: 'kg', scale: 'Continua de razón', type: 'Dependiente' },
  { name: 'Índice de Masa Corporal (IMC)', cat: 'Antropometría', def: 'Cociente masa / talla al cuadrado', ind: 'kg/m²', scale: 'Continua de razón', type: 'Dependiente' },
  { name: 'Circunferencia abdominal', cat: 'Antropometría', def: 'Perímetro abdominal estandarizado en punto medio', ind: 'cm', scale: 'Continua de razón', type: 'Dependiente' },
  { name: 'Presión arterial', cat: 'Cardiovascular', def: 'Presión sistólica y diastólica estandarizada', ind: 'mmHg', scale: 'Continua de razón', type: 'Dependiente' },
  { name: 'Glucosa en ayunas', cat: 'Metabolismo', def: 'Concentración sérica de glucosa tras 8-12 h de ayuno', ind: 'mg/dL', scale: 'Continua de razón', type: 'Dependiente' },
  { name: 'Hemoglobina Glicosilada (HbA1c)', cat: 'Metabolismo', def: 'Control glucémico trimestral estandarizado en T0 y T1', ind: '%', scale: 'Continua de razón', type: 'Dependiente' },
  { name: 'Perfil lipídico sérico', cat: 'Metabolismo', def: 'Colesterol Total, LDL-C, HDL-C y Triglicéridos', ind: 'mg/dL', scale: 'Continua de razón', type: 'Dependiente' },
  { name: 'Función hepática', cat: 'Seguridad', def: 'Enzimas hepáticas séricas de seguridad metabólica', ind: 'U/L (Transaminasas AST/ALT, GGT)', scale: 'Continua', type: 'Dependiente' },
  { name: 'Función renal', cat: 'Seguridad', def: 'Seguridad metabólica y filtración renal', ind: 'Urea y Creatinina (mg/dL)', scale: 'Continua de razón', type: 'Dependiente' },
  { name: 'Adherencia al protocolo', cat: 'Conductual', def: 'Días de cumplimiento efectivo / días totales × 100', ind: '% cumplimiento (0 - 100)', scale: 'Continua', type: 'Moduladora' },
  { name: 'Calidad de vida (SF-36)', cat: 'Conductual', def: 'Cuestionario de salud auto-percibida SF-36', ind: 'Puntuación por dominios (0-100)', scale: 'Continua', type: 'Dependiente secundaria' },
  { name: 'Edad y sexo biológico', cat: 'Covariables', def: 'Características sociodemográficas moduladoras', ind: 'Años cumplidos / Femenino-Masculino', scale: 'Mixta', type: 'Covariable confusora' }
];

function initVariablesTable() {
  const tableBody = document.getElementById('variablesTableBody');
  const filterPills = document.querySelectorAll('.filter-pill');
  const searchInput = document.getElementById('variableSearch');

  let currentFilter = 'all';
  let searchTerm = '';

  function renderRows() {
    const filtered = VARIABLES_DATA.filter(item => {
      const matchesFilter = (currentFilter === 'all') || (item.cat.toLowerCase() === currentFilter.toLowerCase());
      const matchesSearch = item.name.toLowerCase().includes(searchTerm) ||
                            item.def.toLowerCase().includes(searchTerm) ||
                            item.ind.toLowerCase().includes(searchTerm) ||
                            item.type.toLowerCase().includes(searchTerm);
      return matchesFilter && matchesSearch;
    });

    if (filtered.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding: 2rem; color: var(--text-muted);">No se encontraron variables con los criterios seleccionados.</td></tr>`;
      return;
    }

    tableBody.innerHTML = filtered.map(v => {
      const isPrimary = v.type.includes('PRIMARIO');
      return `
        <tr class="${isPrimary ? 'row-primary-outcome' : ''}">
          <td class="variable-highlight">
            ${v.name}
            ${isPrimary ? '<span class="badge badge-accent" style="margin-left:0.5rem; font-size:0.65rem;">Desenlace Primario</span>' : ''}
          </td>
          <td>${v.def}</td>
          <td><code>${v.ind}</code></td>
          <td>${v.scale}</td>
          <td><span class="badge ${isPrimary ? 'badge-accent' : 'badge-neutral'}">${v.type}</span></td>
        </tr>
      `;
    }).join('');
  }

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentFilter = pill.getAttribute('data-filter');
      renderRows();
    });
  });

  searchInput.addEventListener('input', (e) => {
    searchTerm = e.target.value.trim().toLowerCase();
    renderRows();
  });

  renderRows();
}

/* ==========================================================================
   5. FILTRO CRONOGRAMA GANTT
   ========================================================================== */
function initGanttFilter() {
  const filterBtns = document.querySelectorAll('.gantt-filter-btn');
  const rows = document.querySelectorAll('.gantt-activity-row');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const targetOe = btn.getAttribute('data-oe');

      rows.forEach(row => {
        const rowOe = row.getAttribute('data-oe');
        if (targetOe === 'all' || rowOe === targetOe) {
          row.style.display = 'grid';
        } else {
          row.style.display = 'none';
        }
      });
    });
  });
}



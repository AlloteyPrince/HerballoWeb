<template>
  <div class="medrequest-page">

    <!-- INTRO SCREEN -->
    <div v-if="!formVisible" class="intro-screen">
      <div class="banner">
        <img src="/images/medrequest-banner.jpg" alt="MedRequest by Herballo" class="banner-img" />
        <div class="banner-overlay">
          <p class="banner-sub">Free lab & imaging request form generator for healthcare professionals</p>
        </div>
      </div>

      <div class="intro-container">
        <div class="intro-card">

          <div class="intro-header">
            <h1 class="intro-title">Generate a Professional Lab Request Form — Instantly</h1>
            <p class="intro-desc">MedRequest is a free tool built for healthcare professionals in Ghana and across West Africa. Fill in your details, select the tests or scans your patient needs, and export a clean, professional PDF in seconds — no account, no cost, no paperwork.</p>
            <p v-if="exportCount > 0" class="export-count-line">
              🩺 <strong>{{ exportCount.toLocaleString() }}</strong> healthcare professional{{ exportCount === 1 ? '' : 's' }} trust and use MedRequest — be part of the growing community
            </p>
          </div>

          <div class="profession-section">
            <p class="profession-q">What is your profession?</p>
            <div class="profession-grid">
              <button
                v-for="p in professions"
                :key="p.value"
                class="profession-card"
                :class="{ selected: selectedProfession === p.value }"
                @click="selectedProfession = p.value"
              >
                <span class="prof-icon">{{ p.icon }}</span>
                <span class="prof-label">{{ p.label }}</span>
              </button>
            </div>
          </div>

          <p class="trust-line">Trusted by healthcare professionals across Ghana — completely free, always.</p>

          <!-- How To Section -->
          <div class="howto-row">
            <button class="howto-btn" @click="showHowTo = !showHowTo">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
              {{ showHowTo ? 'Hide Guide' : 'How to use MedRequest' }}
            </button>
          </div>

          <div v-if="showHowTo" class="howto-panel">
            <h3 class="howto-title">How to use MedRequest</h3>
            <ol class="howto-steps">
              <li>
                <strong>Select your profession</strong> — Choose the option that best describes your role as a healthcare professional. This helps us understand who is using MedRequest.
              </li>
              <li>
                <strong>Click "Proceed to Generate Request Form"</strong> — This takes you to the form where you will fill in all the details for the lab request.
              </li>
              <li>
                <strong>Fill in Doctor Information</strong> — Enter your full name, specialisation, hospital or clinic name, and contact number. Your name and specialisation are required.
              </li>
              <li>
                <strong>Fill in Patient Information</strong> — Enter the patient's full name, age, and sex. These are required fields. You may also add a patient file number if available.
              </li>
              <li>
                <strong>Select Lab Tests or Scans</strong> — Click "Laboratory tests" or "Scans & imaging" to open the dropdown. Search or scroll to find what you need and check the box. The dropdown closes after each selection — click it again to add more. At least one test or scan is required.
              </li>
              <li>
                <strong>Add notes (optional)</strong> — Use this section to enter your patient's diagnosis or any specific instructions to the lab or scan scientist. Toggle "URGENT" if the request needs to be prioritised.
              </li>
              <li>
                <strong>Export as PDF</strong> — Click "Export as PDF" to download a professionally formatted request form. You can then share the downloaded PDF with your patient directly via WhatsApp, email, or any channel you prefer.
              </li>
            </ol>

          </div>

          <div class="intro-actions">
            <button class="share-btn" @click="shareLink">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
              </svg>
              Share MedRequest
            </button>
            <button
              class="continue-btn"
              :class="{ ready: selectedProfession }"
              :disabled="!selectedProfession"
              @click="proceedToForm"
            >
              Proceed to Generate Request Form
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </button>
          </div>

          <div v-if="shareCopied" class="share-toast">Link copied to clipboard!</div>

        </div>
      </div>
    </div>

    <!-- FORM SCREEN -->
    <div v-if="formVisible">
      <div class="banner">
        <img src="/images/medrequest-banner.jpg" alt="MedRequest by Herballo" class="banner-img" />
        <div class="banner-overlay">
          <p class="banner-sub">Generate a professional lab request form in seconds — free for all doctors</p>
        </div>
      </div>

      <div class="container main-content">

        <!-- Doctor Information -->
        <div class="card">
          <p class="section-label">Doctor information</p>
          <div class="grid-2">
            <div class="field">
              <label>Doctor's full name <span class="req">*</span></label>
              <input v-model="form.doctorName" type="text" placeholder="Dr. Ama Boateng" :class="{ error: showErrors && !form.doctorName }" />
              <span v-if="showErrors && !form.doctorName" class="err-msg">Required</span>
            </div>
            <div class="field">
              <label>Specialisation <span class="req">*</span></label>
              <input v-model="form.specialisation" type="text" placeholder="General Practitioner" :class="{ error: showErrors && !form.specialisation }" />
              <span v-if="showErrors && !form.specialisation" class="err-msg">Required</span>
            </div>
          </div>
          <div class="grid-2" style="margin-top: 14px">
            <div class="field">
              <label>Hospital / Clinic</label>
              <input v-model="form.hospital" type="text" placeholder="Korle Bu Teaching Hospital" />
            </div>
            <div class="field">
              <label>Contact / Phone</label>
              <input v-model="form.doctorPhone" type="text" placeholder="+233 XX XXX XXXX" />
            </div>
          </div>
        </div>

        <!-- Patient Information -->
        <div class="card">
          <p class="section-label">Patient information</p>
          <div class="grid-2">
            <div class="field">
              <label>Patient's full name <span class="req">*</span></label>
              <input v-model="form.patientName" type="text" placeholder="Kwame Mensah" :class="{ error: showErrors && !form.patientName }" />
              <span v-if="showErrors && !form.patientName" class="err-msg">Required</span>
            </div>
            <div class="field">
              <label>Age <span class="req">*</span></label>
              <input v-model="form.patientAge" type="number" placeholder="e.g. 34" min="0" max="120" :class="{ error: showErrors && !form.patientAge }" />
              <span v-if="showErrors && !form.patientAge" class="err-msg">Required</span>
            </div>
          </div>
          <div class="grid-2" style="margin-top: 14px">
            <div class="field">
              <label>Sex <span class="req">*</span></label>
              <select v-model="form.patientSex" :class="{ error: showErrors && !form.patientSex }">
                <option value="">Select sex</option>
                <option>Male</option>
                <option>Female</option>
              </select>
              <span v-if="showErrors && !form.patientSex" class="err-msg">Required</span>
            </div>
            <div class="field">
              <label>Patient ID / File No. <span class="optional">(optional)</span></label>
              <input v-model="form.patientId" type="text" placeholder="e.g. KBT-00421" />
            </div>
          </div>
        </div>

        <!-- Lab & Scan Orders -->
        <div class="card">
          <p class="section-label">Lab &amp; scan orders <span class="req">*</span></p>
          <span v-if="showErrors && selectedLabs.size === 0 && selectedScans.size === 0" class="err-msg" style="display:block;margin-bottom:10px">Please select at least one test or scan</span>

          <div class="toggle-row">
            <button class="toggle-btn" :class="{ active: showLabs }" @click="toggleSection('labs')">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2v-4M9 21H5a2 2 0 0 1-2-2v-4m0 0h18"/>
              </svg>
              Laboratory tests
              <span v-if="selectedLabs.size > 0" class="count-badge">{{ selectedLabs.size }}</span>
            </button>
            <button class="toggle-btn" :class="{ active: showScans }" @click="toggleSection('scans')">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/>
                <line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/>
                <line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/>
              </svg>
              Scans &amp; imaging
              <span v-if="selectedScans.size > 0" class="count-badge">{{ selectedScans.size }}</span>
            </button>
          </div>

          <div v-if="showLabs" class="order-section">
            <div class="search-wrap">
              <svg class="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input v-model="labSearch" type="text" placeholder="Search lab tests..." class="search-input" />
            </div>
            <div class="item-list">
              <label v-for="item in filteredLabs" :key="item" class="list-item">
                <input type="checkbox" :checked="selectedLabs.has(item)" @change="toggleItem('labs', item)" />
                {{ item }}
              </label>
              <p v-if="filteredLabs.length === 0" class="no-results">No tests match your search</p>
            </div>
            <div v-if="selectedLabs.size > 0" class="tags-row">
              <span v-for="item in selectedLabs" :key="item" class="tag">
                {{ item }}
                <button @click="toggleItem('labs', item)" aria-label="Remove">×</button>
              </span>
            </div>
          </div>

          <div v-if="showScans" class="order-section">
            <div class="search-wrap">
              <svg class="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input v-model="scanSearch" type="text" placeholder="Search scans..." class="search-input" />
            </div>
            <div class="item-list">
              <label v-for="item in filteredScans" :key="item" class="list-item">
                <input type="checkbox" :checked="selectedScans.has(item)" @change="toggleItem('scans', item)" />
                {{ item }}
              </label>
              <p v-if="filteredScans.length === 0" class="no-results">No scans match your search</p>
            </div>
            <div v-if="selectedScans.size > 0" class="tags-row">
              <span v-for="item in selectedScans" :key="item" class="tag">
                {{ item }}
                <button @click="toggleItem('scans', item)" aria-label="Remove">×</button>
              </span>
            </div>
          </div>
        </div>

        <!-- Additional Instructions -->
        <div class="card">
          <p class="section-label">Additional instructions</p>
          <div class="urgent-row">
            <label class="switch">
              <input type="checkbox" v-model="form.urgent" />
              <span class="slider"></span>
            </label>
            <span class="urgent-label">Mark as <strong>URGENT</strong></span>
          </div>
          <div class="field" style="margin-top: 14px">
            <label>Diagnosis / Notes to the lab or scan scientist</label>
            <textarea v-model="form.notes" placeholder="E.g. Diagnosis: Type 2 Diabetes Mellitus. Please prioritise FBC. Patient is fasting." rows="4"></textarea>
          </div>
        </div>

        <!-- Export & Email Buttons -->
        <div class="export-wrap">
          <button class="export-btn" :class="{ active: formValid }" @click="handleExport">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            {{ formValid ? 'Export as PDF' : 'Complete required fields to export' }}
          </button>

        </div>

      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'

useHead({
  title: 'MedRequest — Free Lab & Imaging Request Form for Doctors | Herballo',
  meta: [
    { name: 'description', content: 'Generate a professional laboratory and imaging request form instantly. Free online lab request form for doctors in Ghana and West Africa. Export and send to patients in a few clicks. Powered by Herballo.' },
    { name: 'keywords', content: 'lab request form Ghana, laboratory request form Ghana, free lab request form doctor, online lab request form, medical lab request form PDF, lab referral form Ghana, free medical request form online, doctor lab form generator, medrequest herballo, free online laboratory request form for doctors Ghana, lab request form PDF download Ghana, medical laboratory referral form Ghana, lab request slip generator, online lab slip for doctors, laboratory investigation request form, imaging request form online, scan request form doctor Ghana, free radiology request form, blood test request form online, FBC request form Ghana, ultrasound request form doctor, lab request form Nigeria, lab request form West Africa, online medical form Africa, free doctor tools Africa, medical request form Accra, generate lab request PDF, digital lab slip doctor, paperless lab request form' },
    { name: 'robots', content: 'index, follow' },
    { name: 'author', content: 'Herballo' },
    { name: 'geo.region', content: 'GH' },
    { name: 'geo.placename', content: 'Ghana' },
    { property: 'og:title', content: 'MedRequest — Free Lab Request Form Generator for Doctors' },
    { property: 'og:description', content: 'Generate a professional lab request PDF in seconds. Free for all doctors in Ghana and West Africa. Powered by Herballo.' },
    { property: 'og:url', content: 'https://herballo.co/medrequest' },
    { property: 'og:type', content: 'website' },
    { property: 'og:image', content: 'https://herballo.co/images/medrequest-banner.jpg' },
    { property: 'og:site_name', content: 'Herballo' },
    { property: 'og:locale', content: 'en_GH' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'MedRequest — Free Lab Request Form for Doctors' },
    { name: 'twitter:description', content: 'Generate a professional lab request PDF in seconds. Free for all doctors in Ghana.' },
    { name: 'twitter:image', content: 'https://herballo.co/images/medrequest-banner.jpg' },
  ],
  link: [{ rel: 'canonical', href: 'https://herballo.co/medrequest' }],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'MedRequest',
        description: 'Free online laboratory and imaging request form generator for doctors in Ghana and West Africa.',
        url: 'https://herballo.co/medrequest',
        applicationCategory: 'MedicalApplication',
        operatingSystem: 'Web',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'GHS' },
        provider: { '@type': 'Organization', name: 'Herballo', url: 'https://herballo.co' }
      })
    }
  ]
})

const LABS = [
  'Full Blood Count (FBC)', 'Erythrocyte Sedimentation Rate (ESR)', 'Blood Group & Rhesus Factor',
  'Fasting Blood Sugar (FBS)', 'Random Blood Sugar (RBS)', 'HbA1c (Glycated Haemoglobin)',
  'Liver Function Test (LFT)', 'Renal Function Test (RFT)', 'Serum Electrolytes',
  'Lipid Profile', 'Thyroid Function Test (TFT)', 'Serum Uric Acid',
  'Hepatitis B Surface Antigen (HBsAg)', 'Hepatitis C Antibody', 'HIV 1 & 2 Antibody',
  'Malaria Parasite (MP) Test', 'Widal Test (Typhoid)', 'VDRL / Syphilis Test',
  'Urinalysis', 'Urine Culture & Sensitivity', 'Stool Microscopy & Culture',
  'Sputum AFB (TB Test)', 'Pregnancy Test (Serum beta-hCG)', 'Prostate Specific Antigen (PSA)',
  'Serum Creatinine', 'Serum Albumin', 'C-Reactive Protein (CRP)', 'Prothrombin Time (PT/INR)',
  'CD4 Count', 'Blood Culture & Sensitivity', 'Genotype (Sickle Cell Screen)', 'Pap Smear'
]

const SCANS = [
  'Chest X-Ray (CXR)', 'Abdominal X-Ray', 'Spine X-Ray (Lumbar / Cervical / Thoracic)',
  'Pelvic X-Ray', 'Skull X-Ray', 'Hand / Wrist X-Ray', 'Knee X-Ray', 'Hip X-Ray',
  'Abdominal Ultrasound', 'Pelvic Ultrasound', 'Obstetric Ultrasound (Dating / Anomaly)',
  'Renal / Urinary Tract Ultrasound', 'Thyroid Ultrasound', 'Breast Ultrasound',
  'Testicular Ultrasound', 'Doppler Ultrasound (Vascular)', 'Echocardiogram',
  'CT Scan - Head / Brain', 'CT Scan - Chest', 'CT Scan - Abdomen & Pelvis',
  'CT Scan - Spine', 'MRI - Brain', 'MRI - Spine', 'MRI - Knee / Joint',
  'Mammogram', 'Bone Mineral Density (DEXA Scan)', 'Electrocardiogram (ECG)',
  'Electroencephalogram (EEG)', 'Upper GI Endoscopy', 'Colonoscopy'
]

const professions = [
  { icon: '👨‍⚕️', label: 'Medical Doctor / Specialist', value: 'doctor' },
  { icon: '🌿', label: 'Herbalist / Alternative Practitioner', value: 'herbalist' },
  { icon: '🏥', label: 'Clinic / Hospital Administrator', value: 'admin' },
  { icon: '👩‍⚕️', label: 'Nurse / Physician Assistant', value: 'nurse' },
  { icon: '👤', label: 'Other Healthcare Professional', value: 'other' },
]

const { $supabase } = useNuxtApp()

const formVisible = ref(false)
const selectedProfession = ref('')
const shareCopied = ref(false)
const exportCount = ref(0)
const showHowTo = ref(false)


const form = reactive({
  doctorName: '', specialisation: '', hospital: '', doctorPhone: '',
  patientName: '', patientAge: '', patientSex: '', patientId: '',
  urgent: false, notes: ''
})

const showErrors = ref(false)
const showLabs = ref(false)
const showScans = ref(false)
const labSearch = ref('')
const scanSearch = ref('')
const selectedLabs = ref(new Set())
const selectedScans = ref(new Set())

const filteredLabs = computed(() => LABS.filter(l => l.toLowerCase().includes(labSearch.value.toLowerCase())))
const filteredScans = computed(() => SCANS.filter(s => s.toLowerCase().includes(scanSearch.value.toLowerCase())))

const formValid = computed(() =>
  form.doctorName && form.specialisation &&
  form.patientName && form.patientAge && form.patientSex &&
  (selectedLabs.value.size > 0 || selectedScans.value.size > 0)
)

// Fetch export count on mount
onMounted(async () => {
  try {
    const { count } = await $supabase
      .from('medrequest_exports')
      .select('id', { count: 'exact', head: true })
    if (count) exportCount.value = count
  } catch (e) {
    // fail silently — count just won't show
  }
})

function proceedToForm() {
  formVisible.value = true
  setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 50)
}

function shareLink() {
  const url = window.location.href
  if (navigator.share) {
    navigator.share({
      title: 'MedRequest — Free Lab Request Form',
      text: 'Generate a professional lab request form instantly — free for all doctors in Ghana.',
      url
    })
  } else {
    navigator.clipboard.writeText(url).then(() => {
      shareCopied.value = true
      setTimeout(() => shareCopied.value = false, 3000)
    })
  }
}

function toggleSection(type) {
  if (type === 'labs') {
    showLabs.value = !showLabs.value
    if (showLabs.value) showScans.value = false
  } else {
    showScans.value = !showScans.value
    if (showScans.value) showLabs.value = false
  }
}

function toggleItem(type, item) {
  const set = type === 'labs' ? selectedLabs : selectedScans
  const newSet = new Set(set.value)
  if (newSet.has(item)) newSet.delete(item)
  else newSet.add(item)
  if (type === 'labs') selectedLabs.value = newSet
  else selectedScans.value = newSet
  // Close dropdown after selection
  if (type === 'labs') showLabs.value = false
  else showScans.value = false
}

function getInitials(name) {
  if (!name) return ''
  return name.trim().split(/\s+/).map(w => w[0].toUpperCase()).join('')
}

function handleExport() {
  if (!formValid.value) {
    showErrors.value = true
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }
  exportPDF()
}

async function exportPDF() {
  const jsPDF = (await import('jspdf')).jsPDF
  const doc = new jsPDF({ unit: 'mm', format: 'a4' })
  const W = 210, pad = 15
  const pageH = 297
  const footerH = 12
  const safeBottom = pageH - footerH - 8
  let y = 0
  let pageNum = 1

  const borderCol = [180, 220, 200]
  const headerFill = [225, 242, 235]
  const headerText = [10, 74, 56]
  const bodyFill = [250, 253, 251]
  const labelCol = [110, 140, 125]
  const valueCol = [15, 30, 20]

  function drawFooter() {
    doc.setFillColor(15, 110, 86)
    doc.rect(0, pageH - footerH, W, footerH, 'F')
    doc.setFontSize(7)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(180, 230, 210)
    doc.text('Powered by Herballo  |  www.herballo.co  |  Free lab request tool for doctors', W / 2, pageH - 4, { align: 'center' })
  }

  function checkPageBreak(neededH) {
    if (y + neededH > safeBottom) {
      drawFooter()
      doc.addPage()
      pageNum++
      doc.setFillColor(15, 110, 86)
      doc.rect(0, 0, W, 12, 'F')
      doc.setFontSize(10); doc.setFont('times', 'bold'); doc.setTextColor(255, 255, 255)
      doc.text('MedRequest', pad, 8.5)
      doc.setFontSize(7); doc.setFont('helvetica', 'normal'); doc.setTextColor(180, 230, 210)
      doc.text('Laboratory & Imaging Request Form  |  Continued', W / 2, 8.5, { align: 'center' })
      doc.text(`Page ${pageNum}`, W - pad, 8.5, { align: 'right' })
      y = 18
    }
  }

  // ── HEADER ────────────────────────────────────────────────
  doc.setFontSize(36); doc.setFont('times', 'bold'); doc.setTextColor(8, 60, 40)
  doc.text('MedRequest', W / 2, 20, { align: 'center' })

  doc.setFontSize(11); doc.setFont('helvetica', 'normal'); doc.setTextColor(140, 150, 145)
  doc.text('Laboratory & Imaging Request Form', W / 2, 28, { align: 'center' })

  if (form.hospital) {
    doc.setFontSize(13); doc.setFont('times', 'bold'); doc.setTextColor(60, 145, 105)
    doc.text(form.hospital, W / 2, 37, { align: 'center' })
  }

  y = form.hospital ? 43 : 35
  doc.setDrawColor(15, 110, 86); doc.setLineWidth(0.6)
  doc.line(pad, y, W - pad, y)
  y += 2

  if (form.urgent) {
    doc.setFillColor(210, 45, 45); doc.rect(0, y, W, 9, 'F')
    doc.setFontSize(9); doc.setFont('helvetica', 'bold'); doc.setTextColor(255, 255, 255)
    doc.text('URGENT — PLEASE PRIORITISE THIS REQUEST', W / 2, y + 6, { align: 'center' })
    y += 9
  }

  y += 5
  const today = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })
  doc.setFontSize(8); doc.setFont('helvetica', 'normal'); doc.setTextColor(130, 130, 130)
  doc.text(`Date: ${today}`, pad, y)
  doc.text(`Ref: MR-${Date.now().toString().slice(-6)}`, W - pad, y, { align: 'right' })
  y += 4
  doc.setDrawColor(210, 230, 220); doc.setLineWidth(0.3)
  doc.line(pad, y, W - pad, y)
  y += 6

  // ── TABLE SECTION ─────────────────────────────────────────
  function tableSection(title, rows) {
    const bx = pad, bw = W - pad * 2
    const headerH = 8, rowH = 14
    const totalH = headerH + rows.length * rowH
    checkPageBreak(totalH + 6)

    doc.setDrawColor(...borderCol); doc.setLineWidth(0.5)
    doc.roundedRect(bx, y, bw, totalH, 3, 3)
    doc.setFillColor(...headerFill)
    doc.roundedRect(bx, y, bw, headerH, 3, 3, 'F')
    doc.rect(bx, y + 3, bw, headerH - 3, 'F')
    doc.setFontSize(8.5); doc.setFont('helvetica', 'bold'); doc.setTextColor(...headerText)
    doc.text(title, bx + 5, y + 5.5)

    rows.forEach((cols, i) => {
      const ry = y + headerH + i * rowH
      doc.setFillColor(...bodyFill); doc.rect(bx, ry, bw, rowH, 'F')
      if (i < rows.length - 1) {
        doc.setDrawColor(210, 232, 220); doc.setLineWidth(0.2)
        doc.line(bx, ry + rowH, bx + bw, ry + rowH)
      }
      if (cols.length === 2) {
        doc.setDrawColor(210, 232, 220); doc.setLineWidth(0.2)
        doc.line(bx + bw / 2, ry, bx + bw / 2, ry + rowH)
      }
      const colW = bw / cols.length
      cols.forEach((cell, j) => {
        const cx = bx + 5 + j * colW
        doc.setFontSize(7); doc.setFont('helvetica', 'normal'); doc.setTextColor(...labelCol)
        doc.text(cell.label, cx, ry + 4.5)
        doc.setFontSize(10); doc.setFont('helvetica', 'bold'); doc.setTextColor(...valueCol)
        doc.text(cell.value || '\u2014', cx, ry + 11)
      })
    })

    doc.setDrawColor(...borderCol); doc.setLineWidth(0.5)
    doc.roundedRect(bx, y, bw, totalH, 3, 3)
    y += totalH + 6
  }

  // ── LIST TABLE ────────────────────────────────────────────
  function listTable(title, items) {
    if (items.length === 0) return
    const bx = pad, bw = W - pad * 2
    const headerH = 8, lineH = 7, cols = 2
    const rowCount = Math.ceil(items.length / cols)
    const bodyH = rowCount * lineH + 5
    const totalH = headerH + bodyH
    checkPageBreak(totalH + 6)

    doc.setDrawColor(...borderCol); doc.setLineWidth(0.5)
    doc.roundedRect(bx, y, bw, totalH, 3, 3)
    doc.setFillColor(...headerFill)
    doc.roundedRect(bx, y, bw, headerH, 3, 3, 'F')
    doc.rect(bx, y + 3, bw, headerH - 3, 'F')
    doc.setFontSize(8.5); doc.setFont('helvetica', 'bold'); doc.setTextColor(...headerText)
    doc.text(title, bx + 5, y + 5.5)

    doc.setFillColor(...bodyFill); doc.rect(bx, y + headerH, bw, bodyH, 'F')
    doc.setDrawColor(210, 232, 220); doc.setLineWidth(0.2)
    doc.line(bx + bw / 2, y + headerH, bx + bw / 2, y + totalH)

    const colW = bw / cols
    items.forEach((item, i) => {
      const col = i % cols, row = Math.floor(i / cols)
      const cx = bx + 5 + col * colW
      const iy = y + headerH + 5.5 + row * lineH
      doc.setFillColor(...borderCol); doc.circle(cx + 1.2, iy - 1.5, 0.9, 'F')
      doc.setFontSize(9); doc.setFont('helvetica', 'normal'); doc.setTextColor(...valueCol)
      doc.text(item, cx + 4, iy)
    })

    doc.setDrawColor(...borderCol); doc.setLineWidth(0.5)
    doc.roundedRect(bx, y, bw, totalH, 3, 3)
    y += totalH + 6
  }

  tableSection('REFERRING DOCTOR', [
    [{ label: 'Doctor Name', value: form.doctorName }, { label: 'Specialisation', value: form.specialisation }],
    [{ label: 'Hospital / Clinic', value: form.hospital }, { label: 'Contact', value: form.doctorPhone }]
  ])

  tableSection('PATIENT INFORMATION', [
    [{ label: 'Patient Name', value: form.patientName }, { label: 'Patient ID / File No.', value: form.patientId }],
    [{ label: 'Age', value: form.patientAge ? `${form.patientAge} years` : '' }, { label: 'Sex', value: form.patientSex }]
  ])

  const allLabs = [...selectedLabs.value]
  const allScans = [...selectedScans.value]
  if (allLabs.length > 0) listTable(`LABORATORY TESTS ORDERED — ${allLabs.length}`, allLabs)
  if (allScans.length > 0) listTable(`SCANS & IMAGING ORDERED — ${allScans.length}`, allScans)

  if (form.notes) {
    const bx = pad, bw = W - pad * 2, headerH = 8
    const lines = doc.splitTextToSize(form.notes, bw - 10)
    const bodyH = lines.length * 5.5 + 6
    const totalH = headerH + bodyH
    checkPageBreak(totalH + 6)

    doc.setDrawColor(160, 120, 10); doc.setLineWidth(0.5)
    doc.roundedRect(bx, y, bw, totalH, 3, 3)
    doc.setFillColor(245, 235, 195)
    doc.roundedRect(bx, y, bw, headerH, 3, 3, 'F')
    doc.rect(bx, y + 3, bw, headerH - 3, 'F')
    doc.setFontSize(8.5); doc.setFont('helvetica', 'bold'); doc.setTextColor(100, 70, 5)
    doc.text('ADDITIONAL NOTES / INSTRUCTIONS', bx + 5, y + 5.5)
    doc.setFillColor(255, 253, 235); doc.rect(bx, y + headerH, bw, bodyH, 'F')
    doc.setFontSize(9); doc.setFont('helvetica', 'normal'); doc.setTextColor(60, 40, 0)
    doc.text(lines, bx + 5, y + headerH + 6)
    doc.setDrawColor(160, 120, 10); doc.setLineWidth(0.5)
    doc.roundedRect(bx, y, bw, totalH, 3, 3)
    y += totalH + 6
  }

  // ── SIGNATURE ─────────────────────────────────────────────
  checkPageBreak(35)
  y += 8
  const initials = getInitials(form.doctorName)
  const sigX = pad, dateX = W / 2 + 10

  // Signature line first
  doc.setDrawColor(15, 110, 86); doc.setLineWidth(0.5)
  doc.line(sigX, y, sigX + 75, y)

  // Initials ON the line as signature
  if (initials) {
    doc.setFontSize(14); doc.setFont('helvetica', 'bold'); doc.setTextColor(15, 110, 86)
    doc.text(initials, sigX + 4, y - 2)
  }

  doc.setFontSize(7); doc.setFont('helvetica', 'normal'); doc.setTextColor(130, 150, 140)
  doc.text("Doctor's Signature & Stamp", sigX, y + 5)

  doc.setFontSize(7); doc.setFont('helvetica', 'normal'); doc.setTextColor(130, 150, 140)
  doc.text('Date Issued', dateX, y - 10)
  doc.setFontSize(12); doc.setFont('times', 'bold'); doc.setTextColor(15, 30, 20)
  doc.text(today, dateX, y - 3)
  doc.setDrawColor(15, 110, 86); doc.setLineWidth(0.5)
  doc.line(dateX, y, dateX + 75, y)

  drawFooter()

  // ── LOG TO SUPABASE ───────────────────────────────────────
  try {
    await $supabase.from('medrequest_exports').insert({
      profession: selectedProfession.value,
      labs_count: selectedLabs.value.size,
      scans_count: selectedScans.value.size,
      is_urgent: form.urgent
    })
    exportCount.value += 1
  } catch (e) {
    // fail silently
  }

  const fname = (form.patientName || 'patient').replace(/\s+/g, '_')
  doc.save(`MedRequest_${fname}.pdf`)
}
</script>

<style scoped>
.medrequest-page {
  min-height: 100vh;
  background: #f4f8f6;
}

.banner {
  width: 100%;
  height: 240px;
  overflow: hidden;
  position: relative;
}

.banner-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
}

.banner-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px 0 18px;
  background: linear-gradient(transparent, rgba(10, 60, 42, 0.7));
  display: flex;
  justify-content: center;
}

.banner-sub {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.92);
  margin: 0;
  text-align: center;
  letter-spacing: 0.2px;
}

/* ── INTRO ── */
.intro-container {
  max-width: 700px;
  margin: 0 auto;
  padding: 32px 24px 52px;
}

.intro-card {
  background: white;
  border: 1.5px solid #e1f2eb;
  border-radius: 20px;
  padding: 36px 40px;
  box-shadow: 0 2px 12px rgba(15, 110, 86, 0.07);
}

.intro-header { margin-bottom: 28px; }

.intro-title {
  font-size: 22px;
  font-weight: 800;
  color: #0a3c28;
  margin: 0 0 12px;
  line-height: 1.3;
}

.intro-desc {
  font-size: 14px;
  color: #5a7566;
  line-height: 1.7;
  margin: 0 0 14px;
}

.export-count-line {
  font-size: 13px;
  color: #0f6e56;
  background: #e4f3ec;
  border: 1px solid #9fd8c0;
  border-radius: 8px;
  padding: 8px 14px;
  margin: 0;
  display: inline-block;
}

.profession-section { margin-bottom: 24px; }

.profession-q {
  font-size: 11px;
  font-weight: 700;
  color: #0f6e56;
  margin: 0 0 14px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.profession-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.profession-card {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 14px;
  border: 1.5px solid #e1f2eb;
  border-radius: 12px;
  background: #f9fcfb;
  cursor: pointer;
  font-family: inherit;
  font-size: 13px;
  font-weight: 500;
  color: #3d5c4a;
  text-align: left;
  transition: all 0.15s;
}

.profession-card:hover { border-color: #0f6e56; background: #edf7f2; color: #0a3c28; }
.profession-card.selected { border-color: #0f6e56; background: #e4f3ec; color: #0a3c28; font-weight: 600; }
.prof-icon { font-size: 20px; flex-shrink: 0; }
.prof-label { line-height: 1.3; }

.trust-line {
  font-size: 12px;
  color: #8aaa97;
  text-align: center;
  margin: 0 0 24px;
  font-style: italic;
}

.intro-actions {
  display: flex;
  gap: 12px;
  align-items: center;
}

.share-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 13px 20px;
  border: 1.5px solid #e1f2eb;
  border-radius: 12px;
  background: white;
  color: #0f6e56;
  font-size: 14px;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition: all 0.15s;
  white-space: nowrap;
}

.share-btn:hover { border-color: #0f6e56; background: #edf7f2; }

.continue-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 13px 20px;
  border: none;
  border-radius: 12px;
  background: #d0e8dc;
  color: #6aaa8a;
  font-size: 14px;
  font-weight: 700;
  font-family: inherit;
  cursor: not-allowed;
  transition: all 0.2s;
}

.continue-btn.ready { background: #0f6e56; color: white; cursor: pointer; }
.continue-btn.ready:hover { background: #085041; }

.share-toast {
  margin-top: 14px;
  text-align: center;
  font-size: 13px;
  color: #0f6e56;
  font-weight: 600;
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }

/* ── FORM ── */
.container { max-width: 760px; margin: 0 auto; padding: 0 24px; }
.main-content { padding-top: 28px; padding-bottom: 52px; }

.card {
  background: white;
  border: 1.5px solid #e1f2eb;
  border-radius: 16px;
  padding: 24px 28px;
  margin-bottom: 18px;
  box-shadow: 0 1px 5px rgba(15, 110, 86, 0.05);
}

.section-label {
  font-size: 11px;
  font-weight: 700;
  color: #0f6e56;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  margin: 0 0 18px;
}

.req { color: #e24b4a; margin-left: 2px; }
.err-msg { font-size: 11px; color: #e24b4a; margin-top: 3px; }

.grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }

.field { display: flex; flex-direction: column; gap: 6px; }
.field label { font-size: 13px; color: #3d5c4a; font-weight: 600; }
.optional { font-weight: 400; color: #8aaa97; }

.field input,
.field select,
.field textarea {
  font-size: 14px;
  color: #1a2e24;
  background: #f4f8f6;
  border: 1.5px solid #e1f2eb;
  border-radius: 10px;
  padding: 10px 14px;
  width: 100%;
  outline: none;
  font-family: inherit;
  transition: border-color 0.15s, background 0.15s;
}

.field input:focus,
.field select:focus,
.field textarea:focus {
  border-color: #0f6e56;
  background: white;
  box-shadow: 0 0 0 3px rgba(15, 110, 86, 0.08);
}

.field input.error,
.field select.error { border-color: #e24b4a; background: #fff8f8; }
.field textarea { resize: vertical; min-height: 90px; line-height: 1.6; }

.toggle-row { display: flex; gap: 12px; }

.toggle-btn {
  flex: 1;
  padding: 12px 16px;
  border: 1.5px solid #e1f2eb;
  border-radius: 12px;
  background: #f4f8f6;
  color: #3d5c4a;
  font-size: 14px;
  font-family: inherit;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.15s;
  font-weight: 600;
}

.toggle-btn:hover { border-color: #0f6e56; color: #0f6e56; background: #edf7f2; }
.toggle-btn.active { border-color: #0f6e56; background: #e4f3ec; color: #0a4a38; }

.count-badge {
  background: #0f6e56;
  color: white;
  font-size: 11px;
  font-weight: 700;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.order-section { margin-top: 16px; border-top: 1px solid #e4f0ea; padding-top: 16px; }
.search-wrap { position: relative; margin-bottom: 10px; }

.search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #8aaa97;
  pointer-events: none;
}

.search-input {
  font-size: 14px;
  color: #1a2e24;
  background: #f4f8f6;
  border: 1.5px solid #e1f2eb;
  border-radius: 10px;
  padding: 10px 14px 10px 38px;
  width: 100%;
  outline: none;
  font-family: inherit;
  transition: border-color 0.15s, background 0.15s;
}

.search-input:focus { border-color: #0f6e56; background: white; box-shadow: 0 0 0 3px rgba(15, 110, 86, 0.08); }

.item-list {
  max-height: 220px;
  overflow-y: auto;
  border: 1.5px solid #e1f2eb;
  border-radius: 12px;
  background: white;
}

.list-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 16px;
  font-size: 14px;
  color: #1a2e24;
  border-bottom: 1px solid #f0f7f3;
  cursor: pointer;
  transition: background 0.1s;
}

.list-item:last-child { border-bottom: none; }
.list-item:hover { background: #f4f8f6; }
.list-item input[type='checkbox'] { accent-color: #0f6e56; width: 15px; height: 15px; cursor: pointer; flex-shrink: 0; }
.no-results { padding: 18px; text-align: center; font-size: 13px; color: #8aaa97; }

.tags-row { display: flex; flex-wrap: wrap; gap: 7px; margin-top: 14px; }

.tag {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 5px 10px 5px 13px;
  background: #e4f3ec;
  border: 1px solid #9fd8c0;
  border-radius: 20px;
  font-size: 12px;
  color: #0a4a38;
  font-weight: 600;
}

.tag button { background: none; border: none; color: #0f6e56; cursor: pointer; font-size: 16px; line-height: 1; padding: 0; display: flex; align-items: center; }

.urgent-row { display: flex; align-items: center; gap: 12px; }
.urgent-label { font-size: 14px; color: #3d5c4a; }

.switch { position: relative; display: inline-block; width: 44px; height: 25px; cursor: pointer; }
.switch input { opacity: 0; width: 0; height: 0; }
.slider { position: absolute; inset: 0; background: #cde3d8; border-radius: 13px; transition: background 0.2s; }
.slider::before { content: ''; position: absolute; width: 21px; height: 21px; left: 2px; top: 2px; background: white; border-radius: 50%; transition: transform 0.2s; box-shadow: 0 1px 4px rgba(0,0,0,0.18); }
.switch input:checked + .slider { background: #e24b4a; }
.switch input:checked + .slider::before { transform: translateX(19px); }

.export-wrap { margin-top: 4px; }

.export-btn {
  width: 100%;
  padding: 16px;
  border: none;
  border-radius: 14px;
  font-size: 16px;
  font-weight: 700;
  font-family: inherit;
  cursor: not-allowed;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: all 0.2s;
  background: #d0e8dc;
  color: #6aaa8a;
}

.export-btn.active { background: #0f6e56; color: white; cursor: pointer; }
.export-btn.active:hover { background: #085041; }
.export-btn.active:active { transform: scale(0.99); }



.howto-row {
  margin-bottom: 16px;
  display: flex;
  justify-content: center;
}

.howto-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  border: 1.5px solid #e1f2eb;
  border-radius: 10px;
  background: #f4f8f6;
  color: #0f6e56;
  font-size: 13px;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition: all 0.15s;
}

.howto-btn:hover { border-color: #0f6e56; background: #edf7f2; }

.howto-panel {
  background: #f4f8f6;
  border: 1.5px solid #e1f2eb;
  border-radius: 14px;
  padding: 24px 26px;
  margin-bottom: 20px;
  animation: fadeIn 0.2s ease;
}

.howto-title {
  font-size: 15px;
  font-weight: 800;
  color: #0a3c28;
  margin: 0 0 16px;
}

.howto-steps {
  padding-left: 20px;
  margin: 0 0 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.howto-steps li {
  font-size: 13.5px;
  color: #4a6355;
  line-height: 1.65;
}

.howto-steps li strong {
  color: #0a3c28;
}



@media (max-width: 600px) {
  .grid-2 { grid-template-columns: 1fr; }
  .toggle-row { flex-direction: column; }
  .card { padding: 18px 16px; border-radius: 14px; }
  .banner { height: 160px; }
  .intro-card { padding: 24px 20px; }
  .profession-grid { grid-template-columns: 1fr; }
  .intro-actions { flex-direction: column; }
  .share-btn { width: 100%; justify-content: center; }
}
</style>
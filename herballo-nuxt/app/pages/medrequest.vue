<template>
  <div class="labslip-page">

    <!-- Banner image slot -->
    <div class="banner">
      <img src="/images/labslip-banner.jpg" alt="LabSlip by Herballo" class="banner-img" />
    </div>

    <!-- Page header -->
    <div class="page-header">
      <div class="container">
        <div class="header-inner">
          <div class="logo-mark">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 2L10 18M6 6L10 2L14 6M6 14L10 18L14 14" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
              <circle cx="10" cy="10" r="3" fill="white" opacity="0.3"/>
            </svg>
          </div>
          <div>
            <h1 class="page-title">MedRequest <span class="by-herballo">by Herballo</span></h1>
            <p class="page-subtitle">Generate a professional lab request form in seconds — free for all doctors</p>
          </div>
        </div>
      </div>
    </div>

    <div class="container main-content">

      <!-- Doctor Information -->
      <div class="card">
        <p class="section-label">Doctor information</p>
        <div class="grid-2">
          <div class="field">
            <label>Doctor's full name</label>
            <input v-model="form.doctorName" type="text" placeholder="Dr. Ama Boateng" />
          </div>
          <div class="field">
            <label>Specialisation</label>
            <input v-model="form.specialisation" type="text" placeholder="General Practitioner" />
          </div>
        </div>
        <div class="grid-2" style="margin-top: 12px">
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
            <label>Patient's full name</label>
            <input v-model="form.patientName" type="text" placeholder="Kwame Mensah" />
          </div>
          <div class="field">
            <label>Age</label>
            <input v-model="form.patientAge" type="number" placeholder="e.g. 34" min="0" max="120" />
          </div>
        </div>
        <div class="grid-2" style="margin-top: 12px">
          <div class="field">
            <label>Sex</label>
            <select v-model="form.patientSex">
              <option value="">Select sex</option>
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>
          <div class="field">
            <label>Patient ID / File No. <span class="optional">(optional)</span></label>
            <input v-model="form.patientId" type="text" placeholder="e.g. KBT-00421" />
          </div>
        </div>
      </div>

      <!-- Lab & Scan Orders -->
      <div class="card">
        <p class="section-label">Lab &amp; scan orders</p>

        <div class="toggle-row">
          <button
            class="toggle-btn"
            :class="{ active: showLabs }"
            @click="showLabs = !showLabs"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2v-4M9 21H5a2 2 0 0 1-2-2v-4m0 0h18"/>
            </svg>
            Laboratory tests
            <span v-if="selectedLabs.size > 0" class="count-badge">{{ selectedLabs.size }}</span>
          </button>
          <button
            class="toggle-btn"
            :class="{ active: showScans }"
            @click="showScans = !showScans"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/>
              <line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/>
              <line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/>
            </svg>
            Scans &amp; imaging
            <span v-if="selectedScans.size > 0" class="count-badge">{{ selectedScans.size }}</span>
          </button>
        </div>

        <!-- Labs section -->
        <div v-if="showLabs" class="order-section">
          <div class="search-wrap">
            <svg class="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input v-model="labSearch" type="text" placeholder="Search lab tests..." class="search-input" />
          </div>
          <div class="item-list">
            <label
              v-for="item in filteredLabs"
              :key="item"
              class="list-item"
            >
              <input
                type="checkbox"
                :checked="selectedLabs.has(item)"
                @change="toggleItem('labs', item)"
              />
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

        <!-- Scans section -->
        <div v-if="showScans" class="order-section">
          <div class="search-wrap">
            <svg class="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input v-model="scanSearch" type="text" placeholder="Search scans..." class="search-input" />
          </div>
          <div class="item-list">
            <label
              v-for="item in filteredScans"
              :key="item"
              class="list-item"
            >
              <input
                type="checkbox"
                :checked="selectedScans.has(item)"
                @change="toggleItem('scans', item)"
              />
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
        <div class="field" style="margin-top: 12px">
          <label>Notes to the lab / radiologist</label>
          <textarea
            v-model="form.notes"
            placeholder="E.g. Patient is fasting. Please prioritise FBC. Suspected anaemia."
            rows="4"
          ></textarea>
        </div>
      </div>

      <!-- Export Button -->
      <button class="export-btn" @click="exportPDF">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="7 10 12 15 17 10"/>
          <line x1="12" y1="15" x2="12" y2="3"/>
        </svg>
        Export as PDF
      </button>

      <p class="footer-note">LabSlip is a free tool by Herballo · <a href="https://herballo.co">herballo.co</a></p>

    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'

// Replace the useHead() in your lab-request.vue with this:

useHead({
  title: 'LabSlip — Free Lab Request Form Generator for Doctors | Herballo',
  meta: [
    {
      name: 'description',
      content: 'Generate a professional laboratory and imaging request form instantly. Free online lab request form for doctors in Ghana and West Africa. Export as PDF, share via WhatsApp or email. Powered by Herballo.'
    },
    {
      name: 'keywords',
      content: 'lab request form Ghana, laboratory request form Ghana, free lab request form doctor, online lab request form, medical lab request form PDF, lab referral form Ghana, free medical request form online, doctor lab form generator, free online laboratory request form for doctors Ghana, how to generate lab request form online, lab request form PDF download Ghana, medical laboratory referral form Ghana, create lab request form online free, lab request slip generator, online lab slip for doctors, free lab slip Ghana doctors, laboratory investigation request form, imaging request form online, scan request form doctor Ghana, free radiology request form, blood test request form online, FBC request form Ghana, ultrasound request form doctor, lab request form Nigeria, lab request form West Africa, online medical form Africa, free doctor tools Africa, medical request form Accra, generate lab request PDF, export lab request form, digital lab slip doctor, paperless lab request form, online lab investigation form, labslip herballo'
    },
    { name: 'robots', content: 'index, follow' },
    { name: 'author', content: 'Herballo' },
    { name: 'geo.region', content: 'GH' },
    { name: 'geo.placename', content: 'Ghana' },

    // Open Graph
    { property: 'og:title', content: 'LabSlip — Free Lab Request Form Generator for Doctors' },
    { property: 'og:description', content: 'Generate a professional lab request PDF in seconds. Free for all doctors in Ghana and West Africa. Powered by Herballo.' },
    { property: 'og:url', content: 'https://herballo.co/medrequest' },
    { property: 'og:type', content: 'website' },
    { property: 'og:image', content: 'https://herballo.co/images/labslip-banner.jpg' },
    { property: 'og:site_name', content: 'Herballo' },
    { property: 'og:locale', content: 'en_GH' },

    // Twitter card
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'LabSlip — Free Lab Request Form for Doctors' },
    { name: 'twitter:description', content: 'Generate a professional lab request PDF in seconds. Free for all doctors in Ghana.' },
    { name: 'twitter:image', content: 'https://herballo.co/images/labslip-banner.jpg' },
  ],
  link: [
    { rel: 'canonical', href: 'https://herballo.co/medrequest' }
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'LabSlip',
        description: 'Free online laboratory and imaging request form generator for doctors in Ghana and West Africa.',
        url: 'https://herballo.co/medrequest',
        applicationCategory: 'MedicalApplication',
        operatingSystem: 'Web',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'GHS'
        },
        provider: {
          '@type': 'Organization',
          name: 'Herballo',
          url: 'https://herballo.co'
        }
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
  'Sputum AFB (TB Test)', 'Pregnancy Test (Serum βhCG)', 'Prostate Specific Antigen (PSA)',
  'Serum Creatinine', 'Serum Albumin', 'C-Reactive Protein (CRP)', 'Prothrombin Time (PT/INR)',
  'CD4 Count', 'Blood Culture & Sensitivity', 'Genotype (Sickle Cell Screen)', 'Pap Smear'
]

const SCANS = [
  'Chest X-Ray (CXR)', 'Abdominal X-Ray', 'Spine X-Ray (Lumbar / Cervical / Thoracic)',
  'Pelvic X-Ray', 'Skull X-Ray', 'Hand / Wrist X-Ray', 'Knee X-Ray', 'Hip X-Ray',
  'Abdominal Ultrasound', 'Pelvic Ultrasound', 'Obstetric Ultrasound (Dating / Anomaly)',
  'Renal / Urinary Tract Ultrasound', 'Thyroid Ultrasound', 'Breast Ultrasound',
  'Testicular Ultrasound', 'Doppler Ultrasound (Vascular)', 'Echocardiogram',
  'CT Scan — Head / Brain', 'CT Scan — Chest', 'CT Scan — Abdomen & Pelvis',
  'CT Scan — Spine', 'MRI — Brain', 'MRI — Spine', 'MRI — Knee / Joint',
  'Mammogram', 'Bone Mineral Density (DEXA Scan)', 'Electrocardiogram (ECG)',
  'Electroencephalogram (EEG)', 'Upper GI Endoscopy', 'Colonoscopy'
]

const form = reactive({
  doctorName: '',
  specialisation: '',
  hospital: '',
  doctorPhone: '',
  patientName: '',
  patientAge: '',
  patientSex: '',
  patientId: '',
  urgent: false,
  notes: ''
})

const showLabs = ref(false)
const showScans = ref(false)
const labSearch = ref('')
const scanSearch = ref('')
const selectedLabs = ref(new Set())
const selectedScans = ref(new Set())

const filteredLabs = computed(() =>
  LABS.filter(l => l.toLowerCase().includes(labSearch.value.toLowerCase()))
)
const filteredScans = computed(() =>
  SCANS.filter(s => s.toLowerCase().includes(scanSearch.value.toLowerCase()))
)

function toggleItem(type, item) {
  const set = type === 'labs' ? selectedLabs : selectedScans
  const newSet = new Set(set.value)
  if (newSet.has(item)) newSet.delete(item)
  else newSet.add(item)
  if (type === 'labs') selectedLabs.value = newSet
  else selectedScans.value = newSet
}

async function exportPDF() {
  const jsPDF = (await import('jspdf')).jsPDF
  const doc = new jsPDF({ unit: 'mm', format: 'a4' })
  const W = 210, pad = 18
  let y = 20

  doc.setFillColor(15, 110, 86)
  doc.rect(0, 0, W, 14, 'F')
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(13); doc.setFont(undefined, 'bold')
  doc.text('LABSLIP — LABORATORY & IMAGING REQUEST', W / 2, 9.5, { align: 'center' })
  doc.setFontSize(8); doc.setFont(undefined, 'normal')
  doc.text('Powered by Herballo · herballo.co', W / 2, 13, { align: 'center' })

  if (form.urgent) {
    doc.setFillColor(226, 75, 74)
    doc.rect(0, 14, W, 7, 'F')
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(10); doc.setFont(undefined, 'bold')
    doc.text('⚠ URGENT REQUEST — PLEASE PRIORITISE', W / 2, 18.5, { align: 'center' })
    y = 28
  } else { y = 22 }

  doc.setDrawColor(220, 220, 220)
  doc.setLineWidth(0.3)

  function sectionHead(title) {
    doc.setFillColor(240, 248, 245)
    doc.rect(pad, y, W - pad * 2, 7, 'F')
    doc.setTextColor(15, 110, 86)
    doc.setFontSize(9); doc.setFont(undefined, 'bold')
    doc.text(title.toUpperCase(), pad + 3, y + 5)
    y += 9
    doc.setTextColor(30, 30, 30)
    doc.setFont(undefined, 'normal')
  }

  function row(label, value, x) {
    doc.setFontSize(8); doc.setTextColor(100, 100, 100)
    doc.text(label, x, y)
    doc.setTextColor(20, 20, 20); doc.setFontSize(10); doc.setFont(undefined, 'bold')
    doc.text(value || '—', x, y + 5)
    doc.setFont(undefined, 'normal')
  }

  const half = (W - pad * 2) / 2

  sectionHead('Referring doctor')
  doc.setFillColor(248, 252, 251)
  doc.rect(pad, y - 1, W - pad * 2, 22, 'F')
  doc.rect(pad, y - 1, W - pad * 2, 22)
  row('Doctor name', form.doctorName, pad + 3)
  row('Specialisation', form.specialisation, pad + half + 3)
  y += 12
  row('Hospital / Clinic', form.hospital, pad + 3)
  row('Contact', form.doctorPhone, pad + half + 3)
  y += 14

  sectionHead('Patient information')
  doc.setFillColor(248, 252, 251)
  doc.rect(pad, y - 1, W - pad * 2, 22, 'F')
  doc.rect(pad, y - 1, W - pad * 2, 22)
  row('Patient name', form.patientName, pad + 3)
  row('Patient ID / File No.', form.patientId, pad + half + 3)
  y += 12
  row('Age', form.patientAge ? form.patientAge + ' years' : '', pad + 3)
  row('Sex', form.patientSex, pad + half + 3)
  y += 14

  const allLabs = [...selectedLabs.value]
  const allScans = [...selectedScans.value]

  if (allLabs.length > 0) {
    sectionHead('Laboratory tests ordered')
    const labH = Math.max(12, allLabs.length * 6 + 6)
    doc.setFillColor(248, 252, 251)
    doc.rect(pad, y - 1, W - pad * 2, labH, 'F')
    doc.rect(pad, y - 1, W - pad * 2, labH)
    allLabs.forEach((l, i) => {
      doc.setFontSize(10); doc.setTextColor(20, 20, 20); doc.setFont(undefined, 'normal')
      doc.text(`${i + 1}. ${l}`, pad + 3, y + 5 + (i * 6))
    })
    y += labH + 5
  }

  if (allScans.length > 0) {
    sectionHead('Scans & imaging ordered')
    const scanH = Math.max(12, allScans.length * 6 + 6)
    doc.setFillColor(248, 252, 251)
    doc.rect(pad, y - 1, W - pad * 2, scanH, 'F')
    doc.rect(pad, y - 1, W - pad * 2, scanH)
    allScans.forEach((s, i) => {
      doc.setFontSize(10); doc.setTextColor(20, 20, 20); doc.setFont(undefined, 'normal')
      doc.text(`${i + 1}. ${s}`, pad + 3, y + 5 + (i * 6))
    })
    y += scanH + 5
  }

  if (form.notes) {
    sectionHead('Additional notes / instructions')
    const lines = doc.splitTextToSize(form.notes, W - pad * 2 - 6)
    const noteH = lines.length * 5 + 8
    doc.setFillColor(255, 252, 235)
    doc.rect(pad, y - 1, W - pad * 2, noteH, 'F')
    doc.rect(pad, y - 1, W - pad * 2, noteH)
    doc.setFontSize(10); doc.setTextColor(20, 20, 20)
    doc.text(lines, pad + 3, y + 5)
    y += noteH + 5
  }

  y += 8
  doc.setDrawColor(15, 110, 86)
  doc.setLineWidth(0.3)
  doc.line(pad, y, pad + 60, y)
  doc.setFontSize(8); doc.setTextColor(100, 100, 100)
  doc.text("Doctor's signature & stamp", pad, y + 4)

  const today = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })
  doc.text(`Date issued: ${today}`, W - pad, y + 4, { align: 'right' })

  doc.setFontSize(7); doc.setTextColor(150, 150, 150)
  doc.text('This is a medical request form generated via LabSlip by Herballo · herballo.co', W / 2, 290, { align: 'center' })

  const fname = (form.patientName || 'patient').replace(/\s+/g, '_')
  doc.save(`LabSlip_${fname}.pdf`)
}
</script>

<style scoped>
.labslip-page {
  min-height: 100vh;
  background: #f7faf8;
}

.banner {
  width: 100%;
  height: 60px;
  overflow: hidden;
  background: #0f6e56;
}

.banner-img {
  width: 100%;
  height: 60px;
  object-fit: cover;
  object-position: center;
  display: block;
}

.page-header {
  background: #0f6e56;
  padding: 20px 0 24px;
}

.container {
  max-width: 760px;
  margin: 0 auto;
  padding: 0 20px;
}

.header-inner {
  display: flex;
  align-items: center;
  gap: 14px;
}

.logo-mark {
  width: 44px;
  height: 44px;
  background: rgba(255,255,255,0.15);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.page-title {
  font-size: 22px;
  font-weight: 700;
  color: white;
  margin: 0;
  line-height: 1.2;
}

.by-herballo {
  font-weight: 400;
  font-size: 16px;
  opacity: 0.7;
}

.page-subtitle {
  font-size: 13px;
  color: rgba(255,255,255,0.75);
  margin: 4px 0 0;
}

.main-content {
  padding-top: 24px;
  padding-bottom: 48px;
}

.card {
  background: white;
  border: 1px solid #e5ede9;
  border-radius: 14px;
  padding: 20px 24px;
  margin-bottom: 16px;
}

.section-label {
  font-size: 11px;
  font-weight: 600;
  color: #0f6e56;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin: 0 0 16px;
}

.grid-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.field label {
  font-size: 13px;
  color: #4a6355;
  font-weight: 500;
}

.optional {
  font-weight: 400;
  color: #8aaa97;
}

.field input,
.field select,
.field textarea {
  font-size: 14px;
  color: #1a2e24;
  background: #f7faf8;
  border: 1px solid #d0e2d8;
  border-radius: 8px;
  padding: 9px 12px;
  width: 100%;
  outline: none;
  font-family: inherit;
  transition: border-color 0.15s;
}

.field input:focus,
.field select:focus,
.field textarea:focus {
  border-color: #0f6e56;
  background: white;
}

.field textarea {
  resize: vertical;
  min-height: 90px;
}

.toggle-row {
  display: flex;
  gap: 10px;
  margin-bottom: 0;
}

.toggle-btn {
  flex: 1;
  padding: 11px 14px;
  border: 1px solid #d0e2d8;
  border-radius: 10px;
  background: #f7faf8;
  color: #4a6355;
  font-size: 14px;
  font-family: inherit;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.15s;
  font-weight: 500;
}

.toggle-btn:hover {
  border-color: #0f6e56;
  color: #0f6e56;
}

.toggle-btn.active {
  border-color: #0f6e56;
  background: #e8f5f0;
  color: #0f6e56;
}

.count-badge {
  background: #0f6e56;
  color: white;
  font-size: 11px;
  font-weight: 600;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.order-section {
  margin-top: 14px;
  border-top: 1px solid #e5ede9;
  padding-top: 14px;
}

.search-wrap {
  position: relative;
  margin-bottom: 10px;
}

.search-icon {
  position: absolute;
  left: 11px;
  top: 50%;
  transform: translateY(-50%);
  color: #8aaa97;
  pointer-events: none;
}

.search-input {
  font-size: 14px;
  color: #1a2e24;
  background: #f7faf8;
  border: 1px solid #d0e2d8;
  border-radius: 8px;
  padding: 9px 12px 9px 36px;
  width: 100%;
  outline: none;
  font-family: inherit;
  transition: border-color 0.15s;
}

.search-input:focus {
  border-color: #0f6e56;
  background: white;
}

.item-list {
  max-height: 210px;
  overflow-y: auto;
  border: 1px solid #e5ede9;
  border-radius: 10px;
  background: white;
}

.list-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 14px;
  font-size: 14px;
  color: #1a2e24;
  border-bottom: 1px solid #f0f5f2;
  cursor: pointer;
  transition: background 0.1s;
}

.list-item:last-child {
  border-bottom: none;
}

.list-item:hover {
  background: #f7faf8;
}

.list-item input[type="checkbox"] {
  accent-color: #0f6e56;
  width: 15px;
  height: 15px;
  cursor: pointer;
  flex-shrink: 0;
}

.no-results {
  padding: 16px;
  text-align: center;
  font-size: 13px;
  color: #8aaa97;
}

.tags-row {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 12px;
}

.tag {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px 4px 12px;
  background: #e8f5f0;
  border: 1px solid #9fd8c0;
  border-radius: 20px;
  font-size: 12px;
  color: #0a4a38;
  font-weight: 500;
}

.tag button {
  background: none;
  border: none;
  color: #0f6e56;
  cursor: pointer;
  font-size: 15px;
  line-height: 1;
  padding: 0;
  display: flex;
  align-items: center;
}

.urgent-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.urgent-label {
  font-size: 14px;
  color: #4a6355;
}

.switch {
  position: relative;
  display: inline-block;
  width: 42px;
  height: 24px;
  cursor: pointer;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  inset: 0;
  background: #d0e2d8;
  border-radius: 12px;
  transition: background 0.2s;
}

.slider::before {
  content: '';
  position: absolute;
  width: 20px;
  height: 20px;
  left: 2px;
  top: 2px;
  background: white;
  border-radius: 50%;
  transition: transform 0.2s;
  box-shadow: 0 1px 3px rgba(0,0,0,0.15);
}

.switch input:checked + .slider {
  background: #e24b4a;
}

.switch input:checked + .slider::before {
  transform: translateX(18px);
}

.export-btn {
  width: 100%;
  padding: 15px;
  background: #0f6e56;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: background 0.15s;
  margin-top: 8px;
}

.export-btn:hover {
  background: #085041;
}

.footer-note {
  text-align: center;
  font-size: 12px;
  color: #8aaa97;
  margin-top: 20px;
}

.footer-note a {
  color: #0f6e56;
  text-decoration: none;
}

@media (max-width: 600px) {
  .grid-2 {
    grid-template-columns: 1fr;
  }
  .toggle-row {
    flex-direction: column;
  }
  .card {
    padding: 16px;
  }
}
</style>
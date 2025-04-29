const questions = [
  "Saya merasa nyaman hanya jika menjadi pusat perhatian.",
  "Saya sering membandingkan diri saya dengan orang lain untuk merasa lebih baik.",
  "Saya percaya bahwa saya punya kualitas istimewa yang tidak dimiliki kebanyakan orang.",
  "Saya merasa kesal jika orang lain tidak menyadari pencapaian saya.",
  "Saya terbuka menerima kritik dan menjadikannya sebagai bahan evaluasi diri.",
  "Saya merasa tersaingi saat melihat teman saya lebih sukses dari saya.",
  "Saya sering merasa harus terlihat sempurna di depan orang lain.",
  "Saya bisa menghargai kesuksesan orang lain tanpa merasa minder.",
  "Saya sering merasa bahwa saya pantas mendapatkan perlakuan khusus.",
  "Saya mampu membangun kepercayaan diri tanpa harus bergantung pada pujian orang lain.",
  "Saya merasa cemas atau tidak nyaman ketika tidak mendapat validasi dari media sosial atau orang sekitar.",
  "Saya merasa tidak masalah jika bukan saya yang paling menonjol dalam suatu kelompok.",
  "Saya lebih fokus pada citra diri dibandingkan dengan proses berkembangnya diri saya.",
  "Saya bisa menerima ketika ada orang yang lebih unggul dari saya tanpa merasa rendah diri.",
  "Saya sering merasa bahwa dunia belum cukup menghargai potensi saya.",
];

// Questions that need reverse scoring (where higher agreement indicates less narcissism)
const reverseQuestions = [5, 8, 10, 12, 14];

// Result zones
const resultZones = [
  {
    min: 15,
    max: 34,
    zone: "green",
    icon: "🟢",
    title: "Hijau: Seimbang",
    description:
      '"Kamu berada di jalur yang seimbang." Kamu punya rasa percaya diri yang sehat dan empati yang baik. Pertahankan keseimbangan ini dengan tetap sadar diri dan terbuka terhadap masukan.',
    recommendations: [
      "🔎 Coba lanjut ke Modul Literasi Diri – Level Basic.",
      "📔 Mulai isi Jurnal Refleksi Diri harianmu.",
      "📩 Kirim Surat Untuk Diri Sendiri sebagai pengingat positif.",
      "📅 Ikuti Checklist Harian untuk menjaga pola sadar diri.",
    ],
  },
  {
    min: 35,
    max: 54,
    zone: "yellow",
    icon: "🟡",
    title: "Kuning: Cenderung Narsistik",
    description:
      '"Kamu mungkin mulai terlalu fokus pada validasi eksternal." Ini tanda bahwa kamu butuh menggali lebih dalam: apa sih yang bikin kamu butuh pengakuan terus? Wajar kok, tapi yuk kenali lebih baik.',
    recommendations: [
      "🧠 Baca Modul Medium: Self-Love vs Narsistik.",
      '✍️ Coba isi Jurnal Refleksi Diri, khususnya soal "validasi" dan "pengakuan".',
      "💬 Ambil 1 kartu dari Reflection Cards setiap hari.",
      "🎯 Ikuti Tantangan Empati 7 Hari.",
      "🔈 Dengarkan 1 sesi Monolog Dalam Diri malam ini.",
    ],
  },
  {
    min: 55,
    max: 75,
    zone: "red",
    icon: "🔴",
    title: "Merah: Perlu Refleksi Mendalam",
    description:
      '"Tanda-tanda narsisme tinggi terdeteksi." Mungkin kamu merasa harus selalu jadi yang terbaik untuk merasa cukup, dan kritik terasa menyakitkan. Ini bisa jadi awal perubahan, bukan vonis.',
    recommendations: [
      "💡 Ikuti Modul Advance: Star Syndrome dan Dampaknya.",
      "🗣️ Tulis Surat untuk Diri Sendiri saat kamu merasa ingin banget diakui.",
      '🎧 Dengarkan Monolog Dalam Diri dengan tema "cukup itu keren".',
      "🔍 Gunakan Reality Check Generator untuk menetralkan ekspektasi berlebihan.",
      "📩 Pertimbangkan kirim pesan ke Kontak & Dukungan (mentor/komunitas).",
    ],
  },
];

// DOM elements
const intro = document.getElementById("intro");
const quizContainer = document.getElementById("quizContainer");
const resultContainer = document.getElementById("resultContainer");
const questionNumber = document.getElementById("questionNumber");
const questionElement = document.getElementById("question");
const options = document.querySelectorAll(".option");
const nextBtn = document.getElementById("nextBtn");
const progressBar = document.getElementById("progressBar");
const resultIcon = document.getElementById("resultIcon");
const resultTitle = document.getElementById("resultTitle");
const resultScore = document.getElementById("resultScore");
const resultDescription = document.getElementById("resultDescription");
const recommendationsList = document.getElementById("recommendationsList");
const startBtn = document.getElementById("startBtn");
const retakeBtn = document.getElementById("retakeBtn");

// Quiz variables
let currentQuestion = 0;
let score = 0;
let userAnswers = Array(questions.length).fill(0);

// Event listeners
startBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", nextQuestion);
retakeBtn.addEventListener("click", retakeQuiz);

// Add event listeners to options
options.forEach((option) => {
  option.addEventListener("click", () => {
    // Remove selected class from all options
    options.forEach((opt) => opt.classList.remove("selected"));

    // Add selected class to clicked option
    option.classList.add("selected");

    // Enable next button
    nextBtn.disabled = false;

    // Save user answer
    userAnswers[currentQuestion] = parseInt(option.getAttribute("data-value"));
  });
});

// Start quiz function
function startQuiz() {
  intro.style.display = "none";
  quizContainer.style.display = "block";
  resultContainer.style.display = "none";
  currentQuestion = 0;
  score = 0;
  userAnswers = Array(questions.length).fill(0);
  updateQuestion();
}

// Update question function
function updateQuestion() {
  questionNumber.textContent = `Pertanyaan ${currentQuestion + 1}/${
    questions.length
  }`;
  questionElement.textContent = questions[currentQuestion];

  // Update progress bar
  const progress = (currentQuestion / questions.length) * 100;
  progressBar.style.width = `${progress}%`;

  // Reset option selection
  options.forEach((option) => option.classList.remove("selected"));
  nextBtn.disabled = true;

  // If user has already answered this question, select the option
  if (userAnswers[currentQuestion] > 0) {
    options.forEach((option) => {
      if (
        parseInt(option.getAttribute("data-value")) ===
        userAnswers[currentQuestion]
      ) {
        option.classList.add("selected");
      }
    });
    nextBtn.disabled = false;
  }
}

// Next question function
function nextQuestion() {
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    updateQuestion();
  } else {
    calculateResult();
  }
}

// Calculate result function
function calculateResult() {
  score = 0;

  for (let i = 0; i < questions.length; i++) {
    // Check if this question needs reverse scoring
    if (reverseQuestions.includes(i + 1)) {
      // Reverse scoring (6 - original value)
      score += 6 - userAnswers[i];
    } else {
      score += userAnswers[i];
    }
  }

  showResult();
}

// Show result function
function showResult() {
  quizContainer.style.display = "none";
  resultContainer.style.display = "block";

  // Determine result zone
  let resultData;
  for (const zone of resultZones) {
    if (score >= zone.min && score <= zone.max) {
      resultData = zone;
      break;
    }
  }

  // Update result UI
  resultContainer.className = `result-container result-${resultData.zone}`;
  resultIcon.textContent = resultData.icon;
  resultTitle.textContent = resultData.title;
  resultScore.textContent = `Skor: ${score}/75`;
  resultDescription.textContent = resultData.description;

  // Clear and update recommendations
  recommendationsList.innerHTML = "";
  resultData.recommendations.forEach((rec) => {
    const recItem = document.createElement("div");
    recItem.className = "recommendation-item";
    recItem.innerHTML = rec;
    recommendationsList.appendChild(recItem);
  });
}

// Retake quiz function
function retakeQuiz() {
  resultContainer.style.display = "none";
  intro.style.display = "block";
}

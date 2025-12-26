

/* ===== State ===== */
let currentLang = localStorage.getItem("lang") || "en";
let darkMode = localStorage.getItem("dark") === "true";

/* ===== Elements ===== */
const textInput = document.getElementById("textInput");
const title = document.getElementById("title");
const langBtn = document.getElementById("langBtn");
const darkBtn = document.getElementById("darkBtn");
const copyBtn = document.getElementById("copyBtn");
const clearBtn = document.getElementById("clearBtn");

const wLabel = document.getElementById("wLabel");
const cLabel = document.getElementById("cLabel");
const sLabel = document.getElementById("sLabel");
const pLabel = document.getElementById("pLabel");
const rLabel = document.getElementById("rLabel");

const wordCount = document.getElementById("wordCount");
const charCount = document.getElementById("charCount");
const sentenceCount = document.getElementById("sentenceCount");
const paragraphCount = document.getElementById("paragraphCount");
const readingTime = document.getElementById("readingTime");

/* ===== Translations ===== */
const translations = {
    en: {
        title: "Word Counter App",
        placeholder: "Type here...",
        copy: "Copy",
        clear: "Clear",
        words: "Words",
        chars: "Characters",
        sentences: "Sentences",
        paragraphs: "Paragraphs",
        reading: "Reading Time",
        alert: "Text copied!",
        toggle: "বাংলা"
    },
    bn: {
        title: "ওয়ার্ড কাউন্টার অ্যাপ",
        placeholder: "এখানে লিখুন...",
        copy: "কপি",
        clear: "মুছুন",
        words: "শব্দ",
        chars: "অক্ষর",
        sentences: "বাক্য",
        paragraphs: "প্যারাগ্রাফ",
        reading: "পড়ার সময়",
        alert: "টেক্সট কপি হয়েছে!",
        toggle: "English"
    }
};

/* ===== Init ===== */
textInput.value = localStorage.getItem("text") || "";
if (darkMode) document.body.classList.add("dark");

applyLanguage();
updateCounts();

/* ===== Functions ===== */
function applyLanguage() {
    const t = translations[currentLang];
    title.innerText = t.title;
    textInput.placeholder = t.placeholder;
    copyBtn.innerText = t.copy;
    clearBtn.innerText = t.clear;
    wLabel.innerText = t.words;
    cLabel.innerText = t.chars;
    sLabel.innerText = t.sentences;
    pLabel.innerText = t.paragraphs;
    rLabel.innerText = t.reading;
    langBtn.innerText = t.toggle;
}

function updateCounts() {
    const text = textInput.value.trim();
    const words = text ? text.split(/\s+/).length : 0;

    wordCount.innerText = words;
    charCount.innerText = textInput.value.length;
    sentenceCount.innerText = text ? text.split(/[.!?]+/).filter(s => s.trim()).length : 0;
    paragraphCount.innerText = text ? text.split(/\n+/).filter(p => p.trim()).length : 0;
    readingTime.innerText = words ? Math.ceil(words / 200) + " min" : "0 min";
}

/* ===== Events ===== */
textInput.addEventListener("input", () => {
    localStorage.setItem("text", textInput.value);
    updateCounts();
});

langBtn.addEventListener("click", () => {
    currentLang = currentLang === "en" ? "bn" : "en";
    localStorage.setItem("lang", currentLang);
    applyLanguage();
});

darkBtn.addEventListener("click", () => {
    darkMode = !darkMode;
    document.body.classList.toggle("dark");
    localStorage.setItem("dark", darkMode);
});

copyBtn.addEventListener("click", () => {
    textInput.select();
    document.execCommand("copy");
    alert(translations[currentLang].alert);
});

clearBtn.addEventListener("click", () => {
    textInput.value = "";
    localStorage.removeItem("text");
    updateCounts();
});

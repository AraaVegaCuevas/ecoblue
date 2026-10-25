const LANGUAGES = {
    es: {
        label: "ES",
        flag: "https://flagcdn.com/w20/es.png",
        alt: "Español"
    },
    en: {
        label: "EN",
        flag: "https://flagcdn.com/w20/us.png",
        alt: "English"
    }
};

const DEFAULT_LANG = "es";

let currentLang = DEFAULT_LANG;
const translationCache = {};

async function getTranslations(lang, page) {
    if (!translationCache[lang]) {
        translationCache[lang] = {};
    }

    const cache = translationCache[lang];

    if (!cache.common) {
        const response = await fetch(
            `locales/${lang}/common.json`
        );

        if (!response.ok) {
            throw new Error("No se pudo cargar common.json");
        }

        cache.common = await response.json();
    }

    if (!cache[page]) {
        const response = await fetch(
            `locales/${lang}/${page}.json`
        );

        if (!response.ok) {
            throw new Error(`No se pudo cargar ${page}.json`);
        }

        cache[page] = await response.json();
    }

    return {
        ...cache.common,
        ...cache[page]
    };
}

function updateLanguageSelector(lang) {
    const selected = LANGUAGES[lang];

    if (!selected) return;

    const langToggle = document.getElementById("langToggle");
    const langFlag = document.getElementById("langFlag");

    if (langToggle) {
        langToggle.textContent = selected.label;
    }

    if (langFlag) {
        langFlag.src = selected.flag;
        langFlag.alt = selected.alt;
    }

    document.documentElement.lang = lang;
}

function translatePage(dictionary) {
    document.querySelectorAll("[data-i18n]").forEach(element => {
        const key = element.dataset.i18n;

        if (Object.hasOwn(dictionary, key)) {
            element.textContent = dictionary[key];
        }
    });

    document.querySelectorAll("[data-i18n-placeholder]")
        .forEach(element => {
            const key = element.dataset.i18nPlaceholder;

            if (Object.hasOwn(dictionary, key)) {
                element.placeholder = dictionary[key];
            }
        });

    document.querySelectorAll("[data-i18n-alt]")
        .forEach(element => {
            const key = element.dataset.i18nAlt;

            if (Object.hasOwn(dictionary, key)) {
                element.alt = dictionary[key];
            }
        });

    document.querySelectorAll("[data-i18n-aria-label]")
        .forEach(element => {
            const key = element.dataset.i18nAriaLabel;

            if (Object.hasOwn(dictionary, key)) {
                element.setAttribute("aria-label", dictionary[key]);
            }
        });
}

async function loadLanguage(lang) {
    if (!Object.hasOwn(LANGUAGES, lang)) {
        return;
    }

    const page = document.body.dataset.page;

    if (!page) {
        console.error("Falta el atributo data-page en body.");
        return;
    }

    try {
        const dictionary = await getTranslations(lang, page);

        // Actualizar traducciones y selector.
        translatePage(dictionary);
        updateLanguageSelector(lang);

        // Guardar el idioma solo después de cargarlo correctamente.
        currentLang = lang;
        localStorage.setItem("language", lang);

    } catch (error) {
        console.error("Error al cargar el idioma:", error);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const langItems = document.querySelectorAll(
        "#navbarCollapseLang [data-lang]"
    );

    langItems.forEach(item => {
        item.addEventListener("click", event => {
            event.preventDefault();
            loadLanguage(item.dataset.lang);
        });
    });

    let savedLang = DEFAULT_LANG;

    try {
        const storedLang = localStorage.getItem("language");

        if (storedLang && Object.hasOwn(LANGUAGES, storedLang)) {
            savedLang = storedLang;
        }
    } catch (error) {
        // Si el almacenamiento está bloqueado, usar el idioma por defecto.
    }

    loadLanguage(savedLang);
});
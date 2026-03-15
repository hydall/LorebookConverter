document.addEventListener('DOMContentLoaded', () => {
    const resultArea = document.getElementById('result-area');
    const errorArea = document.getElementById('error-area');
    const downloadBtn = document.getElementById('download-btn');
    const resetBtn = document.getElementById('reset-btn');
    const errorResetBtn = document.getElementById('error-reset-btn');
    const fileNameEl = document.getElementById('file-name');
    const entryCountEl = document.getElementById('entry-count');
    const errorMessageEl = document.getElementById('error-message');
    const langToggleBtn = document.getElementById('lang-toggle');
    const ruCommunityLinks = document.getElementById('ru-community-links');

    // --- Internationalization (i18n) ---
    const translations = {
        en: {
            "title": "Lorebook Converter",
            "meta_desc": "Convert your character lorebooks from Janitor.ai format directly into SillyTavern format with ease.",
            "subtitle": "Janitor.ai &rarr; SillyTavern format",
            "guide_title": "How to copy the lorebook:",
            "guide_note": "Works only if the bot creator made the lorebook Public.",
            "step_1": "Open the desired bot on Janitor.ai",
            "step_2": "In the <strong>more</strong> section, find <strong>Lorebook</strong> and click on it",
            "step_3": "On the opened page, click on <strong>View Script</strong>",
            "step_4": "Click on <strong>Clone script</strong>",
            "step_5": `On the new page, click on the <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill="currentColor" style="vertical-align: text-bottom;"><path d="M320-240 80-480l240-240 57 57-183 183 183 183-57 57Zm320 0-57-57 183-183-183-183 57-57 240 240-240 240Z"/></svg> icon`,
            "step_6": `To the right of this icon, click on the copy icon <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill="currentColor" style="vertical-align: text-bottom;"><path d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z"/></svg>`,
            "step_7": "Paste the copied text into the field below and click \"Convert\".",
            "textarea_placeholder": "Paste copied text (starting with [ or {) here...",
            "parse_btn": "Convert lorebook",
            "or": "or",
            "drop_title": "Choose file",
            "drop_desc": "Drop lorebook JSON here",
            "success_msg": "Successfully converted! Found <span id=\"entry-count\">0</span> entries.",
            "download_btn": "Download",
            "reset_btn": "Convert another lorebook",
            "error_title": "Conversion Error",
            "debug_title": "Server response (For debugging):",
            "try_again_btn": "Try again",
            "footer_links": "Useful links:",
            "err_empty": "Please paste the lorebook JSON.",
            "err_invalid_json": "Invalid JSON format.",
            "err_file_type": "Please upload a JSON or HTML lorebook file.",
            "err_no_lorebook_in_html": "Could not find lorebook in HTML file.",
            "err_read_file": "Error reading file.",
            "err_already_st": "This file already looks like a SillyTavern lorebook.",
            "err_unexpected_format": "Unexpected format. Expected Janitor.ai format (array of objects).",
            "donate_text": "Support Me",
            "donate_url": "https://buymeacoffee.com/hydall",
            "donate_color": "#FFDD00",
            "donate_icon": `<img src="assets/bmc-logo.svg" style="height: 16px; width: 14px; filter: drop-shadow(0 0 1px rgba(0,0,0,0.5));">`
        },
        ru: {
            "title": "Конвертер лорбуков",
            "meta_desc": "Легко конвертируйте лорбуки персонажей из формата Janitor.ai в формат SillyTavern.",
            "subtitle": "Janitor.ai &rarr; формат SillyTavern",
            "guide_title": "Как скопировать лорбук:",
            "guide_note": "Работает только если создатель бота открыл доступ к лорбуку (Public).",
            "step_1": "Откройте нужного бота на сайте Janitor.ai",
            "step_2": "В блоке <strong>more</strong> найдите <strong>Lorebook</strong> и нажмите на него",
            "step_3": "На открывшейся странице нажмите на <strong>View Script</strong>",
            "step_4": "Нажмите на <strong>Clone script</strong>",
            "step_5": `На новой странице нажмите на иконку <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill="currentColor" style="vertical-align: text-bottom;"><path d="M320-240 80-480l240-240 57 57-183 183 183 183-57 57Zm320 0-57-57 183-183-183-183 57-57 240 240-240 240Z"/></svg>`,
            "step_6": `Справа от этой иконки нажмите на иконку <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill="currentColor" style="vertical-align: text-bottom;"><path d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z"/></svg>`,
            "step_7": "Вставьте скопированный текст в поле ниже и нажмите «Конвертировать».",
            "textarea_placeholder": "Вставьте скопированный текст (начинается с [ или {) сюда...",
            "parse_btn": "Конвертировать лорбук",
            "or": "или",
            "drop_title": "Выбрать файл",
            "drop_desc": "Перетащите JSON лорбука сюда",
            "success_msg": "Успешно конвертировано! Найдено <span id=\"entry-count\">0</span> записей.",
            "download_btn": "Скачать",
            "reset_btn": "Сконвертировать другой лорбук",
            "error_title": "Ошибка конвертации",
            "debug_title": "Ответ сервера (Для отладки):",
            "try_again_btn": "Попробовать снова",
            "footer_links": "Полезные материалы:",
            "err_empty": "Пожалуйста, вставьте текст JSON лорбука.",
            "err_invalid_json": "Неверный формат JSON.",
            "err_file_type": "Пожалуйста, загрузите JSON или HTML файл лорбука.",
            "err_no_lorebook_in_html": "Не удалось найти лорбук в HTML файле.",
            "err_read_file": "Ошибка при чтении файла.",
            "err_already_st": "Этот файл уже выглядит как лорбук SillyTavern.",
            "err_unexpected_format": "Неожиданный формат. Ожидается формат Janitor.ai (массив объектов).",
            "donate_text": "Поддержать меня",
            "donate_url": "https://boosty.to/hydall",
            "donate_color": "#f15f2c",
            "donate_icon": `<img src="assets/boosty.svg" style="height: 16px; width: 16px; filter: invert(1) brightness(2);">`
        }
    };

    let currentLang = 'ru'; // Default

    function detectLanguage() {
        const userLang = navigator.language || navigator.userLanguage;
        if (userLang.toLowerCase().startsWith('ru')) {
            currentLang = 'ru';
        } else {
            currentLang = 'en'; // English for all non-Russian
        }
        applyTranslations();
    }

    function applyTranslations() {
        const dict = translations[currentLang];
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            // Check if element has inner span with ID "entry-count" before replacing innerHTML blindly
            if (key === 'success_msg' && el.querySelector('#entry-count')) {
                const count = document.getElementById('entry-count').textContent;
                el.innerHTML = dict[key].replace('<span id="entry-count">0</span>', `<span id="entry-count">${count}</span>`);
            } else if (key === 'donate_link') {
                el.href = dict['donate_url'];
                el.innerHTML = `${dict['donate_icon']} ${dict['donate_text']}`;

                // Update hover color dynamics
                el.onmouseover = () => { el.style.opacity = '1'; el.style.background = dict['donate_color']; el.style.color = '#000'; };
                el.onmouseout = () => { el.style.opacity = '0.9'; el.style.background = 'rgba(255,255,255,0.1)'; el.style.color = 'var(--text-main)'; };
            } else if (dict[key]) {
                el.innerHTML = dict[key];
            }
        });

        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (dict[key]) {
                el.placeholder = dict[key];
            }
        });

        // Hide Telegram links if not Russian
        if (ruCommunityLinks) {
            ruCommunityLinks.style.display = currentLang === 'ru' ? 'block' : 'none';
        }

        // Update toggle button text to show current language
        const langLabel = document.getElementById('lang-label');
        if (langLabel) {
            langLabel.textContent = currentLang.toUpperCase();
        }

        // Update document title and meta
        if (dict["title"]) document.title = dict["title"];
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc && dict["meta_desc"]) metaDesc.setAttribute('content', dict["meta_desc"]);
    }

    function getTranslation(key) {
        return translations[currentLang][key] || key;
    }

    // Initialize language
    detectLanguage();

    // Toggle language manually
    if (langToggleBtn) {
        langToggleBtn.addEventListener('click', () => {
            currentLang = currentLang === 'ru' ? 'en' : 'ru';
            applyTranslations();
        });
    }

    // Text import
    const textInputContainer = document.querySelector('.text-input-container');
    const textInput = document.getElementById('text-input');
    const parseBtn = document.getElementById('parse-btn');

    let convertedData = null;
    let originalFileName = "";

    // --- Text Input Logic ---
    parseBtn.addEventListener('click', () => {
        const text = textInput.value.trim();
        if (!text) {
            showError(getTranslation('err_empty'));
            return;
        }

        try {
            const data = JSON.parse(text);
            originalFileName = "janitor_import.json";
            processLorebook(data);
        } catch (err) {
            showError(getTranslation('err_invalid_json'), text);
            console.error(err);
        }
    });

    function processLorebook(data) {
        // If it's already an ST format
        if (data.entries && Array.isArray(data.entries)) {
            showError(getTranslation('err_already_st'));
            return;
        }

        // Expected Janitor format: Array of objects
        if (!Array.isArray(data)) {
            showError(getTranslation('err_unexpected_format'), JSON.stringify(data, null, 2));
            return;
        }

        try {
            const stFormat = { entries: {} };

            data.forEach((item, index) => {
                let keys = [];
                if (Array.isArray(item.key)) {
                    keys = item.key;
                } else if (item.keysRaw) {
                    keys = item.keysRaw.split(',').map(s => s.trim()).filter(s => s);
                }

                stFormat.entries[index.toString()] = {
                    uid: index,
                    key: keys,
                    keysecondary: Array.isArray(item.keysecondary) ? item.keysecondary : [],
                    comment: item.name || item.comment || `Entry ${index}`,
                    content: item.content || "",
                    constant: !!item.constant,
                    selective: !item.constant,
                    order: item.priority || item.insertion_order || 100,
                    position: 0,
                    disable: item.enabled === false,
                    displayIndex: index,
                    addMemo: true,
                    group: "",
                    groupOverride: false,
                    groupWeight: item.groupWeight || 100,
                    sticky: 0,
                    cooldown: 0,
                    delay: 0,
                    probability: item.probability || 100,
                    depth: 4,
                    useProbability: true,
                    role: null,
                    vectorized: false,
                    excludeRecursion: false,
                    preventRecursion: false,
                    delayUntilRecursion: false,
                    scanDepth: null,
                    caseSensitive: item.case_sensitive !== undefined ? item.case_sensitive : null,
                    matchWholeWords: item.matchWholeWords !== undefined ? item.matchWholeWords : null,
                    useGroupScoring: null,
                    automationId: "",
                    selectiveLogic: item.selectiveLogic || 0,
                    ignoreBudget: false,
                    matchPersonaDescription: false,
                    matchCharacterDescription: false,
                    matchCharacterPersonality: false,
                    matchCharacterDepthPrompt: false,
                    matchScenario: false,
                    matchCreatorNotes: false,
                    outletName: "",
                    triggers: [],
                    characterFilter: {
                        isExclude: false,
                        names: [],
                        tags: []
                    }
                };
            });

            convertedData = stFormat;
            showSuccess(originalFileName, data.length);
        } catch (err) {
            showError("Произошла ошибка при конвертации данных.", err.toString());
            console.error(err);
        }
    }

    function showSuccess(filename, count) {
        if (textInputContainer) textInputContainer.classList.add('hidden');
        errorArea.classList.add('hidden');
        resultArea.classList.remove('hidden');

        document.getElementById('file-name').textContent = filename;
        const msgTpl = getTranslation('success_msg');
        document.querySelector('#result-area p').innerHTML = msgTpl.replace('<span id="entry-count">0</span>', `<span id="entry-count">${count}</span>`);
    }

    function showError(message, debugText = null) {
        if (textInputContainer) textInputContainer.classList.add('hidden');
        resultArea.classList.add('hidden');
        errorArea.classList.remove('hidden');
        errorMessageEl.textContent = message;
    }

    function resetUI() {
        convertedData = null;
        originalFileName = "";

        resultArea.classList.add('hidden');
        errorArea.classList.add('hidden');

        if (textInputContainer) textInputContainer.classList.remove('hidden');
    }

    resetBtn.addEventListener('click', resetUI);
    errorResetBtn.addEventListener('click', resetUI);

    downloadBtn.addEventListener('click', () => {
        if (!convertedData) return;

        const dataStr = JSON.stringify(convertedData, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        let targetName = originalFileName.replace(/\.json$/i, '') + ' (ST).json';

        a.href = url;
        a.download = targetName;
        document.body.appendChild(a);
        a.click();

        setTimeout(() => {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 100);
    });
});

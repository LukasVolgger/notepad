'use strict';

// Declare global variables
let notesTitles = [];
let notesTexts = [];
let notesColors = [];
let notesTextColors = [];

let trashNotesTitles = [];
let trashNotesTexts = [];
let trashNotesColors = [];
let trashNotesTextColors = [];

let darkmode;
let onIndex = true;

loadFromLocalStorage();

// Render function to display content on main page
function render() {
    onIndex = true;

    //Clear content
    let content = document.getElementById('content');
    content.innerHTML = '';
    content.innerHTML += generateStaticHTML();

    // Check input fields
    if (notesTitles < 1) {
        generateEmptyIndex();
    } else {
        generateNotes();
    }

    applyColorTheme();
}

// Render function to display content on trash page
function renderTrash() {
    onIndex = false;

    // Clear content
    let content = document.getElementById('content');
    content.innerHTML = '';
    content.innerHTML += generateStaticHTMLTrash();

    // Check if there are any deleted notes
    if (trashNotesTitles < 1) {
        generateEmptyTrash();
    } else {
        generateTrashNotes();
    }

    applyColorTheme();
}

// Only called by onclick from toggle switch
function changeColorTheme() {
    // Negate bool by every onclick
    darkmode = !darkmode;
    saveToLocalStorage();
    applyColorTheme();
}

function applyColorTheme() {
    if (darkmode === true) {
        applyDarkmode();
    } else {
        disuseDarkmode();
    }
    // Old function to change elemts in darkmode
    // ##########################################
    // document.getElementById('body').classList.toggle("body-darkmode");
    // document.getElementById('search-bar-container').classList.toggle('search-bar-darkmode');
    // document.getElementById('search-bar').classList.toggle('search-bar-darkmode');
    // document.getElementById('aside-element-1').classList.toggle('aside-element-darkmode');
    // document.getElementById('aside-element-2').classList.toggle('aside-element-darkmode');
    // document.getElementById('empty-text').classList.toggle('empty-text-darkmode');
    // document.getElementById('empty-img').classList.toggle('empty-img-darkmode');
}

function applyDarkmode() {
    let emptyText = document.getElementById('empty-text');
    let emptyImg = document.getElementById('empty-img');

    document.getElementById('color-checkbox').checked = true;
    document.getElementById('body').classList.add("body-darkmode");
    document.getElementById('header-title').classList.add('header-title-darkmode');
    document.getElementById('search-bar-container').classList.add('search-bar-darkmode');
    document.getElementById('search-bar').classList.add('search-bar-darkmode');
    document.getElementById('aside-element-1').classList.add('aside-element-darkmode');
    document.getElementById('aside-element-2').classList.add('aside-element-darkmode');
    // document.getElementsByClassName('icon-container').classList.add('icon-container-darkmode');
    document.querySelectorAll('.icon-container').forEach(item => {
        item.classList.add('icon-container-darkmode');
        item.classList.add('icon-container-darkmode:hover');
    });
    if (emptyText && emptyImg != 0) {
        emptyText.classList.add('empty-text-darkmode');
        emptyImg.classList.add('empty-img-darkmode');
    }
    if (notesTitles.length > 0 && onIndex === true) {
        for (let i = 0; i < notesTitles.length; i++) {
            document.getElementById(`note${i}`).classList.add('note-darkmode');
        }
    }
    if (trashNotesTitles.length > 0 && onIndex === false) {
        for (let i = 0; i < trashNotesTitles.length; i++) {
            document.getElementById(`note${i}`).classList.add('note-darkmode');
        }
    }
}

function disuseDarkmode() {
    let emptyText = document.getElementById('empty-text');
    let emptyImg = document.getElementById('empty-img');

    document.getElementById('color-checkbox').checked = false;
    document.getElementById('body').classList.remove("body-darkmode");
    document.getElementById('header-title').classList.remove('header-title-darkmode');
    document.getElementById('search-bar-container').classList.remove('search-bar-darkmode');
    document.getElementById('search-bar').classList.remove('search-bar-darkmode');
    document.getElementById('aside-element-1').classList.remove('aside-element-darkmode');
    document.getElementById('aside-element-2').classList.remove('aside-element-darkmode');
    // document.getElementsByClassName('icon-container').classList.remove('icon-container-darkmode');
    document.querySelectorAll('.icon-container').forEach(item => {
        item.classList.remove('icon-container-darkmode');
    });
    if (emptyText && emptyImg != 0) {
        emptyText.classList.remove('empty-text-darkmode');
        emptyImg.classList.remove('empty-img-darkmode');
    }
    if (notesTitles.length > 0 && onIndex === true) {
        for (let i = 0; i < notesTitles.length; i++) {
            document.getElementById(`note${i}`).classList.remove('note-darkmode');
        }
    }
    if (trashNotesTitles.length > 0 && onIndex === false) {
        for (let i = 0; i < trashNotesTitles.length; i++) {
            document.getElementById(`note${i}`).classList.remove('note-darkmode');
        }
    }
}

function addNote() {
    // Get user input
    let noteTitle = document.getElementById('note-title').value;
    let noteText = document.getElementById('note-text').value;
    let noteColor = document.getElementById('note-color').value;

    if (noteTitle && noteText != 0) {
        notesTitles.push(noteTitle);
        notesTexts.push(noteText);
        notesColors.push(noteColor);
        notesTextColors.push(pickTextColorBasedOnBgColor(noteColor));

        render();
        saveToLocalStorage();
    }
}

function clickColorInput() {
    document.getElementById('note-color').click()
}

function deleteNote(x) {
    // if (window.confirm('Möchten Sie diese Notiz wirklich in den Papierkorb verschieben?') === true) {
    trashNotesTitles.push(notesTitles[x]);
    trashNotesTexts.push(notesTexts[x]);
    trashNotesColors.push(notesColors[x]);
    trashNotesTextColors.push(notesTextColors[x]);

    notesTitles.splice(x, 1);
    notesTexts.splice(x, 1);
    notesColors.splice(x, 1);
    notesTextColors.splice(x, 1);

    render();
    saveToLocalStorage();
}

function deleteNoteFinal(x) {
    if (window.confirm('Möchten Sie diese Notiz endgültig löschen?') === true) {
        trashNotesTitles.splice(x, 1);
        trashNotesTexts.splice(x, 1);
        trashNotesColors.splice(x, 1);
        trashNotesTextColors.splice(x, 1);

        renderTrash();
        saveToLocalStorage();
    }
}

function restoreNote(x) {
    notesTitles.push(trashNotesTitles[x]);
    notesTexts.push(trashNotesTexts[x]);
    notesColors.push(trashNotesColors[x]);
    notesTextColors.push(trashNotesTextColors[x]);

    trashNotesTitles.splice(x, 1);
    trashNotesTexts.splice(x, 1);
    trashNotesColors.splice(x, 1);
    trashNotesTextColors.splice(x, 1);

    renderTrash();
    saveToLocalStorage();
}

function reset() {
    // To clear input fields
    document.getElementById('note-title').value = '';
    document.getElementById('note-text').value = '';
    document.getElementById('note-color').value = '#ffffff';
}

function saveToLocalStorage() {
    localStorage.setItem('darkmode', darkmode);

    // Notes
    let notesTitlesAsText = JSON.stringify(notesTitles);
    let notesTextsAsText = JSON.stringify(notesTexts);
    let notesColorsAsText = JSON.stringify(notesColors);
    let notesTextColorsAsText = JSON.stringify(notesTextColors);

    localStorage.setItem('notesTitle', notesTitlesAsText);
    localStorage.setItem('notesText', notesTextsAsText);
    localStorage.setItem('notesColor', notesColorsAsText);
    localStorage.setItem('notesTextColor', notesTextColorsAsText);

    // Trash
    let trashNotesTitlesAsText = JSON.stringify(trashNotesTitles);
    let trashNotesTextsAsText = JSON.stringify(trashNotesTexts);
    let trashNotesColorsAsText = JSON.stringify(trashNotesColors);
    let trashNotesTextColorsAsText = JSON.stringify(trashNotesTextColors);

    localStorage.setItem('trashNotesTitle', trashNotesTitlesAsText);
    localStorage.setItem('trashNotesText', trashNotesTextsAsText);
    localStorage.setItem('trashNotesColor', trashNotesColorsAsText);
    localStorage.setItem('trashNotesTextColor', trashNotesTextColorsAsText);
}

function loadFromLocalStorage() {
    let darkmodeText = localStorage.getItem('darkmode');
    darkmode = JSON.parse(darkmodeText);

    // Notes
    let notesTitlesAsText = localStorage.getItem('notesTitle');
    let notesTextsAsText = localStorage.getItem('notesText');
    let notesColorsAsText = localStorage.getItem('notesColor');
    let notesTextColorsAsText = localStorage.getItem('notesTextColor');

    notesTitles = JSON.parse(notesTitlesAsText) || [];
    notesTexts = JSON.parse(notesTextsAsText) || [];
    notesColors = JSON.parse(notesColorsAsText) || [];
    notesTextColors = JSON.parse(notesTextColorsAsText) || [];

    // Trash
    let trashNotesTitlesAsText = localStorage.getItem('trashNotesTitle');
    let trashNotesTextsAsText = localStorage.getItem('trashNotesText');
    let trashNotesColorsAsText = localStorage.getItem('trashNotesColor');
    let trashNotesTextColorsAsText = localStorage.getItem('trashNotesTextColor');

    trashNotesTitles = JSON.parse(trashNotesTitlesAsText) || [];
    trashNotesTexts = JSON.parse(trashNotesTextsAsText) || [];
    trashNotesColors = JSON.parse(trashNotesColorsAsText) || [];
    trashNotesTextColors = JSON.parse(trashNotesTextColorsAsText) || [];
}

function pickTextColorBasedOnBgColor(bgColor) {
    let color = (bgColor.charAt(0) === '#') ? bgColor.substring(1, 7) : bgColor;
    let r = parseInt(color.substring(0, 2), 16); // hexToR
    let g = parseInt(color.substring(2, 4), 16); // hexToG
    let b = parseInt(color.substring(4, 6), 16); // hexToB
    return (((r * 0.299) + (g * 0.587) + (b * 0.114)) > 186) ?
        '#000000' : '#FFFFFF';
}

function generateStaticHTML() {
    return `
    <header class="border-spacing">
        <a href="index.html" class="header-title" id="header-title">
            <img src="img/icons/note-svgrepo-com.svg" alt="note" class="note-img">
            <span>Notizen</span>
        </a>
        <div class="header-subcontainer">
            <div id="search-bar-container">
                <a href="#" class="search-bar-link"><img src="img/icons/search-svgrepo-com.svg" alt="search" id="search-icon" class="icons"></a>
                <input type="text" placeholder="Suchen" class="element-height" id="search-bar">
            </div>
            <div class="color-theme">
                <span class="color-theme-text">Design<br> Hell / Dunkel</span>
                <label class="switch">
                    <input type="checkbox" onclick="changeColorTheme()" id="color-checkbox">
                    <span class="slider round"></span>
                </label>
            </div>
        </div>
    </header>
    <main>
        <aside class="border-spacing">
            <a href="./index.html" class="aside-link">
                <div id="aside-element-1" class="aside-element element-height">
                    <img src="img/icons/light-bulb-svgrepo-com.svg" alt="lightbulb" class="icons">
                    <span class="icon-text-aside">Notizen</span>
                </div>
            </a>
            <a href="./trash.html" class="aside-link">
                <div id="aside-element-2" class="aside-element element-height">
                    <img src="img/icons/trash-svgrepo-com.svg" alt="trash" class="icons">
                    <span class="icon-text-aside">Papierkorb</span>
                </div>
            </a>
        </aside>
        <div class="notes-container">
            <div class="add-note-container">
                <form class="add-note" onsubmit="addNote()">
                    <h3>Notiz hinzufügen</h3>
                    <input required type="text=" name="title" placeholder="Titel" class="notes-input element-height" id="note-title" required>
                    <input required type="text" name="noteText" placeholder="Notiz schreiben..." class="notes-input element-height" id="note-text" required>
                    <div class="add-note-icons">
                        <button onclick="addNote()" type="submit" class="submit-btn"><img src="img/icons/check-svgrepo-com.svg" alt="add" class="icons"><span class="icon-text-note">Hinzufügen</span></button>
                        <a href="#" onclick="clickColorInput()"><input type="color" id="note-color" value="#ffffff" list="presetColors"><span class="icon-text-note">Farbe auswählen</span></a>
                        <a href="#" onclick="reset()"><img src="img/icons/reload-svgrepo-com.svg" alt="reset" class="icons"><span class="icon-text-note">Zurücksetzen</span></a>
                    </div>
                </form>
            </div>
            <div id="notes-section-container">
                <div id="notes-section">
                </div>
            </div>
        </div>
    </main>
    `;
}

function generateStaticHTMLTrash() {
    return `
    <header class="border-spacing">
        <a href="index.html" class="header-title" id="header-title">
            <img src="img/icons/note-svgrepo-com.svg" alt="note" class="note-img">
            <span>Notizen</span>
        </a>
        <div id="search-bar-container">
            <a href="#" class="search-bar-link"><img src="img/icons/search-svgrepo-com.svg" alt="search" id="search-icon" class="icons"></a>
            <input type="text" placeholder="Suchen" class="element-height" id="search-bar">
        </div>
        <div class="color-theme">
            <span class="color-theme-text">Design<br> Hell / Dunkel</span>
            <label class="switch">
                <input type="checkbox" onclick="changeColorTheme()" id="color-checkbox">
                <span class="slider round"></span>
            </label>
        </div>
    </header>
    <main>
        <aside class="border-spacing">
            <a href="./index.html" class="aside-link">
                <div id="aside-element-1" class="aside-element element-height">
                    <img src="img/icons/light-bulb-svgrepo-com.svg" alt="lightbulb" class="icons">
                    <span class="icon-text-aside">Notizen</span>
                </div>
            </a>
            <a href="./trash.html" class="aside-link">
                <div id="aside-element-2" class="aside-element element-height">
                    <img src="img/icons/trash-svgrepo-com.svg" alt="trash" class="icons">
                    <span class="icon-text-aside">Papierkorb</span>
                </div>
            </a>
         </aside>
        <div class="notes-container">
            <div id="notes-section-container">
                <div id="notes-section">
                </div>
            </div>
        </div>
    </main>
    `;
}

function generateEmptyIndex() {
    let notesSection = document.getElementById('notes-section');
    notesSection.innerHTML += `
        <div class="empty-container-index">
            <h1 id="empty-text">Ganz schön ausgestorben hier...</h1>
            <img src="img/icons/dinosaur-svgrepo-com.svg" alt="empty" class="empty-img-index" id="empty-img">
        </div>
        `;
    document.getElementById('notes-section-container').classList.add('notes-section-container');
}

function generateEmptyTrash() {
    let notesSection = document.getElementById('notes-section');
    notesSection.innerHTML += `
			<div class="empty-container-trash">
				<h1 id="empty-text">Ganz schön ausgestorben hier...</h1>
				<img src="img/icons/dinosaur-svgrepo-com.svg" alt="empty" class="empty-img-trash" id="empty-img">
			</div>
			`;
    document.getElementById('notes-section-container').classList.add('notes-section-container');
}

function generateNotes() {
    for (let i = 0; i < notesTitles.length; i++) {
        let notesSection = document.getElementById('notes-section');
        notesSection.innerHTML += `
        <div class="note" id="note${i}">
            <div class="note-header">
                <h3>${notesTitles[i]}</h3>
                <a href="#" onclick="deleteNote(${i})">
                    <div class="icon-container">
                        <img src="img/icons/delete-svgrepo-com.svg" alt="trash" class="icons note-icon">
                    </div>
                </a>
            </div>
            <span>${notesTexts[i]}</span>
        </div>
        `;
        document.getElementById(`note${i}`).style = `background-color: ${notesColors[i]}; color: ${notesTextColors[i]}`;
    }
}

function generateTrashNotes() {
    document.getElementById('notes-section-container').classList.remove('notes-section-container');
    for (let i = 0; i < trashNotesTitles.length; i++) {
        let notesSection = document.getElementById('notes-section');
        notesSection.innerHTML += `
			<div class="note" id="note${i}">
				<div class="note-header">
					<h3>${trashNotesTitles[i]}</h3>
					<div class="trash-note-icons">
						<a href="#" onclick="restoreNote(${i})">
                            <div class="icon-container">
                                <img src="img/icons/restore.svg" alt="restore" class="icons note-icon">
                            </div>
                        </a>
						<a href="#" onclick="deleteNoteFinal(${i})">
                            <div class="icon-container">
                                <img src="img/icons/delete-svgrepo-com.svg" alt="delete" class="icons note-icon">
                            </div>
                        </a>
					</div>
				</div>
				<span>${trashNotesTexts[i]}</span>
			</div>
			`;
        document.getElementById(`note${i}`).style = `background-color: ${trashNotesColors[i]}; color: ${trashNotesTextColors[i]}`;
    }
}
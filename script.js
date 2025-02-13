// script.js
class Dictionary {
    constructor() {
        this.words = JSON.parse(localStorage.getItem('words')) || [];
        this.currentSort = 'alpha';
        this.currentWordIndex = null;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadWords();
    }

    setupEventListeners() {
        // Gestione eventi mobile-friendly
        const addEvent = (element, events, handler) => {
            events.split(' ').forEach(event => {
                element.addEventListener(event, handler, false);
            });
        };

        addEvent(document.getElementById('dizionarioBtn'), 'click touchstart', () => 
            this.showSection('dizionario'));
        addEvent(document.getElementById('tokenBtn'), 'click touchstart', () => 
            this.showSection('token'));

        document.getElementById('wordForm').addEventListener('submit', (e) => this.handleSubmit(e));
        document.getElementById('cancelBtn').addEventListener('click', () => this.cancelEdit());
        document.querySelector('.alert-close').addEventListener('click', () => this.hideAlert());
    }

    showSection(sectionId) {
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.getElementById(sectionId).classList.add('active');
        document.getElementById(`${sectionId}Btn`).classList.add('active');

        if (sectionId === 'token') {
            this.clearForm();
        }
    }

    clearForm() {
        document.getElementById('wordForm').reset();
        this.currentWordIndex = null;
        document.getElementById('saveWordBtn').classList.remove('hidden');
        document.getElementById('updateWordBtn').classList.add('hidden');
        document.getElementById('deleteWordBtn').classList.add('hidden');
        this.hideAlert();
    }

    // Aggiungere qui gli altri metodi necessari (loadWords, handleSubmit, ecc.)

    showAlert(message, type = 'success') {
        const alert = document.getElementById('alert');
        alert.className = `alert ${type}`;
        alert.querySelector('.alert-message').textContent = message;
        alert.classList.remove('hidden');
        setTimeout(() => this.hideAlert(), 3000);
    }

    hideAlert() {
        document.getElementById('alert').classList.add('hidden');
    }
}

// Inizializzazione
const dict = new Dictionary();

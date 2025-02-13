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
        this.setupSorting();
        this.setupSearch();
    }

    setupEventListeners() {
        document.getElementById('dizionarioBtn').addEventListener('click', () => this.showSection('dizionario'));
        document.getElementById('tokenBtn').addEventListener('click', () => this.showSection('token'));
        document.getElementById('wordForm').addEventListener('submit', (e) => this.handleSubmit(e));
        document.getElementById('cancelBtn').addEventListener('click', () => this.cancelEdit());
        document.querySelector('.alert-close').addEventListener('click', () => this.hideAlert());
    }

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

    loadWords() {
        const wordsList = document.getElementById('words');
        const emptyState = document.getElementById('emptyState');
        wordsList.innerHTML = '';

        if (this.words.length === 0) {
            emptyState.classList.remove('hidden');
            return;
        }
        emptyState.classList.add('hidden');

        this.sortWords();
        
        this.words.forEach((word, index) => {
            const li = this.createWordElement(word, index);
            wordsList.appendChild(li);
        });
    }

    createWordElement(word, index) {
        const li = document.createElement('li');
        li.className = 'word-item';
        li.innerHTML = `
            <div class="word-content">
                <h3 class="word-title">${word.word}</h3>
                <p class="word-description">${word.description}</p>
                <div class="word-meta">
                    <time>${new Date(word.date).toLocaleDateString()}</time>
                </div>
            </div>
            <div class="word-actions">
                <button class="btn icon" onclick="dict.editWord(${index})" aria-label="Modifica">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn icon danger" onclick="dict.deleteWord(${index})" aria-label="Elimina">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        return li;
    }

    // Metodi rimanenti per gestire ordinamento, ricerca, CRUD...
}

const dict = new Dictionary();

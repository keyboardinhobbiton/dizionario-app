let wordsList = JSON.parse(localStorage.getItem('words')) || [];
let currentWordIndex = null; // Per sapere quale parola stiamo modificando

// Gestisce la visualizzazione della sezione Dizionario
document.getElementById('dizionarioBtn').addEventListener('click', function() {
    document.getElementById('dizionario').style.display = 'block';
    document.getElementById('token').style.display = 'none';
    loadWords();  // Ricarica le parole quando si accede alla sezione Dizionario
});

// Gestisce la visualizzazione della sezione Token (Aggiungi, Modifica, Elimina)
document.getElementById('tokenBtn').addEventListener('click', function() {
    document.getElementById('token').style.display = 'block';
    document.getElementById('dizionario').style.display = 'none';
    clearForm();  // Pulisce il modulo per aggiungere una nuova parola
});

// Carica e visualizza le parole in ordine alfabetico
function loadWords() {
    const wordList = document.getElementById('words');
    wordList.innerHTML = '';
    wordsList.sort((a, b) => a.word.localeCompare(b.word));  // Ordina alfabeticamente
    wordsList.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${item.word}</strong>: ${item.description} <button onclick="editWord(${index})">Modifica</button> <button onclick="deleteWord(${index})">Elimina</button>`;
        wordList.appendChild(li);
    });
}

// Aggiungi o modifica una parola
document.getElementById('saveWordBtn').addEventListener('click', function() {
    const word = document.getElementById('wordInput').value;
    const description = document.getElementById('descInput').value;
    
    if (word && description) {
        if (currentWordIndex !== null) {
            // Se stiamo modificando una parola
            wordsList[currentWordIndex] = { word, description };
            document.getElementById('saveWordBtn').style.display = 'inline';
            document.getElementById('updateWordBtn').style.display = 'none';
            currentWordIndex = null;
        } else {
            // Se stiamo aggiungendo una nuova parola
            wordsList.push({ word, description });
        }

        localStorage.setItem('words', JSON.stringify(wordsList));
        loadWords(); // Ricarica le parole dopo aver aggiunto o modificato
        clearForm();  // Pulisce il modulo
    }
});

// Modifica una parola
function editWord(index) {
    const word = wordsList[index];
    document.getElementById('wordInput').value = word.word;
    document.getElementById('descInput').value = word.description;
    currentWordIndex = index;
    document.getElementById('saveWordBtn').style.display = 'none';
    document.getElementById('updateWordBtn').style.display = 'inline';
    document.getElementById('deleteWordBtn').style.display = 'inline';
}

// Elimina una parola
function deleteWord(index) {
    wordsList.splice(index, 1);
    localStorage.setItem('words', JSON.stringify(wordsList));
    loadWords(); // Ricarica le parole dopo la rimozione
}

// Pulisce il modulo di inserimento
function clearForm() {
    document.getElementById('wordInput').value = '';
    document.getElementById('descInput').value = '';
    document.getElementById('saveWordBtn').style.display = 'inline';
    document.getElementById('updateWordBtn').style.display = 'none';
    document.getElementById('deleteWordBtn').style.display = 'none';
}

// Carica la lista quando la pagina è pronta
document.addEventListener('DOMContentLoaded', loadWords);

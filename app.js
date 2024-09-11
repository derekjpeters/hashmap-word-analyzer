// app.js

document.getElementById('analyzeBtn').addEventListener('click', analyzeWords);

function analyzeWords() {
  const input = document.getElementById('wordInput').value;
  const wordList = input.split(',').map(word => word.trim());
  
  // Analyze words
  const letterCounts = countLetterOccurrences(wordList);
  const groupedAnagrams = groupAnagrams(wordList);
  
  // Display results
  displayResults(wordList, letterCounts, groupedAnagrams);
}

// Function to count occurrences of letters in each word
function countLetterOccurrences(words) {
  const counts = new Map();

  words.forEach(word => {
    const letterMap = new Map();
    
    for (let char of word) {
      letterMap.set(char, (letterMap.get(char) || 0) + 1);
    }
    
    counts.set(word, letterMap);
  });

  return counts;
}

// Function to group words by their anagrams
function groupAnagrams(words) {
  const anagramMap = new Map();

  words.forEach(word => {
    const sortedWord = word.split('').sort().join('');
    
    if (!anagramMap.has(sortedWord)) {
      anagramMap.set(sortedWord, []);
    }
    
    anagramMap.get(sortedWord).push(word);
  });

  return Array.from(anagramMap.values());
}

// Function to highlight duplicate letters
function highlightDuplicates(word, letterCountMap) {
  return word.split('').map(letter => {
    if (letterCountMap.get(letter) > 1) {
      return `<span class="highlight">${letter}</span>`;
    } else {
      return letter;
    }
  }).join('');
}

// Function to display the results
function displayResults(wordList, letterCounts, groupedAnagrams) {
  const resultContainer = document.getElementById('results');
  resultContainer.innerHTML = '';  // Clear previous results

  // Display letter count and highlight duplicates
  wordList.forEach(word => {
    const wordCard = document.createElement('div');
    wordCard.className = 'result-card';

    const highlightedWord = highlightDuplicates(word, letterCounts.get(word));
    wordCard.innerHTML = `
      <h3>${highlightedWord}</h3>
      <p>Letter Counts: ${JSON.stringify(Object.fromEntries(letterCounts.get(word)))}</p>
    `;

    resultContainer.appendChild(wordCard);
  });

  // Display grouped anagrams
  const anagramCard = document.createElement('div');
  anagramCard.className = 'result-card';

  anagramCard.innerHTML = `
    <h3>Grouped Anagrams</h3>
    <p>${JSON.stringify(groupedAnagrams)}</p>
  `;

  resultContainer.appendChild(anagramCard);
}

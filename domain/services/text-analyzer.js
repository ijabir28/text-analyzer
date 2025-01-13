function countOfWords(text) {
    if (text.trim() === "") {
        return 0;
    }

    return text.trim().split(/\s+/).length;
}

function countOfCharacters(text) {
    if(text.trim() === "") {
        return 0;
    }

    return text.trim().length;
}

function countOfSentences(text) {
    if(text.trim() === "") {
        return 0;
    }

    return text.trim().split(/[.!?]/).length - 1;
}

function countOfParagraphs(text) {
    if(text.trim() === "") {
        return 0;
    }

    return text.trim().split(/\n+/).length;
}

function longestWord(text) {
    const paragraphs = text.trim().split(/\n+/);
    const words = paragraphs[0].trim().replace(/[.,!?;:]/g, '').split(/\s+/); // Considering the first paragraph only and removing punctuation
    let longestWord = '';

    for (const word of words) {
        if (word.length > longestWord.length) {
            longestWord = word;
        }
    }

    return longestWord; //returning the first longest word in the first paragraph
}

module.exports = { countOfWords, countOfCharacters, countOfSentences, countOfParagraphs, longestWord };
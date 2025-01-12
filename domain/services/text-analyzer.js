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

module.exports = { countOfWords, countOfCharacters, countOfSentences, countOfParagraphs };
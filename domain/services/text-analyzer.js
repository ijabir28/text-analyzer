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

module.exports = { countOfWords, countOfCharacters };
function countOfWords(text) {
    if (text.trim() === "") {
        return 0;
    }

    return text.trim().split(/\s+/).length;
}

module.exports = { countOfWords };
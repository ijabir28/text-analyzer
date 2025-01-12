const express = require('express');

const { countOfWords, countOfCharacters, countOfSentences, countOfParagraphs } = require('../domain/services/text-analyzer');

function createApi(dependencies = {}) {
    const api = express();

    api.post('/number-of-words', (req, res) => {
        const { text } = req.body;

        const result = countOfWords(text);
        res.json({ result });
    });

    api.post('/number-of-characters', (req, res) => {
        const { text } = req.body;

        const result = countOfCharacters(text);
        res.json({ result });
    });

    api.post('/number-of-sentences', (req, res) => {
        const { text } = req.body;

        const result = countOfSentences(text);
        res.json({ result });
    });

    api.post('/number-of-paragraphs', (req, res) => {
        const { text } = req.body;

        const result = countOfParagraphs(text);
        res.json({ result });
    });

    return api;
}

module.exports = { createApi };


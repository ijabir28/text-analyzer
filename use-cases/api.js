const express = require('express');

const { countOfWords, countOfCharacters, countOfSentences, countOfParagraphs, longestWord } = require('../domain/services/text-analyzer');

const { createAuthService } = require('./auth');

function createApi(dependencies = {}) {
    const { DBService } = dependencies;
    const authService = createAuthService({ DBService });

    const api = express();

    api.use(express.json());

    api.post('/login', async (req, res) => {
        const { email, password } = req.body;

        const userToken = await authService.login(email, password);
        res.json({ userToken });

    });

    api.post('/number-of-words', (req, res) => {
        const { text } = req.body;

        const result = countOfWords(text);
        res.json({ numberOfWords: result });
    });

    api.post('/number-of-characters', (req, res) => {
        const { text } = req.body;

        const result = countOfCharacters(text);
        res.json({ numberOfCharacters: result });
    });

    api.post('/number-of-sentences', (req, res) => {
        const { text } = req.body;

        const result = countOfSentences(text);
        res.json({ numberOfSentences: result });
    });

    api.post('/number-of-paragraphs', (req, res) => {
        const { text } = req.body;

        const result = countOfParagraphs(text);
        res.json({ numberOfParagraphs: result });
    });

    api.post('/longest-word', (req, res) => {
        const { text } = req.body;

        const result = longestWord(text);
        res.json({ longestWord: result });
    });

    return api;
}

module.exports = { createApi };


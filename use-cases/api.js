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

        const { error, userToken } = await authService.login(email, password);

        if (error) {
            return res.status(400).json({ error });
        }

        res.json({ userToken });

    });

    api.post('/number-of-words', authService.authenticate, (req, res) => {
        const { text } = req.body;

        const numberOfWords = countOfWords(text);
        res.json({ numberOfWords });
    });

    api.post('/number-of-characters', authService.authenticate, (req, res) => {
        const { text } = req.body;

        const numberOfCharacters = countOfCharacters(text);
        res.json({ numberOfCharacters });
    });

    api.post('/number-of-sentences', authService.authenticate, (req, res) => {
        const { text } = req.body;

        const numberOfSentences = countOfSentences(text);
        res.json({ numberOfSentences });
    });

    api.post('/number-of-paragraphs', authService.authenticate, (req, res) => {
        const { text } = req.body;

        const numberOfParagraphs = countOfParagraphs(text);
        res.json({ numberOfParagraphs });
    });

    api.post('/longest-word', authService.authenticate, (req, res) => {
        const { text } = req.body;

        const longestWord = longestWord(text);
        res.json({ longestWord });
    });

    return api;
}

module.exports = { createApi };


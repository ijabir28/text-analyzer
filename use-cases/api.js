const express = require('express');

const { countOfWords, countOfCharacters, countOfSentences, countOfParagraphs, longestWord } = require('../domain/services/text-analyzer');

const { createAuthService } = require('./auth');

function createApi(dependencies = {}) {
    const { DBService, logger } = dependencies;
    const authService = createAuthService({ DBService });

    const api = express();

    api.use(express.json());

    api.post('/login', async (req, res) => {
        logger.info('Logging in');
        const { email, password } = req.body;

        const { error, userToken } = await authService.login(email, password);

        if (error) {
            logger.error(`Error while logging in: ${error.message}`);
            return res.status(400).json({ error });
        }

        res.json({ userToken });

    });

    api.post('/number-of-words', authService.authenticate, (req, res) => {
        logger.info('Counting number of words');
        const { text } = req.body;

        const numberOfWords = countOfWords(text);
        res.json({ numberOfWords });
    });

    api.post('/number-of-characters', authService.authenticate, (req, res) => {
        logger.info('Counting number of characters');
        const { text } = req.body;

        const numberOfCharacters = countOfCharacters(text);
        res.json({ numberOfCharacters });
    });

    api.post('/number-of-sentences', authService.authenticate, (req, res) => {
        logger.info('Counting number of sentences');
        const { text } = req.body;

        const numberOfSentences = countOfSentences(text);
        res.json({ numberOfSentences });
    });

    api.post('/number-of-paragraphs', authService.authenticate, (req, res) => {
        logger.info('Counting number of paragraphs');
        const { text } = req.body;

        const numberOfParagraphs = countOfParagraphs(text);
        res.json({ numberOfParagraphs });
    });

    api.post('/longest-word', authService.authenticate, (req, res) => {
        logger.info('Finding longest word');
        const { text } = req.body;

        const longestWord = longestWord(text);
        res.json({ longestWord });
    });

    api.post('/store-text', authService.authenticate, async (req, res) => {
        logger.info('Storing text...');
        const { text } = req.body;

        const { textId, error } = await DBService.storeText(req.user._id, text);

        if (error) {
            logger.error(`Error while storing text: ${error.message}`);
            return res.status(400).json({ error });
        }

        res.json({ textId });
    });

    api.get('/get-texts', authService.authenticate, async (req, res) => {
        logger.info('Getting texts...');

        const texts = await DBService.getTextByUserId(req.user._id);

        res.json({ texts });

    });

    api.get('/get-text-by-id/:textId', authService.authenticate, async (req, res) => {
        logger.info('Getting text by id...');

        const textId = req.params.textId;

        const { text, error } = await DBService.getTextById(req.user._id, textId);

        if (error) {
            logger.error(`Error while getting text by id: ${error.message}`);
            return res.status(404).json({ error });
        }

        res.json({ text });
    });

    return api;
}

module.exports = { createApi };


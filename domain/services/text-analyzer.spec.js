const { countOfWords, countOfCharacters, countOfSentences, countOfParagraphs, longestWord } = require("./text-analyzer");

describe("countOfWords", () => {
    it("should return 0 for an empty string", () => {
        const result = countOfWords("");
        expect(result).toBe(0);
    });

    it("should return 1 for a single word", () => {
        const result = countOfWords("hello");
        expect(result).toBe(1);
    });

    it("should return correct count of words", () => {
        const result = countOfWords("The quick brown fox jumps over the lazy dog. The lazy dog slept in the sun.");
        expect(result).toBe(16);
    });
});

describe("countOfCharacters", () => {
    it("should return 0 for an empty string", () => {
        const result = countOfCharacters("");
        expect(result).toBe(0);
    });

    it("should return 1 for a single character", () => {
        const result = countOfCharacters("T");
        expect(result).toBe(1);
    });

    it("should return correct count of characters", () => {
        const result = countOfCharacters("The quick brown fox jumps over the lazy dog. The lazy dog slept in the sun.");
        expect(result).toBe(75);
    });
});

describe("countOfSentences", () => {
    it("should return 0 for an empty string", () => {
        const result = countOfSentences("");
        expect(result).toBe(0);
    });

    it("should return 1 for a single sentence", () => {
        const result = countOfSentences("The quick brown fox jumps over the lazy dog.");
        expect(result).toBe(1);
    });

    it("should return correct count of sentences", () => {
        const result = countOfSentences("The quick brown fox jumps over the lazy dog. The lazy dog slept in the sun.");
        expect(result).toBe(2);
    });
});

describe("countOfParagraphs,", () => {
    it("should return 0 for an empty string", () => {
        const result = countOfParagraphs("");
        expect(result).toBe(0);
    });

    it("should return 1 for a single paragraph", () => {
        const result = countOfParagraphs("The quick brown fox jumps over the lazy dog.");
        expect(result).toBe(1);
    });

    it("should return correct count of paragraphs", () => {
        const result = countOfParagraphs("The quick brown fox jumps over the lazy dog.\nThe lazy dog slept in the sun.");
        expect(result).toBe(2);
    });
});

describe("longestWord", () => {
    it("should return empty string for an empty string", () => {
        const result = longestWord("");
        expect(result).toBe("");
    });

    it("should return the only word for a single word", () => {
        const result = longestWord("hello");
        expect(result).toBe("hello");
    });

    it("should return the longest word", () => {
        const result = longestWord("The quick brown fox jumps over the lazy dog. The lazy dog slept in the sun.");
        expect(result).toBe("quick");
    });
});
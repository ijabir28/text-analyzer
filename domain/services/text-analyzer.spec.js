const { countOfWords } = require("./text-analyzer");

describe("countOfWords", () => {
    it("should return 0 for an empty string", () => {
        const result = countOfWords("");
        expect(result).toBe(0);
    });
    
    it("should return 1 for a single word", () => {
        const result = countOfWords("hello");
        expect(result).toBe(1);
    });
});
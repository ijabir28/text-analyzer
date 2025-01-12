const { countOfWords } = require("./text-analyzer");

describe("countOfWords", () => {
    it("should return 0 for an empty string", () => {
        const result = countOfWords("");
        expect(result).toBe(0);
    });
});
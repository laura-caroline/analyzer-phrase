import { analyzePhrase } from '../analyzer';


describe('analyzePhrase', () => {
  it('should return Aves = 1 for "Eu amo papagaios" at depth 2', () => {
    const results = analyzePhrase("Eu amo papagaios", 2);
    expect(results).toEqual({ Aves: 1 });
  });

  it('should return Pássaros = 1, Primatas = 1 for "Eu vi gorilas e papagaios" at depth 3', () => {
    const results = analyzePhrase("Eu vi gorilas e papagaios", 3);
    console.log(results)
    expect(results).toEqual({ Pássaros: 1, Primatas: 1 });
  });

  it('should return empty results for a phrase with no matches', () => {
    const results = analyzePhrase("Eu gosto de carros", 3);
    expect(results).toEqual({});
  });

  it('should handle multiple occurrences of the same word correctly', () => {
    const results = analyzePhrase("Eu amo papagaios, papagaios e mais papagaios", 2);
    expect(results).toEqual({ Aves: 1 });
  });

  it('should handle an empty phrase', () => {
    const results = analyzePhrase("", 2);
    expect(results).toEqual({});
  });

  describe('analyzePhrase with more 5000 characters', () => {
    it('should handle a large input text correctly', () => {
      // Construct a long phrase with repetitions to reach around 5000 characters
      const longPhrase = Array(250).fill(
        "Eu vi gorilas, papagaios, leões, tigres, jaguars, cavalos, zebras, asnos, bois, búfalos, antílopes, cabras, chimpanzés, orangotangos, águias, falcões, corujas, milhafres, canários, papagaios, pardais, rouxinóis."
      ).join(" ");      
      const results = analyzePhrase(longPhrase, 3);
      expect(results).toEqual({
        "Bovídeos": 4,
        "Carnívoros": 3,
        "Herbívoros": 3,
        "Primatas": 3,
        "Pássaros": 4,
        "Rapinas": 4,
      });
    });
  });
  
});

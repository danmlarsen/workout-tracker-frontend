import {
  calculateOneRepMax,
  formatCompactNumber,
  formatNumber,
  parseWorkoutTitle,
} from "./utils";

describe("utilts", () => {
  describe("formatNumber()", () => {
    it("should be defined", () => {
      expect(formatNumber).toBeDefined();
    });

    it("should format number correctly", () => {
      expect(formatNumber(1234567)).toBe("1,234,567");
      expect(formatNumber(1234567, { compact: true })).toBe("1.2M");
      expect(formatNumber(1234.567, { maximumFractionDigits: 2 })).toBe(
        "1,234.57",
      );
      expect(
        formatNumber(1234567, { compact: true, maximumFractionDigits: 0 }),
      ).toBe("1M");
    });
  });

  describe("formatCompactNumber()", () => {
    it("should format compact number correctly", () => {
      expect(formatCompactNumber(1234567)).toBe("1.2M");
    });
  });

  describe("calculateOneRepMax()", () => {
    it("should calculate 1RM correctly", () => {
      expect(calculateOneRepMax(10, 1)).toBe(10);
      expect(calculateOneRepMax(100, 3)).toBeCloseTo(110);
    });
  });

  describe("parseWorkoutTitle()", () => {
    let workout: { title: string | undefined; startedAt: string };
    beforeEach(() => {
      workout = {
        title: undefined,
        startedAt: new Date().toISOString(),
      };
    });

    it("should return a date if no title is provided", () => {
      const titleWithDateRegEx = /[A-Za-z]{3} \d{1,2} Workout/;

      expect(parseWorkoutTitle(workout)).toMatch(titleWithDateRegEx);
    });

    it("should return title if title is provided", () => {
      workout.title = "Title";

      expect(parseWorkoutTitle(workout)).toBe(workout.title);
    });
  });
});

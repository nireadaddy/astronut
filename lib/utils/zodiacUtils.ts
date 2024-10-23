export const zodiacSigns = {
  aries: 'ราศีเมษ',
  taurus: 'ราศีพฤษภ',
  gemini: 'ราศีเมถุน',
  cancer: 'ราศีกรกฎ',
  leo: 'ราศีสิงห์',
  virgo: 'ราศีกันย์',
  libra: 'ราศีตุลย์',
  scorpio: 'ราศีพิจิก',
  sagittarius: 'ราศีธนู',
  capricorn: 'ราศีมังกร',
  aquarius: 'ราศีกุมภ์',
  pisces: 'ราศีมีน',
};

export function getZodiacSign(month: number, day: number): string {
  // Simple zodiac calculation
  const dates = [20, 19, 21, 20, 21, 21, 23, 23, 23, 23, 22, 22];
  const signs = Object.values(zodiacSigns);
  const monthIndex = month - 1;
  return day <= dates[monthIndex]
    ? signs[monthIndex]
    : signs[(monthIndex + 1) % 12];
}

export function getElementFromZodiac(zodiacSign: string): string {
  const elements = {
    fire: ['ราศีเมษ', 'ราศีสิงห์', 'ราศีธนู'],
    earth: ['ราศีพฤษภ', 'ราศีกันย์', 'ราศีมังกร'],
    air: ['ราศีเมถุน', 'ราศีตุลย์', 'ราศีกุมภ์'],
    water: ['ราศีกรกฎ', 'ราศีพิจิก', 'ราศีมีน'],
  };

  for (const [element, signs] of Object.entries(elements)) {
    if (signs.includes(zodiacSign)) {
      return element;
    }
  }
  return '';
}

export function getCompatibleSigns(zodiacSign: string): string[] {
  const compatibility = {
    ราศีเมษ: ['ราศีสิงห์', 'ราศีธนู'],
    ราศีพฤษภ: ['ราศีกันย์', 'ราศีมังกร'],
    // Add more compatibility mappings
  };
  return compatibility[zodiacSign as keyof typeof compatibility] || [];
}

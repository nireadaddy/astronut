interface Score {
  value: number; // 0-100
  label: string;
  description: string;
}

interface FortuneDate {
  date: string;
  description: string;
  score: number;
}

interface MonthlyFortune {
  month: string;
  score: Score;
  goodDays: FortuneDate[];
  badDays: FortuneDate[];
  recommendations: string;
}

interface Reading {
  overall: string;
  powerScore: Score;
  aspects: {
    career: string;
    love: string;
    finance: string;
    health: string;
  };
  fortuneDates: {
    best: FortuneDate[];
    worst: FortuneDate[];
  };
  monthlyFortune: MonthlyFortune[];
  predictions: string;
}

export interface Reading {
  powerScore: number;
  overall: string;
  aspects: {
    career: AspectDetail;
    love: AspectDetail;
    finance: AspectDetail;
    health: AspectDetail;
  };
  predictions: string;
  dateRanges: DateRangePredictions;
}

export interface AspectDetail {
  score: number;
  text: string;
  trend?: 'up' | 'stable' | 'down';
}

export interface DateRangePrediction {
  startDate: string;
  endDate: string;
  aspects: {
    career: AspectDetail;
    love: AspectDetail;
    finance: AspectDetail;
    health: AspectDetail;
  };
  description: string;
}

export interface DateRangePredictions {
  week: DateRangePrediction;
  month: DateRangePrediction;
  threeMonths: DateRangePrediction;
  sixMonths: DateRangePrediction;
}

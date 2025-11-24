export interface AnalyticsResponse {
  totalQuestions: number;
  totalAnsweredQuestions: number;
  ageRangeCounts: AgeRangeCount[];
}

export interface AgeRangeCount {
  range: string;
  count: number;
}
export interface EmissionRecord {
  id: number;
  category: string;
  scope: string;
  activity_value: number;
  unit: string;
  status: string;
  is_suspicious: boolean;
  record_date: string;
}
export interface IOrderBy {
  field: string;
  dir: number;
}

export interface Issue {
  id: string;
  name: string;
  type: string;
  status: 'OPEN' | 'CLOSE';
  description: string;
}

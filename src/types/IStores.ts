export interface IStore {
  id: number;
  name: string;
  city: string;
  state: string;
  [key: string]: string | number;
}

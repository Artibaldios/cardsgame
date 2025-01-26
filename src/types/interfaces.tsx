export interface iCard {
  id: number,
  content: string,
  highlighted: boolean,
  highlightColor: string,
  status: string,
  color: string,
  row: number,
  col: number,
  live: boolean,
  name: string,
  imageSrc: string
}
export interface Position {
  row: number;
  col: number;
}
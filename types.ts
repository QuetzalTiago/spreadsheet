export type CellType = {
  x?: string;
  y?: number;
  value?: string;
  disabled?: boolean;
  updateParent?: Function;
  cells?: Array<CellType>;
};

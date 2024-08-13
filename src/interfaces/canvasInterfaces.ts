interface Shape {
  id: string;
  name: string;
  isDragging: boolean;
}

interface LineType {
  tool: string;
  points: number[];
  chosenColor: string;
}

interface CurveType {
  start: { x: number; y: number };
  end: { x: number; y: number };
}

interface StateType {
  chosenColor: string;
  tool: string;
  lines: LineType[];
  shapes: Shape[];
  text: string;
  isEditing: boolean;
  fontFamily: string;
  curves: CurveType[];
  currentCurve: CurveType | null;
  images: File[];
  selectedId: string | null;
}

export type { CurveType, LineType, Shape, StateType };

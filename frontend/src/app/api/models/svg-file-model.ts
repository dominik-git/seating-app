export interface SvgFileModelResponse {
  id: string;
  name: string;
  svgFile: string;
}

export interface SvgFileModel {
  id: number;
  svgFile: string | null;
}

export interface SvgFileSelectorModel {
  id: number;
  name: string | null;
}

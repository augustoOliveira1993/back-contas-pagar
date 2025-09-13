export interface IModelPopulated {
  path: string;
  select?: string;
  match?: any;
  populate?: IModelPopulated[];
  options?: any;
}

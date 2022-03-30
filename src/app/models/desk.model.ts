import {ChairTypeEnum} from "../enums/chairType.enum";

export interface DeskModel {
  seatId: number;
  fullName: string;
  state: ChairTypeEnum;

}

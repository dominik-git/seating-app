import { ChairTypeEnum } from '../enums/chairType.enum';

export interface PlaceModel {
  placeId: string;
  state?: ChairTypeEnum;
  type?: number;
  fullName: string;
  position: string;
  userId?: number;
}

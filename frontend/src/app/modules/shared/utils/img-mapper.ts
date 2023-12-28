import { StateEnum } from '../../../enums/state.enum';

export const svgMapper = new Map<StateEnum, string>([
  [StateEnum.floor5, 'assets/places/5th-floor.svg'],
  [StateEnum.floor7, 'assets/places/7th-floor.svg'],
  [StateEnum.parking, 'assets/places/car_place.svg'],
]);

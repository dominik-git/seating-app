import {ChairTypeEnum} from "../enums/chairType.enum";

export  interface BookDeskDay {
  deskId: string;
  day: Date;
}

export  interface BookParkingPlaceDay {
  parkId: string;
  day: Date;
}

export  interface SeatsInRange {
  date: Date;
  name?: string;
  state?: ChairTypeEnum
}

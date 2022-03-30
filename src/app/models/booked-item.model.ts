import {BookedItemEnum} from "../enums/booked-item.enum";

export  class BookedItemModel {
  date: Date;
  bookedItem: BookedItemEnum;
  carPlaceId?: string;
  deskId?: string;
}


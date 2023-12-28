export function generateDeskData(min: number, max: number) {
  let array = [];
  for (let x = min; x <= max; x++) {
    let obj = {
      seatId: 'Desk_' + x,
      state: randomIntFromInterval(0, 1),
      type: randomIntFromInterval(0, 1),
      fullName: 'John doe' + x,
      position: 'software engineer',
    };
    array.push(obj);
  }
  return array;
}

export function generateFixedDesk(min: number, max: number) {
  let array = [];
  for (let x = min; x <= max; x++) {
    let obj = {
      placeId: 'Desk_' + x,
      state: 0,
      type: randomIntFromInterval(0, 1),
      fullName: 'John doe' + x,
      position: 'software engineer',
      userId: x,
    };
    array.push(obj);
  }
  return array;
}

export function getParkingData() {
  let array = [
    {
      placeId: 'P100',
      fullName: 'Anton Cornak',
      position: 'software engineer',
      userId: 1,
    },
    {
      placeId: 'P227',
      fullName: 'Roman Klimcik',
      position: 'software engineer',
      userId: 1,
    },
    {
      placeId: 'P228',
      fullName: 'Emilia',
      position: 'software engineer',
      userId: 1,
    },
    {
      placeId: 'P229',
      fullName: 'Michal Lukac',
      position: 'software engineer',
      userId: 1,
    },
    {
      placeId: 'P230',
      fullName: 'Matus Maxim',
      position: 'software engineer',
      userId: 1,
    },
    {
      placeId: 'P235',
      fullName: 'Jan Macura',
      position: 'software engineer',
      userId: 1,
    },
    {
      placeId: 'P244',
      fullName: 'Marek Cigas',
      position: 'software engineer',
      userId: 1,
    },
    {
      placeId: 'P307',
      fullName: 'Vratislav Fabian',
      position: 'software engineer',
      userId: 1,
    },
  ];
  return array;
}

export function randomIntFromInterval(min: number, max: number) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min).toString();
}

export function getParkingData2(min: number, max: number) {
  let array = [];
  for (let x = min; x <= max; x++) {
    let obj;
    if (x <= 9) {
      obj = {
        seatId: 'P0' + x,
        state: randomIntFromInterval(0, 1),
        type: randomIntFromInterval(0, 1),
        fullName: 'John doe' + x,
        position: 'software engineer',
      };
    } else {
      obj = {
        seatId: 'P' + x,
        state: randomIntFromInterval(0, 1),
        type: randomIntFromInterval(0, 1),
        fullName: 'John doe' + x,
        position: 'software engineer',
      };
    }

    array.push(obj);
  }

  array.push({
    seatId: 'P100',
    state: 1,
    type: 1,
    fullName: 'John doe',
    position: 'software engineer',
  });
  array.push({
    seatId: 'P227',
    state: 1,
    type: 1,
    fullName: 'John doe',
    position: 'software engineer',
  });
  array.push({
    seatId: 'P228',
    state: 1,
    type: 1,
    fullName: 'John doe',
    position: 'software engineer',
  });
  array.push({
    seatId: 'P229',
    state: 1,
    type: 1,
    fullName: 'John doe',
    position: 'software engineer',
  });
  array.push({
    seatId: 'P230',
    state: 1,
    type: 1,
    fullName: 'John doe',
    position: 'software engineer',
  });
  array.push({
    seatId: 'P235',
    state: 1,
    type: 1,
    fullName: 'John doe',
    position: 'software engineer',
  });
  array.push({
    seatId: 'P244',
    state: 1,
    type: 1,
    fullName: 'John doe',
    position: 'software engineer',
  });
  array.push({
    seatId: 'P307',
    state: 1,
    type: 1,
    fullName: 'John doe',
    position: 'software engineer',
  });

  return array;
}

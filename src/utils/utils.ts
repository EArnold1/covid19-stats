export const attribution =
  '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> -Arnold';

export const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

interface Circle {
  color: string;
  fillColor: string;
  fillOpacity: number;
  radius: number;
}

export const circleObj: Circle = {
  color: 'red',
  fillColor: '#d8e4f9',
  fillOpacity: 0.5,
  radius: 260000,
};

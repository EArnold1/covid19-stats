import axios from 'axios';
import L from 'leaflet';
import { tileUrl, attribution, circleObj } from './utils/utils';

const form = document.querySelector('form')!;
const input = document.getElementById('search')! as HTMLInputElement;

const activeCases = document.getElementById('active')! as HTMLLIElement;
const confirmedCases = document.getElementById('confirmed')! as HTMLLIElement;
const deaths = document.getElementById('deaths')! as HTMLLIElement;
const date = document.getElementById('date')! as HTMLParagraphElement;

type Result = {
  Date: Date;
  Active: number;
  Confirmed: number;
  Lat: number;
  Lon: number;
  Country?: string;
  Deaths: string;
};

async function searchApi(event: Event): Promise<void> {
  event.preventDefault();
  const searchStr = input.value;
  try {
    const res = await axios.get(
      `https://api.covid19api.com/country/${encodeURI(searchStr)}`
    );

    const data: Result[] = await res.data;

    const result: Result = data[data.length - 1];

    activeCases.textContent = result.Active.toString();
    confirmedCases.textContent = result.Confirmed.toString();
    deaths.textContent = result.Deaths.toString();
    date.classList.add('border');
    const formatedDate = new Date(result.Date);
    date.textContent = `As Of ${formatedDate.toString()}`;

    // Map
    let map = new L.Map('map', {
      center: new L.LatLng(result.Lat, result.Lon),
      zoom: 3,
    });

    const tiles = L.tileLayer(tileUrl, { attribution });
    tiles.addTo(map);

    const marker = L.marker([result.Lat, result.Lon]).addTo(map);
    const circle = L.circle([result.Lat, result.Lon], circleObj).addTo(map);

    console.log(result);
  } catch (err) {
    console.log(err);
  }
}

form.addEventListener('submit', searchApi);

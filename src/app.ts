import axios from 'axios';

const form = document.querySelector('form')!;
const input = document.getElementById('search')! as HTMLInputElement;

const activeCases = document.getElementById('active')! as HTMLLIElement;
const confirmedCases = document.getElementById('confirmed')! as HTMLLIElement;
const deaths = document.getElementById('deaths')! as HTMLLIElement;
const recovered = document.getElementById('recovered')! as HTMLLIElement;

type Result = {
  Recovered: number;
  Active: number;
  Confirmed: number;
  Lat?: number;
  Lon?: number;
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
    recovered.textContent = result.Recovered.toString();

    console.log(result);
  } catch (err) {
    console.log(err);
  }
}

form.addEventListener('submit', searchApi);

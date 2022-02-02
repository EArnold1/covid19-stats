import axios from 'axios';
// import { Chart } from 'chart.js';
import Chart from 'chart.js/auto';

interface Data {
  NewConfirmed: number;
  TotalConfirmed: number;
  NewDeaths: number;
  TotalDeaths: number;
  NewRecovered: number;
  TotalRecovered: number;
}

export async function setChart() {
  try {
    const res = await axios.get('https://api.covid19api.com/summary');
    const results: Data = await res.data.Global;
    const {
      NewConfirmed,
      TotalConfirmed,
      NewDeaths,
      NewRecovered,
      TotalDeaths,
      TotalRecovered,
    } = results;

    console.log(results);

    const labels: string[] = [
      'Newly confirmed cases',
      'Total confirmed cases',
      'New deaths',
      'Newly Recovered',
      'Total Deaths',
      'Total Recoverd',
    ];

    const data = {
      labels: labels,
      datasets: [
        {
          label: 'Global covid stats',
          data: [
            NewConfirmed,
            TotalConfirmed,
            NewDeaths,
            NewRecovered,
            TotalDeaths,
            TotalRecovered,
          ],
          backgroundColor: [
            'rgb(255, 205, 86)',
            'rgb(55, 27, 233)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)',
            'rgb(255, 99, 132)',
          ],
        },
      ],
    };

    // const config = {
    //   type: 'pie',
    //   data: data,
    // };

    const tag = document.getElementById('myChart')! as HTMLCanvasElement;

    const myChart = new Chart(tag, {
      type: 'pie',
      data: data,
    });
  } catch (err) {
    console.log(err);
  }
}

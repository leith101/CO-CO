import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AnnonceService } from '../../service/annonce.service';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-statis',
  templateUrl: './statis.component.html',
  styleUrls: ['./statis.component.css']
})
export class StatisComponent implements OnInit, AfterViewInit {
  chart: Chart | undefined;
  dailyCounts: { date: string, count: number }[] = [];
  errorMessage: string | undefined;

  constructor(private annonceService: AnnonceService) {}

  ngOnInit(): void {
    this.fetchStatistics();
  }

  ngAfterViewInit() {
    this.renderChart(); 
  }

  fetchStatistics() {
    this.annonceService.getStat().subscribe(
      (response) => {
        console.log('Raw API Response:', response);

        this.dailyCounts = Object.entries(response).map(([date, count]) => ({
          date: new Date(date).toLocaleDateString(),
          count: count as number,
        }));

        if (this.dailyCounts.length > 0) {
          this.renderChart(); 
        } else {
          this.errorMessage = 'No data available';
        }
      },
      (error) => {
        console.error('Error fetching statistics:', error);
        this.errorMessage = 'Error fetching data';
      }
    );
  }

  renderChart() {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;

    if (!canvas) {
      console.warn('Canvas not found');
      return;
    }

    if (!this.dailyCounts.length) {
      console.warn('No data to display in the chart');
      return;
    }

    const labels = this.dailyCounts.map((data) => data.date);
    const data = this.dailyCounts.map((data) => data.count);

    this.chart = new Chart(canvas, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Daily Counts',
            data,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: true,
          },
        ],
      },
      options: {
        scales: {
          x: {
            type: 'category',
          },
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}

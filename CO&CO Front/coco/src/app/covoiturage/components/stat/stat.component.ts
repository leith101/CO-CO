import { Component, OnInit } from '@angular/core';
import { AnnonceService } from '../../service/annonce.service';
import { Chart, registerables, ChartItem } from 'chart.js';

@Component({
  selector: 'app-statistics',
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.css']
})
export class StatComponent implements OnInit {
  activeCount = 0;
  inactiveCount = 0;
  loading = true;
  error: string | null = null;
  chart: Chart<'doughnut', number[], unknown> | null = null;

  constructor(private annonceService: AnnonceService) {
    Chart.register(...registerables); 
  }

  ngOnInit(): void {
    this.loadStatistics(); 
  }

  loadStatistics(): void {
    this.annonceService.getStatistics().subscribe(
      (data) => {
        this.activeCount = data.active_count; 
        this.inactiveCount = data.inactive_count; 
        this.loading = false;
        this.initializeChart();
      },
      (error) => {
        this.error = 'Failed to load statistics. Please try again.'; 
        this.loading = false;
      }
    );
  }

  initializeChart(): void {
    setTimeout(() => { 
      const ctx = document.getElementById('statistics-chart') as ChartItem;
      if (ctx && !this.chart) { 
        this.chart = new Chart<'doughnut', number[], unknown>(ctx, {
          type: 'doughnut', 
          data: {
            labels: ['Active', 'Inactive'], 
            datasets: [
              {
                data: [this.activeCount, this.inactiveCount], 
                backgroundColor: ['#4CAF50', '#F44336'], 
                borderColor: ['#388e3c', '#d32f2f'], 
                borderWidth: 1, 
              },
            ],
          },
          options: {
            responsive: true, 
            plugins: {
              legend: {
                display: true, 
                position: 'top', 
              },
            },
          },
        });
      }
    }, 100); 
  }
}

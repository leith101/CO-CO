import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
 
@Component({
  selector: 'app-certistatis',
  templateUrl: './certistatis.component.html',
  styleUrl: './certistatis.component.css'
})
export class CertistatisComponent {

  chartOptions = {
    title: {
      text: 'Monthly Sales Data',
    },
    theme: 'light2',
    animationEnabled: true,
    exportEnabled: true,
    axisY: {
      includeZero: true,
      valueFormatString: '$#,##0k',
    },
    data: [
      {
        type: 'column', //change type to bar, line, area, pie, etc
        yValueFormatString: '$#,##0k',
        color: '#01b8aa',
        dataPoints: [
          { label: 'accepted', y: 172 },
          { label: 'refused', y: 189 },
          { label: 'on wait', y: 185},

        ],
      },
    ],
  };
}






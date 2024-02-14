import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-lab',
  standalone: true,
  imports: [CommonModule,RouterOutlet],
  templateUrl: './lab.component.html',
  styleUrl: './lab.component.css',
})
export class LabComponent {
  nombre = 'Santiago';
  tasks = ['Comer', 'Correr', 'Estudiar', 'Dormir'];
}

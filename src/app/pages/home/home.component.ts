import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  tasks = signal(['Comer', 'Correr', 'Estudiar', 'Dormir']);
  addTask(event: Event) {
    let input = event.target as HTMLInputElement;
    let { value } = input;
    this.tasks.update((tasks) => [...tasks, value]);
    input.value = '';
  }
  deleteTak(index: number) {
    this.tasks.update((tasks) =>
      tasks.filter((task, position) => position != index)
    );
  }
}

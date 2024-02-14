import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ITask } from '../../models/Taks.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  tasks = signal<ITask[]>([
    {
      id: Date.now(),
      title: 'Comer',
      completed: false,
    },
  ]);
  private createTask(title: string): ITask {
    return {
      id: Date.now(),
      title,
      completed: false,
    };
  }
  addTask(event: Event) {
    let input = event.target as HTMLInputElement;
    let { value } = input;
    let newTask = this.createTask(value);
    this.tasks.update((tasks) => [...tasks, newTask]);
    input.value = '';
  }
  deleteTak(id: number) {
    this.tasks.update((tasks) => tasks.filter((task) => task.id != id));
  }
}

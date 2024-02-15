import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ITask } from '../../models/Taks.model';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  inputTaskControl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required],
  });
  editTaskControl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required],
  });
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
  addTask() {
    if (this.inputTaskControl.valid) {
      let value = this.inputTaskControl.value.trim();
      if (value) {
        let newTask = this.createTask(value);
        this.tasks.update((tasks) => [...tasks, newTask]);
        this.inputTaskControl.setValue('');
      }
    }
  }
  editTask(id: number, event: Event) {
    let input = event.target as HTMLInputElement;
    let value = input.value.trim();
    if (value) {
      this.tasks.update((tasks) =>
        tasks.map((task) => {
          if (task.id == id) {
            return {
              ...task,
              title: value,
              editing: false,
            };
          }
          return task;
        })
      );
    }
  }
  handleEdit(id: number) {
    this.tasks.update((tasks) =>
      tasks.map((task) => {
        if (task.id == id) {
          return {
            ...task,
            editing: true,
          };
        }
        return { ...task, editing: false };
      })
    );
  }
  deleteTak(id: number) {
    this.tasks.update((tasks) => tasks.filter((task) => task.id != id));
  }
  updateTask(id: number) {
    this.tasks.update((tasks) =>
      tasks.map((task) => {
        if (task.id == id) {
          return { ...task, completed: !task.completed };
        }
        return task;
      })
    );
  }
}

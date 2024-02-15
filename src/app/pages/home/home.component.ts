import { CommonModule } from '@angular/common';
import { Component, computed, effect, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ITask } from '../../models/Taks.model';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Filters } from '../../models/Filters.models';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor() {
    effect(() => {
      let tasks = this.tasks();
      localStorage.setItem('tasks', JSON.stringify(tasks));
    });
  }
  ngOnInit() {
    let storage = localStorage.getItem('tasks');
    if (storage) {
      this.tasks.set(JSON.parse(storage));
    }
  }
  updateStorage() {}
  inputTaskControl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required],
  });
  editTaskControl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required],
  });
  tasks = signal<ITask[]>([]);
  filter = signal<'all' | 'pending' | 'completed'>('all');
  filterTasks = computed(() => {
    let tasks = this.tasks();
    let filter = this.filter();
    if (filter == Filters.PENDING) {
      return tasks.filter((task) => !task.completed);
    } else if (filter == Filters.COMPLETED) {
      return tasks.filter((task) => task.completed);
    } else return tasks;
  });
  private createTask(title: string): ITask {
    return {
      id: Date.now(),
      title,
      completed: false,
    };
  }
  handleFilter(filter: 'all' | 'pending' | 'completed') {
    this.filter.set(filter);
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

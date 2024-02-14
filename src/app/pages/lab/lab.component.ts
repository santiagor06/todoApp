import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-lab',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './lab.component.html',
  styleUrl: './lab.component.css',
})
export class LabComponent {
  nombre = signal('Santiago');
  tasks = signal(['Comer', 'Correr', 'Estudiar', 'Dormir']);
  user = {
    name: 'Santiago',
    age: 23,
    avatar:
      'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png',
  };
  handeClick() {
    alert('Diste Click');
  }
  handleChange(event: Event) {
    let input = event.target as HTMLInputElement;
    console.log(input.value);
  }
  handleSignal(event: Event) {
    let input = event.target as HTMLInputElement;
    let { value } = input;
    this.nombre.set(value);
  }
}

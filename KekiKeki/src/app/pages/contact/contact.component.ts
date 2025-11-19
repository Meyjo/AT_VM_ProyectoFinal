import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextarea } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, InputTextModule, InputTextarea, ButtonModule, ToastModule, FloatLabelModule],
  providers: [MessageService],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  name: string = '';
  email: string = '';
  message: string = '';

  constructor(private messageService: MessageService) {}

  sendMessage() {
    if (this.name && this.email && this.message) {
      this.messageService.add({ severity: 'success', summary: 'Enviado', detail: 'Gracias por contactarnos. Te responderemos pronto.' });
      this.name = '';
      this.email = '';
      this.message = '';
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Por favor completa todos los campos.' });
    }
  }
}

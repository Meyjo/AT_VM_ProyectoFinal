import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextarea } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, InputTextModule, InputTextarea, ButtonModule, ToastModule, FloatLabelModule, ReactiveFormsModule],
  providers: [MessageService],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  contactForm = new FormGroup({
    name: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
    email: new FormControl('', {nonNullable: true, validators: [Validators.required, Validators.email]}),
    message: new FormControl('', {nonNullable: true, validators: [Validators.required]})
  });

  constructor(private messageService: MessageService, private contactService: ContactService) {}

  sendMessage() {
    if(this.contactForm.valid) {
      this.contactService.createContact(this.contactForm.getRawValue()).subscribe({
        next: (res) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Mensaje enviado',
            detail: 'Mensaje de contacto enviado correctamente'
          })
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Mensaje no enviado',
            detail: 'Error al enviar el mensaje de contacto'
          })
        }
      })
    }
  }
}

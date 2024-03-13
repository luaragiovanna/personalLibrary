import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.scss'],
})
export class SectionsComponent  implements OnInit {

  @Input() formLivro: FormGroup;
  @Output() submitForm = new EventEmitter<void>();

  constructor(private formBuilder: FormBuilder) {
    this.formLivro = this.formBuilder.group({
      nome: ['', [Validators.required]],
      autor: ['', [Validators.required]],
      genero: ['', [Validators.required]],
      editora: ['', [Validators.required]],
      anoPublicacao: ['', [Validators.required]],
    });
  }

  onSubmit() {
    this.submitForm.emit();
  }

  ngOnInit() {}
}
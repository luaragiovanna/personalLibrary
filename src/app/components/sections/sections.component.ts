import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.scss'],
})
export class SectionsComponent implements OnInit {

  @Input() formLivro: FormGroup;
  @Output() submitForm = new EventEmitter<void>();
  @Input() edicaoHabilitada: boolean = false;

  constructor(private formBuilder: FormBuilder) { }

  onSubmit() {
    this.submitForm.emit();
  }

  ngOnInit() {
    if (!this.formLivro) {
      this.formLivro = this.formBuilder.group({
        nome: ['', [Validators.required]],
        autor: ['', [Validators.required]],
        genero: ['', [Validators.required]],
        editora: ['', [Validators.required]],
        anoPublicacao: ['', [Validators.required]],
      });
    }

    if (!this.edicaoHabilitada) {
      this.formLivro.disable(); // desativa os campos do form se a edição não estiver habilitada
    }
  }

}

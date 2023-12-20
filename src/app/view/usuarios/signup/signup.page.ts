import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/common/alert.service';
import { AuthService } from 'src/app/model/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  formCadastrar : FormGroup;

  constructor(private router : Router, private alertService: AlertService, private formBuilder : FormBuilder, private authService : AuthService /*construtor de formulario*/) {
    this.formCadastrar = new FormGroup({ //instancia o formGroup
      email: new FormControl(''),
      senha: new FormControl(''),
      confSenha: new FormControl('')
    });
   }

   ngOnInit() {
    this.formCadastrar = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]], //required => campo obrigatorio / validacao de email
      senha: ['', [Validators.required, Validators.minLength(6)]], //validacao de tamanha minimo
      confSenha: ['', [Validators.required, Validators.minLength(6)]] //validacao de tamanha minimo
    });
  }

  get errorControl(){
    return this.formCadastrar.controls;
  }

  submitForm() : boolean{
    if(!this.formCadastrar.valid){
      this.alertService.presentAlert("Erro", "Erro ao Preencher campo!!")
      return false;
    }else{
      this.alertService.simpleLoader();
      this.cadastrar();
      return true;
    }
  }

  private cadastrar(){
    this.authService.signUpWithEmailAndPassword(this.formCadastrar.value['email'], 
    this.formCadastrar.value['senha']).then((res)=>{
      this.alertService.dismissLoader();
      this.alertService.presentAlert("Olá", "Cadastro realizado com sucesso")
      this.router.navigate(['signin']);
    })
    .catch((error)=>{
      this.alertService.dismissLoader();
      this.alertService.presentAlert("Erro", "Erro ao Logar")
      console.log(error.message)
    })
  }
    //then => deu tudo certo / catch => dispara a excecao de erro
}


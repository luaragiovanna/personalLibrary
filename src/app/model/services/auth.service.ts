import { Injectable, NgZone } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { FacebookAuthProvider } from 'firebase/auth';
import { GithubAuthProvider } from 'firebase/auth';
import {getAuth, signInWithPopup, browserPopupRedirectResolver, GoogleAuthProvider} from 'firebase/auth';
import * as firebase from 'firebase/compat';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  usuarioDados: any;

  constructor(private firebase : FirebaseService,
    private fireAuth : AngularFireAuth,
    private router : Router,
    private ngZone : NgZone) {
      this.fireAuth.authState.subscribe(user => { //subscribe => vai retornar um usuario ou n
        if(user){
          this.usuarioDados = user;
          localStorage.setItem('user', JSON.stringify(this.usuarioDados)); //puxa os dados do usarios localmente
        }else{
          localStorage.setItem('user', 'null');
        }
      })
    }

    public signIn(email: string, password : string){ //loga com email e senha
      return this.fireAuth.signInWithEmailAndPassword(email, password); //confirmSenha só serve pro Front
    }

    public signUpWithEmailAndPassword(email: string, password : string){ //cadastra usario com email e senha
      return this.fireAuth.createUserWithEmailAndPassword(email, password);
    }

    public recoverPassword(email: string){
      //"Esqueceu a senha? Clique aqui"
      return this.fireAuth.sendPasswordResetEmail(email);
    }

    public signOut(){ //desloga o usuario
      return this.fireAuth.signOut().then(() => {
        localStorage.removeItem('user');
        this.router.navigate(['signin']);
      });
    }

    public getUserLogged(){ //guarda os dados do usuario logado localmente
      const user : any = JSON.parse(localStorage.getItem('user') || 'null');
      if(user != null){
        return user;
      }else{
        return null;
      }
    }

    public isLoggedIn() : boolean{ //verifica se o user ta logado
      const user : any = JSON.parse(localStorage.getItem('user') || 'null');
      return (user !==null) ? true : false;
    }

    public signInWithGoogle(){
      const provider = new GoogleAuthProvider();
      const auth = getAuth();
      return signInWithPopup(auth, provider, browserPopupRedirectResolver);
    }

    public signInWithGithub(){
      const provider = new GithubAuthProvider();
      const auth = getAuth();
      return signInWithPopup(auth, provider, browserPopupRedirectResolver);
    }

    public signInWithFacebook(){

      const provider = new FacebookAuthProvider();
      const auth = getAuth();
      return signInWithPopup(auth, provider, browserPopupRedirectResolver);

      //const auth = getAuth();
      //const provider = new FacebookAuthProvider();
      //const result = await this.afAuth.signInWithPopup(provider);

      //var provider = new FacebookAuthProvider();
      //const auth = getAuth();
      //return this.afAuth.signInWithPopup(auth, provider, browserPopupRedirectResolver);
    }
}

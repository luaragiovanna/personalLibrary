import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import Livro from '../entities/Livro';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private PATH: string ='livro';

  constructor(private firestore : AngularFirestore, private storage : AngularFireStorage) { }

  read(uid : string){
    return this.firestore.collection(this.PATH,
      ref => ref.where('uid', '==', uid))// ref => referencia // where => select no banco, buscando o uid
      // poderia ter mais um ref com o nome de alguem no lugar do segundo uid => para buscas especificas
    .snapshotChanges();
  }

  create(livro: Livro){
    return this.firestore.collection(this.PATH)
    .add({nome: livro.nome,autor: livro.autor, editora: livro.editora,
    genero: livro.genero, anoPublicacao: livro.anoPublicacao, uid: livro.uid});

  }

  createWithAvatar(livro: Livro){
    return this.firestore.collection(this.PATH)
    .add({nome: livro.nome,autor: livro.autor, editora: livro.editora,
      genero: livro.genero, anoPublicacao: livro.anoPublicacao, downloadURL : livro.downloadURL, uid: livro.uid});
  }

  updateWithAvatar(livro: Livro, id: string){
    return this.firestore.collection(this.PATH).doc(id)
    .update({nome: livro.nome,autor: livro.autor, editora: livro.editora,
      genero: livro.genero, anoPublicacao: livro.anoPublicacao, downloadURL : livro.downloadURL, uid: livro.uid});
  }

  uploadImage(imagem: any, livro: Livro){
    const file = imagem.item(0);
    if(file.type.split('/')[0] != 'image'){ //split => separa a imagem em varios arrays
      console.error('Tipo não Suportado!'); //garante q sera enviado apenas imagens
      return;
    }

    const path =`images/${livro.nome}_${file.name}`; // caminho da imagem
    const fileRef = this.storage.ref(path); // pega a referencia da imagem
    let task = this.storage.upload(path,file); // tarefa q armazena o envio da imagem
    task.snapshotChanges().pipe(
      finalize(() =>{
        let uploadFileURL = fileRef.getDownloadURL(); //n garante a resposta
        uploadFileURL.subscribe(resp => { //subscribe => quebra o retorno 'resp'
          livro.downloadURL = resp; // pega a resposta e armazanea naquele livro
          if(!livro.id){ // se o livro n existe
            this.createWithAvatar(livro); // cria o livro 
          }else{
            this.updateWithAvatar(livro, livro.id);
          }
        })
      })
      ).subscribe(); //envia a imagem pro banco

  }

  update(livro: Livro,id: string){
    return this.firestore.collection(this.PATH).doc(id)
    .update({nome: livro.nome, autor: livro.autor, editora: livro.editora,
    genero: livro.genero, anoPublicacao: livro.anoPublicacao, uid: livro.uid});
  }

  delete(livro: Livro){
    return this.firestore.collection(this.PATH)
    .doc(livro.id).delete()
  }
}

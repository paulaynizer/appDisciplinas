import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Disciplina } from '../models/disciplina';
import { AngularFireStorage,  } from '@angular/fire/compat/storage';
import { finalize, take } from 'rxjs/operators';
import { getStorage, ref, deleteObject, } from "firebase/storage";

@Injectable({
  providedIn: 'root'
})
export class DisciplinaFirebaseService {
  private PATH: string = 'disciplinas';
  constructor(private angularFirestore: AngularFirestore,
  private angularFireStorage: AngularFireStorage) { }
  getDisciplina(id: string) {
    return this.angularFirestore
      .collection(this.PATH)
      .doc(id)
      .valueChanges();
  }
  getDisciplinas() {
    return this.angularFirestore
      .collection(this.PATH)
      .snapshotChanges();
  }
  inserirDisciplina(disciplina: Disciplina) {
    let itemId = new Date().getTime();
    return this.angularFirestore
      .collection(this.PATH)
      .doc(itemId.toString())
      .set({
        nome: disciplina.nome,
        cargaHoraria: disciplina.cargaHoraria,
        natureza: disciplina.natureza,
        dataInicio: disciplina.dataInicio,
        dataFim: disciplina.dataFim,
        professor: disciplina.professor,
        vagas: disciplina.vagas,
        modalidade: disciplina.modalidade,
        downloadURL: disciplina.downloadURL
      });
  }
  editarDisciplina(disciplina: Disciplina, id: string) {
    return this.angularFirestore
      .collection(this.PATH)
      .doc(id)
      .update({
        nome: disciplina.nome,
        cargaHoraria: disciplina.cargaHoraria,
        natureza: disciplina.natureza,
        dataInicio: disciplina.dataInicio,
        dataFim: disciplina.dataFim,
        vagas: disciplina.vagas,
        professor: disciplina.professor,
        modalidade: disciplina.modalidade, 
        downloadURL:  disciplina.downloadURL,
      });
  }
  excluirDisciplina(disciplina: Disciplina) {
    return this.angularFirestore
      .collection(this.PATH)
      .doc(disciplina.id)
      .delete();
  }
  enviarImagem(imagem: any, disciplina: Disciplina) {
    const file = imagem.item(0);
    if (file.type.split('/')[0] !== 'image') {
      console.error('Tipo não suportado');
      return;
    }
    const path = `images/${disciplina.id}`;
    const fileRef = this.angularFireStorage.ref(path);
    let task = this.angularFireStorage.upload(path, file);
    task.snapshotChanges().pipe(
      finalize(() => {
        let uploadedFileURL = fileRef.getDownloadURL();
        uploadedFileURL.subscribe((resp) => {
          disciplina.downloadURL = resp;
          this.inserirDisciplina(disciplina);
        })
      })
    ).subscribe();
    return task;
  }
  atualizaImagem(disciplina: Disciplina, id :any, imagem : any) {
    const file = imagem.item(0);
    if (file.type.split('/')[0] !== 'image') {
      console.error('Tipo não suportado');
      return;
    }
    const path = `images/${id}`;
    const fileRef = this.angularFireStorage.ref(path);
    let task = this.angularFireStorage.upload(path, file);
    task.snapshotChanges().pipe(
      finalize(() => {
        let uploadedFileURL = fileRef.getDownloadURL();
        uploadedFileURL.subscribe((resp) => {
          disciplina.downloadURL = resp;
          this.editarDisciplina(disciplina, id);
        })
      })
    ).subscribe();
    return task;
    }
}
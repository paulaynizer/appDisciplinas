import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Disciplina } from 'src/app/models/disciplina';
import { Alerts } from 'src/app/utils/Alerts';
import { DisciplinaFirebaseService } from 'src/app/services/disciplina-firebase.service';

@Component({
  selector: 'app-detalhar',
  templateUrl: './detalhar.page.html',
  styleUrls: ['./detalhar.page.scss'],
})
export class DetalharPage implements OnInit {
  disciplina : Disciplina;
  data: string;
  edicao: boolean = true;
  form_detalhar : FormGroup;
  isSubmitted: boolean = false;
  imagem : any;
  constructor(private alertController: AlertController,
  private router: Router,
  private disciplinaFS: DisciplinaFirebaseService,
  private formBuilder:FormBuilder) { }
    
  uploadFile(imagem : any){
    this.imagem = imagem.files;
  }
  ngOnInit() {
    
    const nav = this.router.getCurrentNavigation();
    this.disciplina = nav.extras.state.objeto;
    this.data = new Date().toISOString();
    this.form_detalhar = this.formBuilder.group({
      nome: [this.disciplina.nome, [Validators.required]],
      cargaHoraria: [this.disciplina.cargaHoraria, [Validators.required]],
      natureza: [this.disciplina.natureza, [Validators.required]],
      dataInicio: [this.disciplina.dataInicio, [Validators.required]],
      dataFim: [this.disciplina.dataFim, [Validators.required]],
      vagas: [this.disciplina.vagas, [Validators.required]],
      modalidade: [this.disciplina.modalidade, [Validators.required]],
      professor: [this.disciplina.professor, [Validators.required]],
      imagem: [this.disciplina.dowloadURL, [Validators.required]]
    });
  }

  get errorControl() {
    return this.form_detalhar.controls;
  }

  submitForm(): boolean {
    this.isSubmitted = true;
    if (!this.form_detalhar.valid) {
      this.presentAlert('Disciplina','Error','Todos os campos são Obrigatórios!');
      return false;
    } else {
      this.editar();
    }
  }

  alterarEdicao(){
    if(this.edicao == true){
      this.edicao = false;
    }else{
      this.edicao = true;
    }
  }

  editar() {
    this.disciplinaFS.atualizaImagem(this.form_detalhar.value, this.disciplina.id, this.imagem)
    .then(()=>{
      this.presentAlert("Disciplinas", "Sucesso", "Disciplina Editada!");
      this.router.navigate(["/home"]);
    })
    .catch((error)=>{
      this.presentAlert("Disciplinas", "Erro", "Erro ao editar");
      console.log(error);
    })
  }

  excluir(){
    this.presentAlertConfirm("Disciplina","Excluir Disciplina",
    "Você realmente deseja excluir a disciplina?");
  }

  private excluirContato(){
    this.disciplinaFS.excluirDisciplina(this.disciplina)
    .then(()=>{
      this.presentAlert("Disciplinas", "Sucesso", "Disciplina Excluida!");
      this.router.navigate(["/home"]);
    })
    .catch((error)=>{
      this.presentAlert("Disciplinas", "Erro", "Erro ao excluir");
      console.log(error);
    })
  }

  irParaHome(){
    this.router.navigate(["/home"]);
  }

  async presentAlert(header: string, subHeader: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      subHeader: subHeader,
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }

  async presentAlertConfirm(header: string, subHeader: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      subHeader: subHeader,
      message: message,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
          },
        },
        {
          text: 'Confirmar',
          role: 'confirm',
          handler: () => {
            this.excluirContato();
          },
        },
      ],
    });
    await alert.present();
  }
}

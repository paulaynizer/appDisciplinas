import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DisciplinaService } from 'src/app/services/disciplina.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { DisciplinaFirebaseService } from 'src/app/services/disciplina-firebase.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.page.html',
  styleUrls: ['./cadastrar.page.scss'],
})
export class CadastrarPage implements OnInit {
  form_cadastrar : FormGroup;
  isSubmitted: boolean = false;
  data: string;
  imagem: any;

  constructor(private alertController: AlertController,
    private router: Router,
    private loadingCtrl: LoadingController,
    private disciplinaSF: DisciplinaFirebaseService,
    private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.data= new Date().toISOString();
    this.form_cadastrar = this.formBuilder.group({
      nome: ["", [Validators.required]],
      cargaHoraria: ["", [Validators.required]],
      natureza: ["", [Validators.required]],
      dataInicio: ["", [Validators.required]],
      dataFim: ["", [Validators.required]],
      vagas: ["", [Validators.required]],
      modalidade: ["", [Validators.required]],
      professor: ["", [Validators.required]],
      imagem:["", [Validators.required]]
    });
  }
  uploadFile(imagem : any){
    this.imagem = imagem.files;
  }
  get errorControl(){
    return this.form_cadastrar.controls;
  }

  submitForm() : boolean{
    this.isSubmitted = true;
    if(!this.form_cadastrar.valid){
      this.presentAlert("Disciplinas", "Erro", "Todos os campos devem ser preenchidos.");
      return false;
    }else{
      this.cadastrar();
    }
  }

  private cadastrar(){
    this.showLoading("Aguarde", 10000)
    this.disciplinaSF
    .enviarImagem(this.imagem, this.form_cadastrar.value)
    .then(()=>{
      this.loadingCtrl.dismiss();
      this.presentAlert("Disciplinas", "Sucesso", "Disciplina Cadastrado!");
      this.router.navigate(["/home"]);
    })
    .catch((error)=>{
      this.loadingCtrl.dismiss();
      this.presentAlert("Disciplinas", "Erro", "Erro ao cadastrar");
      console.log(error);
    })
    
  }

  async presentAlert(header: string, subHeader: string, message:string) {
    const alert = await this.alertController.create({
      header: header,
      subHeader: subHeader,
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }
  irParaHome(){
    this.router.navigate(["/home"]);
  }
  async showLoading(mensagem : string, duracao: number) {
    const loading = await this.loadingCtrl.create({
      message: mensagem,
      duration: duracao,
    });

    loading.present();
  }
}


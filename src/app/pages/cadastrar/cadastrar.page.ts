import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { DisciplinaFirebaseService } from 'src/app/services/disciplina-firebase.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.page.html',
  styleUrls: ['./cadastrar.page.scss'],
})
export class CadastrarPage implements OnInit {
  form_cadastrar : FormGroup;
  isSubmitted: boolean = false;
  data: string;
  tdata: string;
  imagem: any;

  constructor(private alertController: AlertController,
    private router: Router,
    private loadingCtrl: LoadingController,
    private disciplinaSF: DisciplinaFirebaseService,
    private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.data = new Date().toISOString();
    this.data = this.data.split('T')[0];

    //let newDate = new Date(this.data);
    //const localDate: Date = this.convertToLocalDate('01/01/2021');

    this.form_cadastrar = this.formBuilder.group({
      nome: ["", [Validators.required]],
      cargaHoraria: ["", [Validators.required, Validators.min(1), Validators.max(100)]],
      natureza: ["", [Validators.required]],
      dataInicio: ['2022-10-05', [Validators.required]],
      dataFim: ['2022-10-10', [Validators.required]],
      vagas:  ["", [Validators.required, Validators.min(1), Validators.max(100)]],
      modalidade: ["", [Validators.required]],
      professor: ["", [Validators.required]],
      imagem:["", [Validators.required]]
    }
    );
  }
  uploadFile(imagem : any){
    this.imagem = imagem.files;
  }
  dataLimit(datas : string){
    console.log("tdata= " + this.tdata);
    this.tdata = datas;
    console.log("tdata depois= " + this.tdata);
  }

/*
  getFormatedDate(date: Date, format: string) {
    const datePipe = new DatePipe('en-US');
    return datePipe.transform(date, format);
  }

  convertToLocalDate(responseDate: any) {
    try {
        if (responseDate != null) {
            if (typeof (responseDate) === 'string') {
                if (String(responseDate.indexOf('T') >= 0)) {
                    responseDate = responseDate.split('T')[0];
                }
                if (String(responseDate.indexOf('+') >= 0)) {
                    responseDate = responseDate.split('+')[0];
                }
            }

            responseDate = new Date(responseDate);
            const newDate = new Date(responseDate.getFullYear(), responseDate.getMonth(), responseDate.getDate(), 0, 0, 0);
            const userTimezoneOffset = newDate.getTimezoneOffset() * 60000;

            const finalDate: Date = new Date(newDate.getTime() - userTimezoneOffset);
            return finalDate > Util.minDateValue ? finalDate : null;
        } else {
            return null;
        }
    } catch (error) {
        return responseDate;
    }
}*/


  isWeekday = (dateString: string) => {
    const date = new Date(dateString);
    const utcDay = date.getUTCDay();
    return utcDay !== 0 && utcDay !== 6;
  };

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


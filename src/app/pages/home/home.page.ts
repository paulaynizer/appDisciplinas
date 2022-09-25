import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Disciplina } from 'src/app/models/disciplina';
import { DisciplinaFirebaseService } from 'src/app/services/disciplina-firebase.service';
import { DisciplinaService } from 'src/app/services/disciplina.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  disciplinas: Disciplina[];

  constructor(private router: Router,
    private disciplinaFS: DisciplinaFirebaseService) {
    this.carregarDisciplinas();
  }
  carregarDisciplinas(){
    this.disciplinaFS.getDisciplinas()
    .subscribe(res => {
      this.disciplinas = res.map(d =>{
        return{
          id: d.payload.doc.id,
          ...d.payload.doc.data() as Disciplina
        }as Disciplina;
      })
    });
  }
  irParaCadastrar(){
    this.router.navigate(["/cadastrar"]);
  }

  irParaDetalhar(disciplina: Disciplina){
    this.router.navigateByUrl("/detalhar",
    {state: {objeto:disciplina}});
  }
}

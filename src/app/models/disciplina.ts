export class Disciplina {
    private _nome: string;
    private _professor : string;
    private _cargaHoraria: number;
    private _natureza: string;
    private _dataInicio : string;
    private _dataFim : string;
    private _vagas : number;
    private _modalidade : string;
    private _id : any;
    private _downloadURL : any;

    constructor(
      nome : string, professor : string,
      cargaHoraria: number, natureza: string,
      dataInicio : string, dataFim : string,
      vagas : number, modalidade : string){
        let chave = new Date;
        this._id = chave.getTime();
        this._nome = nome;
        this._professor = professor;
        this._cargaHoraria = cargaHoraria;
        this._natureza = natureza;
        this._dataInicio = dataInicio;
        this._dataFim = dataFim;
        this._vagas = vagas;
        this._modalidade = modalidade;
    }
    public get id() : any{
        return this._id;
    }
    public get nome() : string{
        return this._nome;
    }
    public get cargaHoraria() : number{
        return this._cargaHoraria;
    }
    public get natureza() : string{
        return this._natureza;
    }
    public get dataInicio() : string{
        return this._dataInicio;
    }
    public get dataFim() : string{
        return this._dataFim;
    }
    public get vagas() : number{
        return this._vagas;
    }
    public get modalidade() : string{
        return this._modalidade;
    }
    public get professor() : string{
        return this._professor;
    }
    //set
    public set nome(nome: string){
        this._nome=nome;
    }
    public set cargaHoraria(cargaHoraria: number){
        this._cargaHoraria = cargaHoraria;
    }
    public set natureza(natureza: string){
        this._natureza=natureza;
    }
    public set dataInicio(dataInicio: string){
        this._dataInicio=dataInicio;
    }
    public set dataFim(dataFim: string){
        this._dataFim=dataFim;
    }
    public set vagas(vagas: number){
        this._vagas = vagas;
    }
    public set modalidade(modalidade: string){
        this._modalidade=modalidade;
    }
    public set professor(professor: string){
        this._professor=professor;
    }
    public set downloadURL(downloadURL : any){
        this._downloadURL = downloadURL;
    }
    
    public get downloadURL(){
        return this._downloadURL;
    }
}

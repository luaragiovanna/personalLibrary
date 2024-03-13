export default class Livro{
    private _nome: string;
    private _id: string;
    private _autor: string;
    private _genero: string;
    private _editora: string;
    private _anoPublicacao: Date;
    private _downloadURL: any;
    private _uid: string;

    constructor(nome: string, autor: string, genero: string, editora: string, anoPublicacao: Date){
        this._nome = nome;
        this._autor = autor;
        this._genero = genero;
        this._editora = editora;
        this._anoPublicacao = anoPublicacao;
       
    }

    public get nome(): string {
        return this._nome;
    }
    public set nome(value: string) {
        this._nome = value;
    }
    
    public get id(): string {
        return this._id;
    }
    public set id(value: string) {
        this._id = value;
    }

    public get autor(): string {
        return this._autor;
    }
    public set autor(value: string) {
        this._autor = value;
    }
    
    public get genero(): string {
        return this._genero;
    }
    public set genero(value: string) {
        this._genero = value;
    }
    
    public get editora(): string {
        return this._editora;
    }
    public set editora(value: string) {
        this._editora = value;
    }
    public get anoPublicacao(): Date {
        return this._anoPublicacao;
    }
    public set anoPublicacao(value: Date) {
        this._anoPublicacao = value;
    }
    public get downloadURL(): any {
        return this._downloadURL;
    }
    public set downloadURL(value: any) {
        this._downloadURL = value;
    }
    public get uid(): string {
        return this._uid;
    }
    public set uid(value: string) {
        this._uid = value;
    }
}

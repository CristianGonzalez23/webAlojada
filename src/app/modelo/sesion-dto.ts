export class SesionDTO {
  email: string = '';
  password: string = '';
  tipo: any = '';

  constructor(email:string, password: string, tipo:any) {

    this.email= email;
    this.password=password;
    this.tipo=tipo;
  }
}

  export class ProductoModeradorDTO {
    motivo: string = "";
    idModerador: number = 0;
    estado: any = "";
    codigoPublicacion: number = 0;

    constructor(motivo:string,idModerador:number,estado:any,codigoPublicacion:number) {
        this.motivo=motivo;
        this.idModerador=idModerador;
        this.estado=estado;
        this.codigoPublicacion=codigoPublicacion;
    }
}

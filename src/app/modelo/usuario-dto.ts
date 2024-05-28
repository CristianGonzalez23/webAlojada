export class UsuarioDTO {
  nombre: string = '';
  apellido: string = '';
  direccion: string = '';
  telefono: string = '';
  email: string = '';
  password: string = '';
  confirmaPassword: string = '';

  constructor(
    nombre: string,
    apellido: string,
    direccion: string,
    telefono: string,
    email: string,
    password: string
  ) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.direccion = direccion;
    this.telefono = telefono;
    this.email = email;
    this.password = password;
  }
}

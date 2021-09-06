import { Usuario } from '../models/usuarios.model';

export interface GetUsers {
    cuenta: number;
    user: Usuario;
}

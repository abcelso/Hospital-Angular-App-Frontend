import { Hospital } from './hospitales.model';

interface MedicoUser {
    _id: string;
    nombre: string;
    img: string;
}

export class Medico {
    constructor(
        public id: string,
        public nombre: string,
        public usuario?: MedicoUser,
        public img?: string,
        public hospital?: Hospital
    ){}
}

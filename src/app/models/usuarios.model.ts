import { environment } from '../../environments/environment';

const BASEURL = environment.base_URL;

export class Usuario {

    constructor(
        public name: string,
        public email: string,
        public password: string,
        public role: string,
        public google: boolean,
        public uid: string,
        public img?: string,
    ){}

    get imageUrl(): string {

        if (this.img.includes('https')) {
            return `${BASEURL}`;
        }

        if (this.img) {
            return `${BASEURL}/upload/usuarios/${this.img}`;
        }else{
            return `${BASEURL}/upload/usuarios/no-img`;
        }
    }
}

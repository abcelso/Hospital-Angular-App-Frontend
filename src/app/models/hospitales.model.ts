

interface HospitalModel {
    _id: string;
    usuario: HospitalUser | null;
    nombre: string;
    img?: string;
}

interface HospitalUser {
    _id: string;
    nombre: string;
}

export class Hospital {

    constructor(
        ok: boolean,
        hospitales: HospitalModel[]
    ){}
}


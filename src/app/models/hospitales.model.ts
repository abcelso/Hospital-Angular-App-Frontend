
interface HospitalUser {
    id: string;
    nombre: string;
    img: string;
}

export interface Hospital {
    // constructor(
    //     public id: string,
    //     public nombre: string,
    //     public usuario?: HospitalUser,
    //     public img?: string,
    // ){}
        _id: string;
        nombre: string;
        usuario?: HospitalUser;
        img?: string;
}


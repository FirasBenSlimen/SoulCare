import { User } from "./User";

export enum CategorieType {
    Missing_Functionalities,
    Technical_Problems,
    Security,
    Support_and_Assitance,
    Performances
}
export class Reclamation {
    constructor(

        public id?: number,
        public descriptionReclamation?: string,
        public name?: string,
        public dateSoumission?: Date,
        public categorie?: CategorieType,
        public user?: User,
        public status?: string 

    ) {}
    }
  
    
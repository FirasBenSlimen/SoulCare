import { User } from "./User";
import { Reclamation } from "./reclamation";


export class ReponseReclamation {
    id?: number;
    reclamationId?: number; 
    contenu?: string;
    dateReponse?: Date | string; 
    user?: User | undefined; 
    statusReclamation: string = "TRAITE"; 
}

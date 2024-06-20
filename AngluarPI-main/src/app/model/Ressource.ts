import { Category } from "./Category";

export class Ressource {
  idR: number;
  titleR: string;
  descriptionR: string;
  url: string;
  date_creation: Date;
  category: Category;
  liked: boolean;
  likes: number;
  disliked: boolean;
  dislikes:number;
  constructor(
    idR: number,
    titleR: string,
    descriptionR: string,
    url: string,
    date_creation: Date,
    category: Category,
   
  ) {
    this.idR = idR;
    this.titleR = titleR;
    this.descriptionR = descriptionR;
    this.url = url;
    this.date_creation = date_creation;
    this.category = category;
  }
}

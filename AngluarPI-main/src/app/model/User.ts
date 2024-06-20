export enum Role {
  Admin,
  User,
  Student,
  Teacher
  // Ajoutez plus de catégories ici si nécessaire
}
export class User {
  constructor(
    public id?: number,
    public firstname?: string,
    public lastname?: string,
    public email?: string,
    public password?: string,
    public role?: Role,
  ) {}
}

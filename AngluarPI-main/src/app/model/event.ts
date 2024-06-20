import { Ticket } from "./ticket";

export enum Statuss {
    Confirmed = 'Confirmed',
    On_Hold = 'On_Hold',
    Canceled = 'Canceled',
    Completed = 'Completed'
  }

export class Event {
        idEvent!: number;
        description!: string;
        date!: Date;
        number_of_tickets!: number;
        additional_notes!: string;
        place!: string;
        statuss!: Statuss;
        tickets!: Ticket[]
}

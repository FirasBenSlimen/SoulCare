export class Ticket {
    idTicket!: number;
    firstname!: string;
    lastname!: string;
    cin!: string;
    date!: Date;
    recipientEmail!: string;
    event!: Event // Reference to the Event class
}

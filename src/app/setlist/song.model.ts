export class Song {

    private id: number;
    public name: string;
    public overdue: boolean;

    constructor(id: number, name: string, overdue: boolean) {
        this.id = id;
        this.name = name;
        this.overdue = overdue;
    }

}

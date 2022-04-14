

export class WateringInfoDTO {

    private last: number;

    private history: {
        today: number;
        lastWeek: number;
        lastMonth: number;
    } = {today: 0, lastWeek: 0, lastMonth: 0}

    constructor(last: number, today: number, lastWeek: number, lastMonth: number) {
        this.last = last;
        this.history.today = today;
        this.history.lastWeek = lastWeek;
        this.history.lastMonth = lastMonth;
    }
}
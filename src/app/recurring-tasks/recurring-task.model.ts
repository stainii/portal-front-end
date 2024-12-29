export class RecurringTask {
    id: number;
    name: string;
    minNumberOfDaysBetweenExecutions: number;
    maxNumberOfDaysBetweenExecutions: number;
    lastExecution: string;
}

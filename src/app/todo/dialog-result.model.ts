export class DialogResult {
    public nextAction: DialogResultNextAction;
    public data: any;
}

export enum DialogResultNextAction {
    NO_ACTION,
    SAVE_TASK,
    USE_A_TASK_TEMPLATE,
    SAVE_TASK_TEMPLATE_ENTRY
}

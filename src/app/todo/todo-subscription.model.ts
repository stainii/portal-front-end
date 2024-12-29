import {SubscriptionMappingToTask} from "./subscription-mapping-to-task.model";

export class TodoSubscription {

    constructor() {
        this.mappingToTask = new SubscriptionMappingToTask();
    }

    id: number;

    /** The origin that sends an data event **/
    origin: string;

    /**
     * To which conditions should the data event apply to fire this subscription. Should be a Spring EL expression.
     * Examples:
     *      true (always)
     *      data['someProperty'] == "bla"
     **/
    creationCondition: string;

    /**
     * To which conditions should the data event apply to complete a task with the same flowId. Should be a Spring EL expression.
     * Examples:
     *      true (always)
     *      data['someProperty'] == "bla"
     **/
    completeCondition: string;

    mappingToTask: SubscriptionMappingToTask;

}

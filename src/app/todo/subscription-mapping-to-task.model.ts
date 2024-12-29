export class SubscriptionMappingToTask {

    /**
     * How should the name of the task be assembled? Should be a Spring EL expression.
     * Example:
     *          'Please do ' + source
     **/
    mappingOfName: string;

    /**
     * How should the description of the task be assembled? Should be a Spring EL expression.
     * Example:
     *          'You should do ' + source + ', specifically '+ data['someProperty']
     **/
    mappingOfDescription: string;

    /**
     * When should the task be finished?
     * Should be a Spring EL expression resulting in a string that looks like a date.
     **/
    mappingOfDueDate: string;

    /**
     * What is the context of the task? Should be a Spring EL expression.
     * Example:
     *          'Personal'
     **/
    mappingOfContext: string;

    /**
     * What is the importance of the task? Should be a Spring EL expression.
     * Example:
     *          'VERY_IMPORTANT'
     **/
    mappingOfImportance: string;

}

import {SubscriptionMappingToNotification} from "./subscription-mapping-to-notification.model";
import {PublishStrategy} from "./publish-strategy";

export class NotificationSubscription {

    constructor() {
        this.mappingToNotification = new SubscriptionMappingToNotification();
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
    activationCondition: string;

    /**
     * To which conditions should the data event apply to cancel all earlier notifications with the same flowId.
     * Examples:
     *      true (always)
     *      data['someProperty'] == "bla"
     **/
    cancellationCondition: string;

    mappingToNotification: SubscriptionMappingToNotification;

    publishStrategy: PublishStrategy;

}

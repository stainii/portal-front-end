import {async, inject, TestBed} from '@angular/core/testing';

import {NotificationSubscriptionService} from './notification-subscription.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {HttpClientModule} from "@angular/common/http";
import {NotificationSubscription} from "./notification-subscription.model";

describe('NotificationSubscriptionService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [NotificationSubscriptionService],
            imports: [
                HttpClientModule,
                HttpClientTestingModule
            ]
        });
    });

    it('should be created', inject([NotificationSubscriptionService], (service: NotificationSubscriptionService) => {
        expect(service).toBeTruthy();
    }));

    it("should call the webservice when finding all subscriptions",
        async(
            inject([NotificationSubscriptionService, HttpTestingController], (subscriptionService: NotificationSubscriptionService, backend: HttpTestingController) => {

                subscriptionService.findAll().subscribe();

                backend.expectOne({
                    url: '/api/notifications/api/subscription/',
                    method: 'GET'
                });
            })
        )
    );

    it("should call the webservice when creating a subscription",
        async(
            inject([NotificationSubscriptionService, HttpTestingController], (subscriptionService: NotificationSubscriptionService, backend: HttpTestingController) => {
                let subscription: NotificationSubscription = new NotificationSubscription();
                subscriptionService.create(subscription).subscribe();

                backend.expectOne({
                    url: '/api/notifications/api/subscription/',
                    method: 'POST',
                });
            })
        )
    );

    it("should call the webservice when updating a subscription",
        async(
            inject([NotificationSubscriptionService, HttpTestingController], (subscriptionService: NotificationSubscriptionService, backend: HttpTestingController) => {
                let subscription: NotificationSubscription = new NotificationSubscription();
                subscription.id = 100;
                subscriptionService.update(subscription).subscribe();

                backend.expectOne({
                    url: '/api/notifications/api/subscription/100/',
                    method: 'PUT'
                });
            })
        )
    );
});

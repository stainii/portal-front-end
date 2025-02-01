import {inject, TestBed, waitForAsync} from '@angular/core/testing';

import {NotificationSubscriptionService} from './notification-subscription.service';
import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import {NotificationSubscription} from "./notification-subscription.model";

describe('NotificationSubscriptionService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
    imports: [],
    providers: [NotificationSubscriptionService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    });

    it('should be created', inject([NotificationSubscriptionService], (service: NotificationSubscriptionService) => {
        expect(service).toBeTruthy();
    }));

    it("should call the webservice when finding all subscriptions",
        waitForAsync(
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
        waitForAsync(
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
        waitForAsync(
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

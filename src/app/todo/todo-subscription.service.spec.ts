import {inject, TestBed, waitForAsync} from '@angular/core/testing';

import {TodoSubscriptionService} from './todo-subscription.service';
import {HttpTestingController, provideHttpClientTesting} from "@angular/common/http/testing";
import {provideHttpClient, withInterceptorsFromDi} from "@angular/common/http";
import {TodoSubscription} from "./todo-subscription.model";

describe('TodoSubscriptionService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [],
            providers: [TodoSubscriptionService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
        });
    });

    it('should be created', inject([TodoSubscriptionService], (service: TodoSubscriptionService) => {
        expect(service).toBeTruthy();
    }));

    it("should call the webservice when finding all subscriptions",
        waitForAsync(
            inject([TodoSubscriptionService, HttpTestingController], (subscriptionService: TodoSubscriptionService, backend: HttpTestingController) => {

                subscriptionService.findAll().subscribe();

                backend.expectOne({
                    url: '/api/todo/api/subscription/',
                    method: 'GET'
                });
            })
        )
    );

    it("should call the webservice when creating a subscription",
        waitForAsync(
            inject([TodoSubscriptionService, HttpTestingController], (subscriptionService: TodoSubscriptionService, backend: HttpTestingController) => {
                let subscription: TodoSubscription = new TodoSubscription();
                subscriptionService.create(subscription).subscribe();

                backend.expectOne({
                    url: '/api/todo/api/subscription/',
                    method: 'POST',
                });
            })
        )
    );

    it("should call the webservice when updating a subscription",
        waitForAsync(
            inject([TodoSubscriptionService, HttpTestingController], (subscriptionService: TodoSubscriptionService, backend: HttpTestingController) => {
                let subscription: TodoSubscription = new TodoSubscription();
                subscription.id = 100;
                subscriptionService.update(subscription).subscribe();

                backend.expectOne({
                    url: '/api/todo/api/subscription/100/',
                    method: 'PUT'
                });
            })
        )
    );
});

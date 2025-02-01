import {inject, TestBed, waitForAsync} from '@angular/core/testing';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing';

import {NotificationService} from './notification.service';

describe('NotificationService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [],
            providers: [NotificationService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
        });
    });

    it('should be created', inject([NotificationService], (service: NotificationService) => {
        expect(service).toBeTruthy();
    }));

    it("should call the webservice when finding all notifications",
        waitForAsync(
            inject([NotificationService, HttpTestingController], (notificationService: NotificationService, backend: HttpTestingController) => {
                notificationService.findActiveNotifications().subscribe();

                backend.expectOne({
                    url: '/api/notifications/api/notification/?onlyUnread=true',
                    method: 'GET'
                });
            })
        )
    );

    it("should call the webservice when marking a notification as read",
        waitForAsync(
            inject([NotificationService, HttpTestingController], (notificationService: NotificationService, backend: HttpTestingController) => {

                notificationService.markAsRead(100).subscribe();

                backend.expectOne({
                    url: '/api/notifications/api/notification/100/read/',
                    method: 'PUT'
                });
            })
        )
    );
});

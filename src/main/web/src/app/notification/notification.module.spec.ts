import {NotificationModule} from './notification.module';

describe('NotificationModule', () => {
  let notificationsModule: NotificationModule;

  beforeEach(() => {
    notificationsModule = new NotificationModule();
  });

  it('should create an instance', () => {
    expect(notificationsModule).toBeTruthy();
  });
});

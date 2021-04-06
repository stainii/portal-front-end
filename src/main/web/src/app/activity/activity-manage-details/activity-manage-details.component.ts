import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Activity} from "@app/activity/activity.model";
import {ManageActivitiesService} from "@app/activity/manage-activities.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ErrorService} from "@app/error/error.service";
import {ActivityHelperService} from "@app/activity/activity-helper.service";

@Component({
    selector: 'app-activity-manage-details',
    templateUrl: './activity-manage-details.component.html',
    styleUrls: ['./activity-manage-details.component.scss']
})
export class ActivityManageDetailsComponent implements OnInit {

    activity: Activity;
    private isNew: boolean;

    constructor(private route: ActivatedRoute, private router: Router,
                private manageActivitiesService: ManageActivitiesService,
                private snackBar: MatSnackBar, private errorService: ErrorService,
                private activityHelper: ActivityHelperService) {
    }

    private readonly NO_PHOTO = "assets/activity/no-photo.png";

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            let activityId = params.get("id");

            this.isNew = activityId.toLowerCase() == "new";
            if (this.isNew) {
                this.activity = {
                    dateIntervals: [],
                    description: undefined,
                    id: undefined,
                    labels: [],
                    location: {
                        city: undefined,
                        province: undefined,
                        country: undefined,
                        latitude: undefined,
                        longitude: undefined
                    },
                    weather: {
                        minTemperature: undefined,
                        maxTemperature: undefined,
                        maxCloudiness: undefined,
                        maxRain: undefined,
                        maxSnow: undefined,
                        maxFog: undefined,
                        minWind: undefined,
                        maxWind: undefined,
                    },
                    maxNumberOfParticipants: undefined,
                    minNumberOfParticipants: undefined,
                    name: undefined,
                    photo: this.NO_PHOTO,
                    newPhotoContent: undefined,
                    source: "manual",
                    timeIntervals: []
                };
            } else {
                this.manageActivitiesService.findById(activityId)
                    .subscribe(activity => {
                        this.activity = activity

                        // initialize all objects so they are easily editable
                        if (!this.activity.location) {
                            this.activity.location = {
                                city: undefined,
                                province: undefined,
                                country: undefined,
                                latitude: undefined,
                                longitude: undefined
                            };
                        }
                        if (!this.activity.weather) {
                            this.activity.weather = {
                                minTemperature: undefined,
                                maxTemperature: undefined,
                                maxCloudiness: undefined,
                                maxRain: undefined,
                                maxSnow: undefined,
                                maxFog: undefined,
                                minWind: undefined,
                                maxWind: undefined,
                            };
                        }
                        if (!this.activity.labels) {
                            this.activity.labels = [];
                        }
                        if (!this.activity.dateIntervals) {
                            this.activity.dateIntervals = [];
                        }
                        if (!this.activity.timeIntervals) {
                            this.activity.timeIntervals = [];
                        }
                        if (!this.activity.photo) {
                            this.activity.photo = this.NO_PHOTO;
                        }
                    });
            }
        })
    }

    getBeaufortDescription(value: number) {
        switch (value) {
            case 0:
                return "0 - windstil";
            case 1:
                return "1 - sommige blaadjes bewegen";
            case 2:
                return "2 - voelbaar in gezicht, bladeren ritselen";
            case 3:
                return "3 - bladeren en kleine twijgen bewegen";
            case 4:
                return "4 - kleine takken bewegen";
            case 5:
                return "5 - kleine bomen zwaaien";
            case 6:
                return "6 - grote takken bewegen";
            case 7:
                return "7 - grote bomen bewegen";
            case 8:
                return "8 - stormachig, twijgen breken af";
            case 9:
                return "9 - storm, takken breken af";
            case 10:
                return "10 - storm met ontwortelde bomen";
            case 11:
                return "11 - storm met veel schade";
            case 12:
                return "12 - orkaan";
        }
        return value;
    }

    photoSelected($event) {
        let reader = new FileReader();
        reader.readAsDataURL($event.target.files[0]);
        reader.onload = (_event) => {
            this.activity.newPhotoContent = reader.result;
        }
    }

    save() {
        let subscription;
        if (this.isNew) {
            subscription = this.manageActivitiesService.create(this.activity);
        } else {
            subscription = this.manageActivitiesService.update(this.activity);
        }
        subscription.subscribe(result => {
            this.snackBar.open("Activity saved!", "Have fun!", {
                duration: 5000,
            });
            console.log("Activity saved", result);
            this.router.navigate(["/activity/manage"]);
        }, error => this.errorService.notify(error));
    }

    getPhotoUrl(photo: string) {
        if (!photo) {
            return this.NO_PHOTO;
        }
        return this.activityHelper.getPhotoUrl(photo);
    }
}

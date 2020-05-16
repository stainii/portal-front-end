import {Component, Inject, OnInit} from '@angular/core';
import {Person} from "@app/social/person.model";
import {MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
    selector: 'app-social-person-settings-edit',
    templateUrl: './social-person-settings-edit.component.html',
    styleUrls: ['./social-person-settings-edit.component.scss']
})
export class SocialPersonSettingsEditComponent implements OnInit {

    person: Person;
    image;

    constructor(private _sanitizer: DomSanitizer,
                public dialogRef: MatDialogRef<SocialPersonSettingsEditComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any) {
        this.person = Object.assign({}, data.person);

        if (this.person && this.person.imageName) {
            this.image = this.person.imageName;
        } else {
            this.image = "assets/social/no-photo.jpg";
        }
    }

    ngOnInit(): void {
        if (this.data.$event) {
            const matDialogConfig: MatDialogConfig = new MatDialogConfig();
            const rect = this.getCard(this.data.$event.target).getBoundingClientRect();

            let top = rect.top - 10;
            if (window.innerHeight - 300 < top) {
                top = rect.top - 150;
            }

            matDialogConfig.position = {left: `${rect.left - 25}px`, top: `${top}px`};
            this.dialogRef.updatePosition(matDialogConfig.position);
        }
    }

    fileChanged = ($event) => {
        let reader = new FileReader();
        reader.readAsDataURL($event.target.files[0]);
        reader.onload = (_event) => {
            this.person.newImageContent = reader.result;
            this.image = reader.result;
        }
    }

    delete() {
        console.log("Deleting", this.person);
        this.dialogRef.close({
            type: "DELETE",
            person: this.person
        });
    }

    save() {
        console.log("Saving", this.person);
        this.dialogRef.close({
            type: "SAVE",
            person: this.person
        });
    }

    isNewPerson() {
        return this.person && !!this.person.id;
    }

    private getCard(element: HTMLElement) {
        if (element.classList.contains("card-content")) {
            return element;
        } else {
            return this.getCard(element.parentElement);
        }
    }

    getImageUrl() {
        return this._sanitizer.bypassSecurityTrustStyle(`url('${this.image}')`);
    }
}

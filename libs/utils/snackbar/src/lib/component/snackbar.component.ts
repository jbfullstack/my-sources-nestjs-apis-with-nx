import {Component} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

export enum SnackBarColorEnum {
    Red,
    Green,
    Blue,
    Default
}

/**
 * @title Basic snack-bar
 */
@Component({
    selector: 'ms-snackbar',
    templateUrl: './snackbar.component.html',
    // styleUrls: ['./snackbar.component.scss'],
})
export class SnackBarComponent {

    durationInSeconds = 5;

    constructor(private _snackBar: MatSnackBar) {}

    openDefaultSnackBar(message: string) {
        this._snackBar.open(message, 'OK', {
            duration: this.durationInSeconds * 1000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
            // panelClass: [className],
        });
    }

    openSnackBarError(message: string) {
        this._snackBar.open(message, 'OK', {
            duration: this.durationInSeconds * 1000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
            panelClass: ['red-snackbar'],
        });
    }

    openSnackBar(message: string, btnMessage: string, color: SnackBarColorEnum) {
        const className: string = this.getClassName(color)
        this._snackBar.open(message, btnMessage, {
            duration: this.durationInSeconds * 1000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
            panelClass: [className],
        });
    }

    getClassName(color: SnackBarColorEnum): string {
        switch(color) {
            case SnackBarColorEnum.Red:
                return 'red-snackbar';
            case SnackBarColorEnum.Green:
                return 'green-snackbar';
            case SnackBarColorEnum.Blue:
                return 'blue-snackbar';
            case SnackBarColorEnum.Default:
            default:
                return '';
        }
    }
}
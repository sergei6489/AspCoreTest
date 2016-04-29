﻿///<reference path="./typings/tsd.d.ts" />
import {provide, Directive, forwardRef} from 'angular2/core';
import {Control} from 'angular2/common';
import {NG_VALIDATORS} from 'angular2/common';

function validateEmailFactory() {
    return (c: Control) => {

        return  {
            validateEmail: {
                valid: true
            }
        };
    };
}

@Directive({
    selector: '[validateEmail][ngControl],[validateEmail][ngModel],[validateEmail][ngFormControl]',
    providers: [
        provide(NG_VALIDATORS, {
            useExisting: forwardRef(() => EmailValidator),
            multi: true
        })
    ]
})
export class EmailValidator {

    validator: Function;

    constructor() {
        this.validator = validateEmailFactory();
    }

    validate(c: Control) {
        return this.validator(c);
    }
}

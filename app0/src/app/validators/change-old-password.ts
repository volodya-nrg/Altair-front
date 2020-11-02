import {FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';

export class ChangeOldPassword {
    static PasswordsValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
        let passwordOld = control.get('passwordOld').value;
        let passwordNew = control.get('passwordNew').value;
        let passwordConfirm = control.get('passwordConfirm').value;

        if (passwordOld) {
            passwordOld = passwordOld.trim();
        }
        if (passwordNew) {
            passwordNew = passwordNew.trim();
        }
        if (passwordConfirm) {
            passwordConfirm = passwordConfirm.trim();
        }

        if (!passwordOld && !passwordNew && !passwordConfirm || passwordOld && passwordNew === passwordConfirm) {
            return null;
        }

        return {passwordsError: 'ошибка в паролях'};
    }
}

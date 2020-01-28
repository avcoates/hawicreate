import { Pipe } from '@angular/core';

// tslint:disable-next-line: use-pipe-transform-interface
@Pipe({
    name: 'StringUtilities'
})
export class StringUtilities {
    public static capitalizeFirstLetter(str: string): string {
        const letters = str.split('');
        letters[0] = letters[0].toLocaleUpperCase();
        return letters.join('');
    }

}



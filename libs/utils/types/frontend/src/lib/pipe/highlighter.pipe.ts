import { Pipe, PipeTransform } from '@angular/core';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 | exponentialStrength:10 }}
 *   formats to: 1024
*/
@Pipe({name: 'highlighter'})
export class HighlighterPipe implements PipeTransform {
    transform(value: any, args: any,type:string): unknown {
        if(!args) return value;
        if(type==='full'){
            const re = new RegExp("\\b("+args+"\\b)", 'igm');
            value= value.replace(re, '<i>$1</i>');
        }
        else{
            const re = new RegExp(args, 'igm');
            value= value.replace(re, '<span class="highlighted-text">$&</span>');
        }
    
        return value;
    }
}
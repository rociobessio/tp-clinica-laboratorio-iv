import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatoDni'
})
export class FormatoDniPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return '';
    
    // Elimina cualquier caracter que no sea dígito
    const cleaned = value.replace(/\D/g, '');
    
    // Aplica el formato
    return cleaned.replace(/(\d{2})(\d{3})(\d{3})/, '$1.$2.$3');
  }

}

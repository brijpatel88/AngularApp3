// src/app/pipe/truncate.pipe.ts

import { Pipe, PipeTransform } from '@angular/core';

/*
  This pipe shortens long text and adds "..."
*/
@Pipe({
  name: 'truncate',
  standalone: true
})
export class TruncatePipe implements PipeTransform {

  /*
    value = original text
    limit = max number of characters allowed
  */
  transform(value: string, limit: number = 20): string {
    if (!value) return '';
    if (value.length <= limit) return value;

    return value.substring(0, limit) + '...';
  }
}
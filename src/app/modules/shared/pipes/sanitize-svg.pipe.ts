import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'sanitizeSvg', standalone: true })
export class SanitizeSvgPipe implements PipeTransform {
  transform(svgString: string): string {
    // Replace newlines with a space (or other desired formatting)
    return svgString.replace(/\n/g, ' ');
  }
}

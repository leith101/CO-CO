import { Component } from '@angular/core';
import { TranslationService } from '../../service/translation.service'; 

@Component({
  selector: 'app-test',
  template: `
    <button (click)="translate()">Translate</button>
    <div>{{ translatedText }}</div>
  `
})
export class TestComponent {
  translatedText: string=''

  constructor(private translationService: TranslationService) {}

  translate() {
    const text = 'hello my friends ';
    const sourceLang = 'en';
    const targetLang = 'fr';

    this.translationService.translateText(text, sourceLang, targetLang)
      .subscribe((response: any) => {
        this.translatedText = response?.data?.translations?.[0]?.translatedText || 'Translation not available';
      }, (error) => {
        console.error('Translation error:', error);
      });
  }
}

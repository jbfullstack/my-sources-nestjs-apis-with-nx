import {
  Directive,
  ElementRef,
  HostBinding,
  Input,
  OnChanges,
  SecurityContext,
  SimpleChanges,
} from '@angular/core'
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'

@Directive({
  selector: '[highlight]',
})
export class HighlightDirective implements OnChanges {
    @Input('highlight') searchTerm!: string
    @Input('caseSensitive') caseSensitive = false
    @Input('customClasses') customClasses = ''
    @Input('displayTitle') displayTitle = ''
    @Input('displayContent') displayContent = ''

    @HostBinding('innerHtml')
    content!: string | null
    constructor(private el: ElementRef, private sanitizer: DomSanitizer) {}

    ngOnChanges(changes: SimpleChanges) {
        if (this.el?.nativeElement) {
            if ('searchTerm' in changes || 'caseSensitive' in changes) {
                // let text = (this.el.nativeElement as HTMLElement).textContent
                const text = this.displayContent
                if (this.searchTerm === '') {
                    this.content = this.displayTitle + text
                } else {
                    const regex = new RegExp(
                        this.searchTerm,
                        this.caseSensitive ? 'g' : 'gi'
                    )

                    const newText = (""+text).replace(regex, (match: string) => {
                        return `<mark class="highlight ${this.customClasses}">${match}</mark>`
                    })

                    const sanitzed = this.sanitizer.sanitize(
                        SecurityContext.HTML,
                        newText
                    )
                    this.content = this.displayTitle + ((sanitzed === null) ? '' : sanitzed)
                }
            }
        }
    }
}

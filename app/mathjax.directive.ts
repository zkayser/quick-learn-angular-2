import { Directive, ElementRef, Input, OnChanges, OnInit } from '@angular/core';

@Directive({
  selector: '[MathJax]'
})

export class MathJaxDirective implements OnChanges, OnInit {
  @Input('MathJax') mathString: string;
  
  constructor(private elRef: ElementRef) {
    
  }
  
  ngOnInit() {
    this.elRef.nativeElement.innerHtml = this.mathString;
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, this.elRef.nativeElement]);
  }
  
  ngOnChanges() {
    console.log('>> ngOnChanges');
    this.elRef.nativeElement.innerHtml = this.mathString;
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, this.elRef.nativeElement]);
  }
  
}
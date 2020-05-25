import {Component, OnInit, ViewChild, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import * as Draggabilly from 'draggabilly';
// import * as Unidragger from 'unidragger';
import { fromEvent } from 'rxjs/internal/observable/fromEvent';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  windowWidth:number
  windowHeight:number
  toggleMenu:boolean = false
  switchTab:number = 1
  title = 'website-front'

  goingToPaused:boolean = false
  isPaused:boolean = false
  show:boolean= false
  onWheelTicks = new Array
  scrollY:number = 0
  scroll:string
  inputType: string
  hidden:boolean= false
  loading:boolean = false

  startTime:number
  // remaining:number
  // duration:number = 5
  startVal:number
  endVal:number
  frameVal:number
  countDown:boolean
  // decimalMult = Math.pow(10, 7)
  // callback: (args?: any) => any
  // paused:boolean = false

  mover:number = 36
  enterSideBar:boolean = false
  // starVal:number = 36
  // endVal:number = 0

  @ViewChild('navWheel') navWheel:ElementRef
  @ViewChild('feedWheel') feedWheel:ElementRef
  @ViewChild('sideBar') sideBar:ElementRef
  @ViewChild('draggable') draggable:ElementRef

  @ViewChild('logoRed') logoRed:ElementRef
  @ViewChild('logoC') logoC:ElementRef
  @ViewChild('loaderBg') loaderBg:ElementRef

  constructor(private renderer: Renderer2){}

  ngOnInit() {
    this.windowWidth = window.innerWidth
    this.windowHeight = window.innerHeight

    this.renderer.addClass(document.body, 'noScroll')
    this.show = true
    // get windows width
    fromEvent(window,"resize").subscribe((event:any) =>{
      this.windowWidth = event.target.innerWidth;
      this.windowHeight = event.target.innerHeight;
    })

  }

  ngAfterViewInit(){
    setTimeout((() => {
      this.animateOutLoader()
    }), 3000)
  }

  switchTabFunc($int){
    this.switchTab = $int
  }

  onFunc($e, $t, $n){
    return Math.min($n,Math.max($t,$e))
  }

  hompage(event){
    console.log(event)
  }

  nav($event, $type){
    let t = $event.deltaY
    // 0 =像素,1 =行,2 =页
    let o = $event.deltaMode
    let p = 1 ===o ? 16 : 1
    let $int = this.scrollY + t * p

    let offsetHeight:number,innerHeight:number,el: any
    innerHeight = window.innerHeight

    switch($type){
      case 1:
        offsetHeight = this.feedWheel.nativeElement['offsetHeight']
        el = this.feedWheel.nativeElement
         break;
      case 2:

         break;
      default:
        offsetHeight = this.navWheel.nativeElement['offsetHeight']
        el = this.navWheel.nativeElement
  }

    if ("number" == typeof $int && !isNaN($int)){
      innerHeight >= offsetHeight ? this.scrollY = 0 : void (this.scrollY = this.onFunc($int, 0, offsetHeight - innerHeight))
      el.style.transform = 'translate3d(0px, -'+ this.scrollY.toPrecision(7) + 'px, 0px)'
    }
  }


  animateOutLoader(){
    let t = (this.windowWidth > 768 ? .02 : .04) * this.windowWidth + this.logoRed.nativeElement.getBoundingClientRect().width / 2,
    n = {
        y: this.windowHeight / 2 - t,
        x: this.windowWidth / 2 - t
    }
    this.logoRed.nativeElement.style.transform = "translate3d( -".concat(n.x.toPrecision(7), "px, -").concat(n.y.toPrecision(7), "px, 0 )")
    this.logoC.nativeElement.style.transform = "translate3d( ".concat(n.x.toPrecision(7), "px, ").concat((n.y - 8).toPrecision(7), "px, 0 )")
    this.loaderBg.nativeElement.classList.add("animateOut")

    setTimeout((() => {
      this.init()
    }), 1200)

  }

  init() {
      this.hidden = true
      this.count(this.mover, 0 , 2000)


      let draggieEle = this.draggable.nativeElement
      let draggie = new Draggabilly( draggieEle, {
        axis: 'x'
      });
      draggie.on( 'dragMove', (event, pointer )=>{
         if(draggie.position.x <= this.windowWidth/2) {
           draggie.setPosition(this.windowWidth/2)
           draggie._pointerUp( event.originalEvent, pointer )
         }
        //  px to vw
        this.mover = (this.windowWidth-draggie.position.x)/(this.windowWidth/100)
      })
      draggie.on('dragEnd', ()=>{
        if(this.mover < 25) {
          this.count(this.mover, 0 , 200)
        }else if(this.mover < 36 ) {
          this.count(this.mover, 36 , 200)
        }
     })
  }

  count(start:number, end:number, duration:number) {
    let range = start - end
    let current = start
    let stepTime = Math.abs(Math.floor(duration/ range))/10
    let increment = end > start? 0.1: -0.1
    let countDonw =  end > start? false: true

    let timer = setInterval(()=>{
      current += increment
      this.mover= current

      if(current < end && countDonw) {
        this.mover = 0
        clearInterval(timer)
      }else if(current > end && countDonw == false ) {
        this.mover = end
        clearInterval(timer)
      }
    }, stepTime)
  }
}

/** Animate on screen; keep logical work scheduled when animation frames are suspended. */
export class PresentationScheduler {
 private frame?:number;
 private timer?:ReturnType<typeof setTimeout>;
 private callback?:FrameRequestCallback;
 private painting=false;
 constructor(private readonly visible:()=>boolean){}
 request(callback:FrameRequestCallback){this.cancel();this.callback=callback;this.arm();}
 cancel(){this.clear();this.callback=undefined;}
 refresh(){if(this.callback&&this.painting!==this.canPaint()){this.clear();this.arm();}}
 private canPaint(){return !document.hidden&&this.visible();}
 private clear(){if(this.frame!==undefined)cancelAnimationFrame(this.frame);clearTimeout(this.timer);this.frame=undefined;this.timer=undefined;}
 private arm(){
  this.painting=this.canPaint();
  const run=(now:number)=>{this.frame=undefined;this.timer=undefined;const callback=this.callback;this.callback=undefined;callback?.(now);};
  if(this.painting)this.frame=requestAnimationFrame(run);
  else this.timer=setTimeout(()=>run(performance.now()),50);
 }
}

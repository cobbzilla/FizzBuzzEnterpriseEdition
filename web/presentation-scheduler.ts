/** Animate on screen; keep logical work scheduled when animation frames are suspended. */
export class PresentationScheduler {
 private frame?:number;
 private timer?:ReturnType<typeof setTimeout>;
 private callback?:FrameRequestCallback;
 private painting=false;
 private serial=0;
 constructor(private readonly visible:()=>boolean){}
 request(callback:FrameRequestCallback){this.cancel();this.callback=callback;this.arm();}
 cancel(){this.clear();this.callback=undefined;}
 refresh(){if(this.callback){this.clear();this.arm();}}
 private canPaint(){return !document.hidden&&this.visible();}
 private clear(){this.serial++;if(this.frame!==undefined)cancelAnimationFrame(this.frame);clearTimeout(this.timer);this.frame=undefined;this.timer=undefined;}
 private arm(){
  this.painting=this.canPaint();
  const serial=this.serial;
  const run=(now:number)=>{if(serial!==this.serial)return;this.clear();const callback=this.callback;this.callback=undefined;callback?.(now);};
  if(this.painting)this.frame=requestAnimationFrame(run);
  // A lost animation callback must never become an implicit executive hold.
  this.timer=setTimeout(()=>run(performance.now()),this.painting?100:50);
 }
}

/** Small original stage mechanisms. These illustrate supplied records; they execute no business. */
import {Scene} from '@babylonjs/core/scene';
import {MeshBuilder} from '@babylonjs/core/Meshes/meshBuilder';
import {Mesh} from '@babylonjs/core/Meshes/mesh';
import {TransformNode} from '@babylonjs/core/Meshes/transformNode';
import {StandardMaterial} from '@babylonjs/core/Materials/standardMaterial';
import {DynamicTexture} from '@babylonjs/core/Materials/Textures/dynamicTexture';
import {Color3} from '@babylonjs/core/Maths/math.color';
import type {OfficeCue} from './office-supervision-model';
import {addresses,foundingEstate,layoutToken,type EstateLayout} from './office-layout.ts';

export function createProductionStage(scene:Scene){
 const material=(name:string,hex:string)=>{const m=new StandardMaterial(name,scene);m.diffuseColor=Color3.FromHexString(hex);m.emissiveColor=m.diffuseColor.scale(.12);m.specularColor=Color3.Black();return m;};
 const paper=material('production paper','#fff7e4'),ink=material('production ink','#243e40'),green=material('recorded approval','#368271'),gold=material('observed allocation','#e1af48'),coral=material('unselected route','#c97861'),wood=material('production wood','#bd9162');
 const root=new TransformNode('active production mechanism',scene);
 const groups=new Map<string,TransformNode>();
 const group=(name:string)=>{const g=new TransformNode(name,scene);g.parent=root;groups.set(name,g);return g;};
 const box=(name:string,w:number,h:number,d:number,x:number,y:number,z:number,m:StandardMaterial,parent:TransformNode)=>{const mesh=MeshBuilder.CreateBox(name,{width:w,height:h,depth:d},scene);mesh.position.set(x,y,z);mesh.material=m;mesh.parent=parent;mesh.isPickable=false;return mesh;};
 const cylinder=(name:string,height:number,diameter:number,x:number,y:number,z:number,m:StandardMaterial,parent:TransformNode)=>{const mesh=MeshBuilder.CreateCylinder(name,{height,diameter,tessellation:16},scene);mesh.position.set(x,y,z);mesh.material=m;mesh.parent=parent;mesh.isPickable=false;return mesh;};
 const label=(name:string,w:number,h:number,parent:TransformNode)=>{const texture=new DynamicTexture(name,{width:768,height:384},scene,false);const m=material(name,'#fff7e4');m.diffuseTexture=texture;m.emissiveTexture=texture;m.disableLighting=true;const mesh=MeshBuilder.CreatePlane(name,{width:w,height:h,sideOrientation:Mesh.DOUBLESIDE},scene);mesh.material=m;mesh.parent=parent;mesh.isPickable=false;return {mesh,texture};};
 const write=(texture:DynamicTexture,lines:readonly string[],background='#fff7e4',color='#243e40',primary=55)=>{const c=texture.getContext() as CanvasRenderingContext2D;c.fillStyle=background;c.fillRect(0,0,768,384);c.fillStyle=color;c.textAlign='center';for(let i=0;i<lines.length;i++){c.font=(i===0?'bold '+primary:'43')+'px sans-serif';const line=lines[i].length>42?lines[i].slice(0,39)+'…':lines[i];c.fillText(line,384,(primary>100?200:110)+i*100,728);}texture.update();};
 const writeGlyph=(texture:DynamicTexture,character:string,caption:string)=>{const c=texture.getContext() as CanvasRenderingContext2D;c.fillStyle='#fff7e4';c.fillRect(0,0,768,384);c.fillStyle='#243e40';c.textAlign='center';c.font='bold 250px sans-serif';c.fillText(character,384,265,700);c.font='55px sans-serif';c.fillText(caption,384,350,700);texture.update();};

 const document=group('recorded working paper');
 const documentFace=label('current supplied record',1.65,.83,document);documentFace.mesh.position.y=1.18;documentFace.mesh.billboardMode=Mesh.BILLBOARDMODE_ALL;
 const documentClip=box('brass document clip',.35,.06,.08,0,1.64,0,gold,document);

 const recruitment=group('seven office approval panel');
 box('authority panel',1.7,.08,.6,0,.88,0,wood,recruitment);
 const lamps=Array.from({length:7},(_,i)=>cylinder('recruitment office '+(i+1),.12,.15,-.66+i*.22,.98,0,coral,recruitment));
 const badge=label('commencement badge',.8,.45,recruitment);badge.mesh.position.set(0,1.4,0);badge.mesh.billboardMode=Mesh.BILLBOARDMODE_ALL;

 const boundary=group('independent boundary votes');
 const gate=box('quorum gate',1.75,.12,.12,0,1.35,0,coral,boundary);for(const x of [-.9,.9])box('quorum post',.12,1.4,.12,x,.7,0,wood,boundary);
 const votes=[-.48,.48].map(x=>cylinder('independent vote',.16,.25,x,.88,-.25,coral,boundary));
 const voteFace=label('quorum voting receipt',1.55,.65,boundary);voteFace.mesh.position.set(0,1.92,0);voteFace.mesh.billboardMode=Mesh.BILLBOARDMODE_ALL;

 const property=group('request-bound vacant estate');
 const frame:Mesh[]=[];for(const x of [-.64,.64])for(const z of [-.43,.43])frame.push(box('lease corner',.055,1.3,.055,x,.73,z,gold,property));
 for(const z of [-.43,.43])frame.push(box('lease lintel',1.34,.055,.055,0,1.4,z,gold,property));
 const tenant=label('identified hidden occupant',.95,.52,property);tenant.mesh.position.set(0,.95,0);tenant.mesh.billboardMode=Mesh.BILLBOARDMODE_ALL;
 const lease=label('single use lease',.95,.4,property);lease.mesh.position.set(0,1.65,0);lease.mesh.billboardMode=Mesh.BILLBOARDMODE_ALL;
 const inspection=MeshBuilder.CreateTorus('vacancy inspection lens',{diameter:.7,thickness:.065,tessellation:20},scene);inspection.material=gold;inspection.parent=property;inspection.isPickable=false;inspection.rotation.x=Math.PI/2;

 const procurement=group('position-specific glyph receiving');
 box('glyph receiving tray',1.7,.06,.5,0,.97,0,ink,procurement);
 const glyphs=Array.from({length:8},(_,i)=>{const p=label('allocation position '+(i+1),.19,.28,procurement);p.mesh.position.set(-.7+i*.2,1.16,-.08);return p;});
 const parcel=box('one independently received allocation',.34,.32,.34,-1.3,1.18,-.25,gold,procurement);
 const parcelFace=label('incoming glyph',.29,.25,procurement);parcelFace.mesh.position.set(-1.3,1.2,-.43);
 const receivingStamp=cylinder('independent receiving stamp',.18,.25,0,1.8,0,green,procurement);

 const notary=group('independent lexical examination');
 const specimen=label('notarial specimen',1.2,.55,notary);specimen.mesh.position.y=.98;specimen.mesh.billboardMode=Mesh.BILLBOARDMODE_ALL;
 const lens=MeshBuilder.CreateTorus('moving notarial lens',{diameter:.65,thickness:.075,tessellation:24},scene);lens.parent=notary;lens.material=gold;lens.isPickable=false;lens.rotation.x=Math.PI/2;
 const seal=cylinder('notarial certification seal',.08,.45,.6,.8,-.2,green,notary);

 const printer=group('complete line print carriage');
 const printed=label('authorized printed line',.85,.5,printer);printed.mesh.rotation.x=Math.PI/2;printed.mesh.position.set(0,.8,-.8);
 const triangle=MeshBuilder.CreateDisc('one authorized celebratory triangle',{radius:.15,tessellation:3,sideOrientation:Mesh.DOUBLESIDE},scene);triangle.parent=printer;triangle.material=coral;triangle.isPickable=false;

 const audit=group('hash linked audit ledger');
 for(const x of [-.43,.43]){const page=box('audit folio',.8,.05,.65,x,.95,0,paper,audit);page.rotation.z=x<0?.06:-.06;}
 box('audit binding',.07,.1,.72,0,.99,0,wood,audit);
 const auditFace=label('supplied audit digest',1.6,.6,audit);auditFace.mesh.position.set(0,1.45,0);auditFace.mesh.billboardMode=Mesh.BILLBOARDMODE_ALL;
 const links=Array.from({length:5},(_,i)=>{const ring=MeshBuilder.CreateTorus('audit chain link '+i,{diameter:.18,thickness:.045,tessellation:12},scene);ring.parent=audit;ring.material=gold;ring.position.set(-.4+i*.2,1.02,-.45);ring.rotation.x=Math.PI/2;ring.isPickable=false;return ring;});

 const queue=group('audit mailbox transport');
 const envelope=box('queued message',.45,.32,.08,-.65,.98,0,paper,queue);
 for(const x of [-.7,.7])box('mailbox station',.45,.4,.55,x,.79,.15,green,queue);
 const queueFace=label('enqueue receipt',1.5,.5,queue);queueFace.mesh.position.set(0,1.55,0);queueFace.mesh.billboardMode=Mesh.BILLBOARDMODE_ALL;

 const memory=group('institutional memory handover');
 box('retained folder',1.25,.55,.55,0,.95,0,green,memory);
 const retained=label('retained result copy',1.2,.63,memory);retained.mesh.position.set(0,1.48,0);retained.mesh.billboardMode=Mesh.BILLBOARDMODE_ALL;
 const archiveSheet=box('reissued existing sheet',.8,.025,.5,0,1.25,-.2,paper,memory);

 const wiring=group('swappable assembly graph');
 const components=[-.65,0,.65].map((x,i)=>{const part=box('swappable component '+i,.5,.45,.4,x,1.12,0,[green,gold,coral][i],wiring);const title=label('component socket '+i,.47,.25,part);title.mesh.position.set(0,.04,-.215);write(title.texture,[['CONTEXT','STRATEGY','PRINTER'][i]],undefined,undefined,95);return part;});
 for(const x of [-.33,.33])box('bound interface',.23,.06,.06,x,1.12,0,ink,wiring);
 const routing=group('certified printer routing');
 const routingLamps=[-.65,0,.65].map((x,i)=>{box('printer route tray '+i,.56,.1,.4,x,.98,0,wood,routing);const title=label('printer route '+i,.54,.35,routing);title.mesh.position.set(x,1.28,0);title.mesh.billboardMode=Mesh.BILLBOARDMODE_ALL;write(title.texture,[['Fizz','Buzz','123'][i]],undefined,undefined,150);return cylinder('printer admission '+i,.12,.18,x,1.07,-.15,coral,routing);});
 const fragment=group('authorized fragment staging');
 const roller=cylinder('staging roller',1.3,.18,0,1.1,0,ink,fragment);roller.rotation.z=Math.PI/2;
 const fragmentFace=label('literal staged fragment',1.3,.65,fragment);fragmentFace.mesh.position.set(0,1.75,0);fragmentFace.mesh.billboardMode=Mesh.BILLBOARDMODE_ALL;

 const transaction=group('atomic custody frame');
 const brackets:Mesh[]=[];for(const x of [-.7,.7])for(const z of [-.4,.4])brackets.push(box('transaction boundary',.08,1.2,.08,x,.7,z,green,transaction));
 const lock=box('custody latch',.42,.25,.14,0,1.35,-.45,gold,transaction);
 let currentId='',currentOrdinal='',shownGlyphs=0,visualKey='';const glyphSignatures:string[]=[];
 const setGroups=(...names:string[])=>{for(const [name,g]of groups){const enabled=names.includes(name);if(g.isEnabled(false)!==enabled)g.setEnabled(enabled);}};
 const short=(value:string)=>value.length>20?value.slice(0,9)+'…'+value.slice(-6):value;

 function update(cue:OfficeCue,layout:EstateLayout=foundingEstate){
  const {step,work,travel}=cue,{action,event,shot}=step;
  const key=step.id+'|'+work+'|'+travel+'|'+layoutToken(layout);if(key===visualKey)return;visualKey=key;
  const book=addresses(layout),station=book.resolve({room:shot.room,station:shot.anchor});
  root.position.set(station.x,0,station.z);root.rotation.y=book.placement(shot.room).yaw;
  if(currentOrdinal!==step.ordinal){currentOrdinal=step.ordinal;shownGlyphs=0;glyphSignatures.length=0;for(const g of glyphs)g.mesh.setEnabled(false);}
  if(currentId!==step.id){
   currentId=step.id;
   if(action==='paper')write(documentFace.texture,[short(step.ordinal)||'MANDATE',event.office,event.kind.replaceAll('_',' ')]);
   if(action==='recruit')write(badge.texture,['ORDINAL '+short(step.ordinal||'1'),event.kind.includes('NOT_REACHED')?'NOT REACHED':'OFFICE '+(step.hrIndex+1)],undefined,undefined,95);
   if(action==='boundary'||action==='succession'){
    const pre=event.finding.match(/Pre-boundary vote: (PERMIT|WITHHOLD)/)?.[1]||'RECORDED',at=event.finding.match(/at-boundary vote: (PERMIT|WITHHOLD)/i)?.[1]||'RECORDED';
    const successor=event.finding.match(/(?:certified successor|successor) (\d+)/i)?.[1]||event.finding.match(/Advanced exactly from \d+ to (\d+)/)?.[1];
    write(voteFace.texture,action==='succession'?['SUCCESSION',short(step.ordinal)+' → '+short(successor||'?')]:['COUNTER '+short(step.ordinal),pre+' / '+at],undefined,undefined,90);
    votes[0].material=pre==='PERMIT'?green:coral;votes[1].material=at==='PERMIT'?green:coral;
   }
   if(['allocate','survey','evict','lease','release'].includes(action)){
    const occupant=step.tenantCode||event.finding.match(/U\+[A-Fa-f0-9]{4,6}/)?.[0];write(tenant.texture,[occupant||(action==='evict'?'OCCUPANT':'EMPTY'),occupant?'IDENTIFIED TENANT':action==='evict'?'REPORTED OCCUPANT':'SURVEYED PREMISES'],undefined,undefined,95);
    write(lease.texture,[action==='release'?'LEASE RELEASE':'REQUEST-BOUND LEASE',short(step.ordinal)]);
   }
   if(['requisition','deliver','glyph','assemble','fragment'].includes(action)){
    for(const [i,g]of glyphs.entries()){const receipt=step.glyphs[i],signature=receipt?.product+':'+receipt?.position;if(receipt&&glyphSignatures[i]!==signature){writeGlyph(g.texture,receipt.character,receipt.product+' #'+receipt.position);glyphSignatures[i]=signature;}}
    if(action!=='fragment'){const last=action==='glyph'?step.glyphs.at(-1):undefined,quantity=event.finding.match(/Delivered (\d+) allocations/)?.[1];writeGlyph(parcelFace.texture,last?.character||quantity||'PO',last?String(last.position):'ORDER');}
   }
   if(action==='fragment'){const literal=event.document??step.text,newline=literal==='\n'||literal==='\r\n';write(fragmentFace.texture,[newline?'↵':short(literal),newline?'LINE FEED U+000A':'STAGED FRAGMENT'],undefined,undefined,150);}
   if(action==='notarize')write(specimen.texture,[short(step.text)||'SUPPLIED SPECIMEN','INDEPENDENT CHECK'],undefined,undefined,130);
   if(action==='print')write(printed.texture,[short(step.text)||'OBSERVED TEXT',short(step.ordinal)],undefined,undefined,150);
   if(action==='audit'){const digest=event.document?.match(/digest ([a-f0-9]+)/)?.[1];write(auditFace.texture,['AUDIT '+(event.document?.match(/Sequence (\d+)/)?.[1]||short(step.ordinal)),digest?digest.slice(0,12)+'…':'RECORDED CUSTODY']);}
   if(action==='queue')write(queueFace.texture,['AUDIT MAILBOX','ENQUEUED ≠ ACKNOWLEDGED']);
   if(action==='memory')write(retained.texture,[short(step.text)|| (event.kind.includes('MISS')?'MISS':'REUSE PETITION'),step.text?'NO FRESH PRODUCTION':'RECORDED CACHE PROCEEDINGS'],undefined,undefined,130);
  }
  const active=action==='wire'?'swappable assembly graph':action==='classify'?'certified printer routing':action==='fragment'?'authorized fragment staging':action==='recruit'?'seven office approval panel':action==='boundary'||action==='succession'?'independent boundary votes':['allocate','survey','evict','lease','release'].includes(action)?'request-bound vacant estate':['requisition','deliver','glyph','assemble'].includes(action)?'position-specific glyph receiving':action==='notarize'?'independent lexical examination':action==='print'?'complete line print carriage':action==='audit'?'hash linked audit ledger':action==='queue'?'audit mailbox transport':action==='memory'?'institutional memory handover':['commit','cleanup'].includes(action)?'atomic custody frame':'recorded working paper';
  setGroups(active,...(action==='fragment'&&shot.room==='procurement'?['position-specific glyph receiving']:[]));
  document.position.y=.07*Math.sin(work*Math.PI);documentClip.rotation.z=.15*Math.sin(work*Math.PI);
  lamps.forEach((lamp,i)=>{const status=step.hrStates[i];lamp.material=status==='APPROVED'&&(i!==step.hrIndex||work>.55)?green:status==='REJECTED'?coral:status==='NOT_REACHED'?ink:gold;});
  const permitted=event.finding.includes('PERMIT');gate.position.y=permitted?1.35+work*.8:1.8-work*.45;gate.setEnabled(action!=='succession');votes.forEach(v=>v.setEnabled(action!=='succession'));
  inspection.position.set(-.3+.6*work,1.25,.1);inspection.scaling.setAll(1+.1*Math.sin(work*Math.PI));
  tenant.mesh.setEnabled(action==='survey'&&event.kind==='PREMISES_DISCOVERY'||action==='evict'&&!event.kind.includes('NOT_REQUIRED'));
  tenant.mesh.position.x=action==='evict'?work*1.3:0;tenant.mesh.position.y=.95+Math.sin(work*Math.PI)*.2;tenant.mesh.visibility=action==='evict'?1-work:1;
  frame.forEach(m=>m.material=action==='lease'||action==='release'?green:gold);lease.mesh.scaling.setAll(.8+.2*work);property.scaling.setAll(action==='release'?1-work*.15:1);
  const receiving=action==='glyph';const accepted=Math.max(0,step.glyphs.length-(receiving&&work<.65?1:0));shownGlyphs=Math.max(shownGlyphs,accepted);glyphs.forEach((g,i)=>g.mesh.setEnabled(i<shownGlyphs));
  parcel.setEnabled(action==='deliver'||receiving||action==='requisition');parcel.position.x=-1.3+1.3*work;parcel.position.y=1.18+.14*Math.sin(work*Math.PI);parcelFace.mesh.position.x=parcel.position.x;parcelFace.mesh.position.y=parcel.position.y;parcelFace.mesh.setEnabled(parcel.isEnabled());
  receivingStamp.setEnabled(receiving);receivingStamp.position.x=-.7+Math.max(0,step.glyphs.length-1)*.2;receivingStamp.position.y=1.75-.45*Math.sin(work*Math.PI);
  lens.position.set(-.4+.8*work,1.45,0);seal.scaling.setAll(.25+.75*work);
  printed.mesh.position.z=-.35-.8*work;printed.mesh.scaling.y=.1+.9*work;printed.mesh.rotation.x=Math.PI/2*(1-work*.7);printed.mesh.rotation.y=layout.edition===0&&book.placement(shot.room).position.z>0?Math.PI:0;
  triangle.position.set(.3+work*.4,1.3+Math.sin(work*Math.PI)*.6,-.4);triangle.rotation.z=work*3;triangle.setEnabled(work>.7);
  links.forEach((link,i)=>link.setEnabled(i<4||work>.65));auditFace.mesh.scaling.setAll(.92+.08*work);
  envelope.position.x=-.65+1.3*work;envelope.position.y=.98+.1*Math.sin(work*Math.PI);
  archiveSheet.position.z=-.2-.6*work;
  components.forEach((component,i)=>component.position.x=(i-1)*(.65+(1-work)*.6));
  const selected=event.finding.includes('FizzStringPrinter')?0:event.finding.includes('BuzzStringPrinter')?1:event.finding.includes('Integer')?2:-1;
  routingLamps.forEach((lamp,i)=>{lamp.material=i===selected&&work>.5?(event.finding.includes('declined')?coral:green):gold;});roller.rotation.x=work*Math.PI*4;fragmentFace.mesh.position.y=1.55+.2*work;
  const closed=action==='commit';brackets.forEach((m,i)=>m.scaling.y=closed?.6+.4*work:1-.6*work);lock.position.y=closed?1.65-.3*work:1.35+.3*work;
  root.setEnabled(travel>=.85);
 }
 return {update,hide(){root.setEnabled(false);},dispose(){root.dispose(false,true);}};
}

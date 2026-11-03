import type {RoomId} from './office-content.ts';
import type {RouteStep} from './office-model.ts';
export interface OfficeSceneState {room:RoomId;route:readonly RouteStep[];ordinal:string;text:string;emoji?:string;companionName?:string;paused:boolean;reducedMotion:boolean;quality:'standard'|'economy';seed:number}
export interface OfficeRenderer {update(state:OfficeSceneState):void;selectRoom(room:RoomId):void;overview():void;walk(room:RoomId):void;move(direction:'forward'|'back'|'left'|'right'):void;zoom(direction:number):void;react(prop:string,action:number):void;seek(index:number):void;active(value:boolean):void;resize():void;dispose():void}
export interface OfficeRendererOptions {canvas:HTMLCanvasElement;state:OfficeSceneState;onRoom:(room:RoomId)=>void;onProp:(room:RoomId,prop:string)=>void;onStep:(index:number)=>void;onView:(view:'overview'|'walk')=>void;onReady:()=>void;onProblem:(message:string)=>void}

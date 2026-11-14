import {test} from 'node:test';
import {build} from 'esbuild';
import {mkdtemp,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {pathToFileURL} from 'node:url';
test('all personalities, phases, relocated estates and reduced motion retain fixed renderer resources',async()=>{
 const folder=await mkdtemp(join(tmpdir(),'slopbuzz-flight-geometry-'));
 try{const outfile=join(folder,'fixture.mjs');await build({entryPoints:['scripts/office-flight-render.fixture.ts'],outfile,bundle:true,platform:'node',format:'esm',logLevel:'silent'});const fixture=await import(pathToFileURL(outfile).href);fixture.verifyRenderInventory();}finally{await rm(folder,{recursive:true,force:true});}
});

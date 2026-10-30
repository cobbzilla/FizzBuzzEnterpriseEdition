import {execFileSync} from 'node:child_process';
import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
/** Bind evidence to every repository input, including newly added sources. */
export async function sourceIdentity(): Promise<string> {
  const paths=execFileSync('git',['ls-files','-z','--cached','--others','--exclude-standard'],{encoding:'utf8'}).split('\0').filter(path=>path && path!=='DIRECTIVE.md' && path!=='DIRECTIVE.md~');
  const hash=createHash('sha256');
  for(const path of [...new Set(paths)].sort()) {
    try {hash.update(path).update('\0').update(await readFile(path)).update('\0');}
    catch(error) {if((error as NodeJS.ErrnoException).code!=='ENOENT')throw error;}
  }
  return hash.digest('hex');
}

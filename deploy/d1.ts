/** Structural subset shared by Cloudflare D1, local Miniflare and the repository. */
export interface SQLResult<T=Record<string,unknown>> {results:T[];meta:{changes:number};success:boolean}
export interface SQLStatement {
 bind(...values:(string|number|null)[]):SQLStatement;
 first<T=Record<string,unknown>>(column?:string):Promise<T|null>;
 all<T=Record<string,unknown>>():Promise<SQLResult<T>>;
 run<T=Record<string,unknown>>():Promise<SQLResult<T>>;
}
export interface SQLDatabase {prepare(sql:string):SQLStatement;batch<T=Record<string,unknown>>(statements:SQLStatement[]):Promise<SQLResult<T>[]>}
export interface LeaderboardDatabase extends SQLDatabase {withSession(constraint:'first-primary'):SQLDatabase}

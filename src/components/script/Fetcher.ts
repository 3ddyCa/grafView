export {Fetcher};

	/** 
	@param {obect} Fetcher;
	@param {string} Fetcher.header;
	@param {string} Fetcher.url;
	*/

class Fetcher{

	constructor(
        url:string, 
        suffix:string="",header:array = {
			method : "GET", 
			mode: "cors"
		}){

		this.header = header;
		this.url = url;
        this.suffix = suffix;
	}
}

/** 
@param {string} type;
@return {object};
*/

Fetcher.prototype.setHeader = function(input){
    this.header = input;
    return this;
}

/** 
@param {obect} Fetcher;
@return {string};
*/

Fetcher.prototype.getHeader = function(){
    return this.header;
}

/** 
@param {string} type;
@return {object};
*/

Fetcher.prototype.setResult = function(result:array){
    this.result = result;
    return this;
}

/** 
@param {obect} Fetcher;
@return {string};
*/

Fetcher.prototype.getResult = function():array{
    return this.result;
}

/** 
@param {obect} Fetcher;
@param {int} id;
@param {string} type;
@return {object};
*/


Fetcher.prototype.read = async function(url:string = this.url, suffix:string= this.suffix, header:array=this.header ){
	try{
		let response;
		
			//==FETCH TOUTES LES ENTREES
		response = await fetch(url ,this.header);
		this.setResult(await response.json());
		// const result = Promise.resolve(ruff);
		if(LOGS){
			console.log("fetched : ",this.getResult());
		}
		return this;
	}catch(e){
		console.error("Error with fetch : ",e);
	}
}


const  fs=require("fs"),
 	   readFiles=require("./utils/readfiles.js"),
	   sep = require("path").sep; 
var reader=function(dir,callback){
	readFiles(dir,null,true,function(files){
		if(!files||files.length==0){
			callback({});
		}

		files=files.filter(function(item){
		 	return  typeof item ==="object";
		}); 
		callback(files);
	},{})
}

var readDirFiles=function(sdir){
	return  new Promise(function(resolve,reject){
				reader(sdir,function(files){
					resolve(files);
				})
			})
}
 
var composeFiles=function(sfiles,tfiles){
	if(!sfiles||!tfiles){
		return !sfiles?tfiles:sfiles;
	} 
	
	for(var index in sfiles){
		var tfile=tfiles[index];
		var sfile=sfiles[index];
		if(tfile&&tfile.mtime>sfile.mtime){  
			sfiles[index]["Tpath"]=tfile.path;
		}
	}
	 
	return sfiles;
}

var copyFiles=function(srcFiles){

	for(var index in srcFiles){
		var file=srcFiles[index];
		if(file.Tpath){
			fs.createReadStream(file.Tpath).pipe(fs.createWriteStream(file.path));
		} 
	} 
	console.log("Success");
}
 
///按照文件名和修改时间进行替换 npath-》spath（无论npath 中文件在哪个路径下）
///spath:原始文件路径  npath :变更文件路径 
module.exports=function(spath,npath){ 
	Promise.all([
				readDirFiles(spath), 
				readDirFiles(npath)
			]).then(function(result){ 
				copyFiles(composeFiles(result[0][0],result[1][0]));
			})
}
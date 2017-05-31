var cache= Object.create({}, { 
  db: {
    configurable: false,
    get 		: function(key) { 
    	if(!key||!this[key]){
    		return this; 
    	}else{
    		return this[key]; 
    	} 
    },
    set 		: function(value) { 
    	this[value.key]=value.value;
 	}
}});
  
module.exports={
	cache 		:cache,
	exist		:function(key){
		return !!cache.db[key];
	}
};
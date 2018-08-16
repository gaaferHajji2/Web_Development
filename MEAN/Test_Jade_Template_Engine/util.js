module.exports = (stylus, nib, str, path)=>{
	function(str, path){
		return stylus(str).set('filename', path).use(nib());
	}
}

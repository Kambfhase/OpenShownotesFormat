jQuery.get("valid.osf", function( file){
    test( "Test the parser for valid files", function(){
        var res = parse(file);
        equal( res.filter(function(obj){return !obj.valid;}).length , 0, "Some invalid lines!");
        
    });    
}, "html").fail(console.error);

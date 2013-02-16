function parse( osf){
    
    var rUnixTimestamp = /^\d{10}/,
        rTimestamp      = /^(\d+:)?\d\d:\d\d(\.\d\d\d)?/,
        rIndentation    = /^-+/,
        rTags           = /(#\S+\s+)*#\S+\s*$/,
        rLink           = /^<([^>#\s]*)>/,
        rText           = /^([^<#]|\\#|\\<)*/,
        rNBrWhitespace  = /(\s+)/;

    return osf.split("\n").map(function(line, lineIndex){
        var ret = {
                line : line,
                lineNumber : lineIndex + 1,
                valid: false
            }, match, 
            rest = line,
            length = line.length,
            pos = -1; // the last valid position
            
        // A blank line is valid.
        if( line.trim() === ""){
            ret.valid = true;
            return ret;
        }
        
        // A line can begin with a Unix timestamp, a regular timestamp or -, --, etc.
        // or it can have no particular beginning at all and start with text right away.
        if( match = rUnixTimestamp.exec( rest)){
            ret.unixTimestamp = match[0];
        } else if( match = rTimestamp.exec( rest)){
            ret.timestamp = match[0];
        } else if( match = rIndentation.exec( rest)){
            ret.indentation = match[0];
        }
        
        // The line has a special beginning.
        if( match){
            // forward
            rest = rest.substr( match[0].length);
        }
        
        // A line does not have to contain text
        if( rest.trim() === ""){
            ret.valid = true;
            return ret;
        }
        
        // If the line contains characters besides the beginning, these have to be seperated by whitespace.
        if( match && !rNBrWhitespace.test( rest[0])){
            ret.error = "Missing whitespace between beginning and the next token.";
            return ret;
        }
        rest = rest.trimLeft();
        
        // The text can be any sequence of characters, as long as # and < are escaped with a \.
        if( match = rText.exec( rest)){
            ret.Text = match[0].trimRight();
            rest = rest.substr( match[0].length);
        }
        
        // A line does not have to contain a link or tags
        if( rest.trim() === ""){
            ret.valid = true;
            return ret;
        }
        
        // If the line contains characters after the text, whitespace has to follow.
        if( match && !rNBrWhitespace.test( match[0].substr(-1))){
            ret.error = "Missing whitespace between the text and the next token.\n";
            return ret;
        }
        rest = rest.trimLeft();
        
        // Look for a link
        if( match = rLink.exec( rest)){
            ret.link = match[1];
            rest = rest.substr( match[0].length);
        }
        
        // No need for tags
        if( rest.trim() === ""){
            ret.valid = true;
            return ret;
        }
        
        // If the line contains characters after the link, whitespace has to follow.
        if( match && !rNBrWhitespace.test( rest[0])){
            ret.error = "Missing whitespace between the link and the tags.\n";
            return ret;
        }
        rest = rest.trimLeft();
        
        if( match = rTags.exec( rest)){
            ret.tags = match[0];
            rest = rest.substr( match[0].length);
        }
        
        if( rest.trim() === ""){
            ret.valid = true;
        }
        
        // If there is anything after the tags, this line is invalid.
       
        return ret;
    });
}

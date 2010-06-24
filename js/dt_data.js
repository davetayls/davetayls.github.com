if (typeof(dt) == 'undefined') { var dt = new Object(); }
dt.xml = {};

dt.xml.loadDoc = function(fname) {
	try {
		var xmlDoc;
		// code for IE
		if (window.ActiveXObject) {
			xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
			xmlDoc.async = false;
			xmlDoc.load(fname);
			return (xmlDoc);
		}
		// code for Mozilla, Firefox, Opera, etc.
		else if (window.XMLHttpRequest) {
			xmlDoc = new window.XMLHttpRequest();

			xmlDoc.open("GET", fname, false)
			xmlDoc.send("")
			return xmlDoc.responseXML;
		}
		else {
			throw new dt.eh.Exception('Your browser cannot handle this script');
		}
	} catch (e) {
		dt.eh.logError(e);
	}
}
dt.xml.xslTransform = function(xml, xsl) {
    // code for IE
    if (window.ActiveXObject) {
        ex = xml.transformNode(xsl);
		ex.textContent = ex;
        return ex;
    }
    // code for Mozilla, Firefox, Opera, etc.
    else if (document.implementation  && document.implementation.createDocument) {
        xsltProcessor = new XSLTProcessor();
        xsltProcessor.importStylesheet(xsl);
        resultDocument = xsltProcessor.transformToFragment(xml, document);
        return resultDocument;
    }
}
dt.xml.xslTransformToString = function(xml, xsl) {
	var transform = this.xslTransform(xml,xsl);
	if (transform.textContent){
		return transform.textContent;
	}
	return transform	
}

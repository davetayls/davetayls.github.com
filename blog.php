 <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>David Taylor - Graphic Designer, Web Developer</title>
    <meta http-equiv="Content-Type" content="text/html;charset=iso-8859-1" />
    <link rel="shortcut icon" href="http://www.the-taylors.org/favicon.ico" />
    <link rel="bookmark icon" href="http://www.the-taylors.org/favicon.ico" />
    <link rel="icon" type="image/ico" href="http://www.the-taylors.org/favicon.ico" />

    <script type="text/javascript" src="js/jquery-1.3.1.min.js"></script>
    <script type="text/javascript" src="js/dt.js"></script>
    <script type="text/javascript">
   /*
    $(document).ready(function() {
		var blog = dt.xml.loadDoc("xml/feed.xml");
		var xsl = dt.xml.loadDoc("xml/rss.xsl")
		var render = dt.xml.xslTransformToString(blog,xsl);
		$("#blog").html(render);
    });
*/
    </script>
</head>
<body>

<div id="blog">
<?php

   $xslDoc = new DOMDocument();
   $xslDoc->load("xml/list-blogs.xsl");

   $xmlDoc = new DOMDocument();
   $xmlDoc->load("http://davidjtaylor.wordpress.com/feed/");

   $proc = new XSLTProcessor();
   $proc->importStylesheet($xslDoc);
   echo $proc->transformToXML($xmlDoc);

?>
 	
</div>

</body>
</html>

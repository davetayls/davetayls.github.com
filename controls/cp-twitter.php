<?php

   $xslDoc = new DOMDocument();
   $xslDoc->load("/home/dtayls/public_html/xsl/cp-twitter.xsl");

   $xmlDoc = new DOMDocument();
   $xmlDoc->load("http://twitter.com/statuses/user_timeline/58500480.rss");

   $proc = new XSLTProcessor();
   $proc->importStylesheet($xslDoc);
   echo $proc->transformToXML($xmlDoc);

?>						

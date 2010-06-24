<?xml version="1.0" encoding="iso-8859-1"?>
<xsl:stylesheet version="1.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:content="http://purl.org/rss/1.0/modules/content/"
>
<xsl:template match="/">
	<ul class="list-blogs">
      <xsl:for-each select="rss/channel/item">
		<li class="cc">
			<h4 class="list-blogs-date">
				<abbr title="December">
					<xsl:value-of select="substring(./pubDate,9,3)"></xsl:value-of>
				</abbr>
				<span> <xsl:value-of select="substring(./pubDate,6,2)"></xsl:value-of> </span> 
			</h4>
			<p><a href="{link}"><xsl:value-of select="title"/></a></p>
		</li>
      </xsl:for-each>
	</ul>
</xsl:template>
</xsl:stylesheet>
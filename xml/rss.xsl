<?xml version="1.0" encoding="iso-8859-1"?>
<xsl:stylesheet version="1.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:content="http://purl.org/rss/1.0/modules/content/"
>
<xsl:template match="/">
    <div id="content">
      <xsl:for-each select="rss/channel/item">
      <div class="article">
        <h2><a href="{link}" rel="bookmark"><xsl:value-of select="title"/></a></h2>
        <xsl:value-of select="content:encoded"  disable-output-escaping="yes" />
      </div>
      </xsl:for-each>
    </div>
</xsl:template>
</xsl:stylesheet>
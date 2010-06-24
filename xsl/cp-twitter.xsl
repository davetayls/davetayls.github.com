<?xml version="1.0" encoding="iso-8859-1"?>
<xsl:stylesheet version="1.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:content="http://purl.org/rss/1.0/modules/content/"
>
<xsl:template match="/">
	<ul class="cp-twitter">
	
      <xsl:call-template name="entry">
          <xsl:with-param name="CurrentItem" select="rss/channel/item[1]"></xsl:with-param>
      </xsl:call-template>
      <xsl:call-template name="entry">
          <xsl:with-param name="CurrentItem" select="rss/channel/item[2]"></xsl:with-param>
      </xsl:call-template>
      <xsl:call-template name="entry">
          <xsl:with-param name="CurrentItem" select="rss/channel/item[3]"></xsl:with-param>
      </xsl:call-template>	
	
	</ul>
</xsl:template>

    <xsl:template name="entry">
        <xsl:param name="CurrentItem"></xsl:param>

		<li class="cp-twitter-entry cc">
			<abbr title="{$CurrentItem/pubDate}">
				<xsl:value-of select="substring($CurrentItem/pubDate,9,3)"></xsl:value-of>
			</abbr>
			<span>
				<xsl:text> </xsl:text>
				<xsl:value-of select="substring($CurrentItem/pubDate,6,2)"></xsl:value-of>
			</span> 
			<xsl:text> </xsl:text>
			<a href="{$CurrentItem/link}"><xsl:value-of select="$CurrentItem/title"/></a>
		</li>

	</xsl:template>
</xsl:stylesheet>
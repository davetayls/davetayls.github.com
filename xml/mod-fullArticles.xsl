<?xml version="1.0" encoding="iso-8859-1"?>
<xsl:stylesheet version="1.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:content="http://purl.org/rss/1.0/modules/content/"
>
	<xsl:template match="/">

		<div class="mod-fullArticles-article">
			<p class="mod-fullArticles-pubDate">
				<xsl:value-of select="substring(rss/channel/item[1]/pubDate,0,26)" />
			</p>	
			<xsl:value-of disable-output-escaping="yes" select="rss/channel/item[1]/content:encoded"></xsl:value-of>
		</div>
		<div class="mod-fullArticles-article">
			<p class="mod-fullArticles-pubDate">
				<xsl:value-of select="substring(rss/channel/item[2]/pubDate,0,26)" />
			</p>	
			<xsl:value-of disable-output-escaping="yes" select="rss/channel/item[2]/content:encoded"></xsl:value-of>
		</div>
	</xsl:template>
</xsl:stylesheet>
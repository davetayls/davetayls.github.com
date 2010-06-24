<?xml version="1.0" encoding="utf-8" ?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:key name="skills" match="skill" use="." />
    <xsl:template match="/">
    <html>
      <head>
        <title>David Taylor Projects</title>
      </head>
      <body>
          <xsl:apply-templates select="//title" />
          <h1>
          <xsl:value-of select="/portfolio/contacts/firstname"/>
          <xsl:text> </xsl:text>
          <xsl:value-of select="/portfolio/contacts/lastname"/>
        </h1>
        <ul>
          <li>
            Mobile: <xsl:value-of select="/portfolio/contacts/mobile"/>
          </li>
        </ul>
        <h2>Skills</h2>
        <ul>
          <!-- //name[generate-id() = generate-id(key('names',@first))[1])] -->
          <xsl:for-each select="//skill[generate-id() = generate-id(key('skills',.)[1])]">
            <xsl:sort select="."/>
            <li>
              <xsl:value-of select="."/>
            </li>
          </xsl:for-each>
        </ul>
        <h2>Collections</h2>
        <ul>
          <xsl:for-each select="portfolio/collection">
            <li>
              <xsl:value-of select="@name"/>
              <table border="1">
                <tr>
                  <th>Title</th>
                  <th>Client</th>
                  <th>Skills</th>
                </tr>
                <xsl:for-each select="./project">
                  <xsl:sort select="title"/>
                  <tr>
                    <td>
                      <xsl:value-of select="title"/>
                    </td>
                    <td>
                      <xsl:value-of select="client"/>
                    </td>
                    <td>
                      <xsl:for-each select="skills/skill">
                        <xsl:value-of select="."/> |
                      </xsl:for-each>
                    </td>
                  </tr>
                </xsl:for-each>
              </table>
            </li>
          </xsl:for-each>
        </ul>
      </body>
    </html>
    </xsl:template>
    <xsl:template match="title">
        title:<xsl:value-of select="."/>
    </xsl:template>
</xsl:stylesheet>

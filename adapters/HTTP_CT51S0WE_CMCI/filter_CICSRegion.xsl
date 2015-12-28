<!--

    IBM Confidential OCO Source Materials

    5725-I43 Copyright IBM Corp. 2006, 2013

    The source code for this program is not published or otherwise
    divested of its trade secrets, irrespective of what has
    been deposited with the U.S. Copyright Office.

-->
<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:h="http://www.w3.org/1999/xhtml"
                xmlns:cics="http://www.ibm.com/xmlns/prod/CICS/smw2int">
    <xsl:output method="text"/>
    
    <xsl:template match="/">
        {
	        'cicsRegion': {

		        <xsl:for-each select="//cics:cicsregion">
		        	'regionName': '<xsl:value-of select="./@applid"/>',
		        	'sysid': '<xsl:value-of select="./@sysid"/>',
		        	'mvssysid': '<xsl:value-of select="./@mvssysid"/>',
		        	'sosbelowline': '<xsl:value-of select="./@sosbelowline"/>',
		        	'sosaboveline': '<xsl:value-of select="./@sosaboveline"/>',
		        	'sosabovebar': '<xsl:value-of select="./@sosabovebar"/>',
		        	<xsl:choose>
			      		<xsl:when test="./@memlimit &gt;= 0">
							'memlimit': <xsl:value-of select="./@memlimit"/>
						</xsl:when>
						<xsl:otherwise>
							'memlimit': 0
						</xsl:otherwise>
					</xsl:choose>
		        </xsl:for-each>

	        }
        }
    </xsl:template>

</xsl:stylesheet>

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
	        'dynamicStorage': {
		        <xsl:for-each select="//cics:cicsdynamicstoragearea">
	                <xsl:choose>
	                
	                   <!-- ********** DSA ********** -->
	                
	                	<xsl:when test="./@name='CDSA'">
	                	  'cdsa': {
	                	  	'used': <xsl:value-of select="./@size - ./@stgfsize"/>,
	                	  	'free': <xsl:value-of select="./@stgfsize"/>,
	                	  	'allocated': <xsl:value-of select="./@size"/>,
	                	  	'total_limit': <xsl:value-of select="./@limit"/>                	      
	                	  },
	                	</xsl:when>
	                	<xsl:when test="./@name='RDSA'">
	                	  'rdsa': {
	                	  	'used': <xsl:value-of select="./@size - ./@stgfsize"/>,
	                	  	'free': <xsl:value-of select="./@stgfsize"/>,
	                	  	'allocated': <xsl:value-of select="./@size"/>,           	      
	                	  },
	                	</xsl:when>
	                	<xsl:when test="./@name='SDSA'">
	                	  'sdsa': {
	                	  	'used': <xsl:value-of select="./@size - ./@stgfsize"/>,
	                	  	'free': <xsl:value-of select="./@stgfsize"/>,
	                	  	'allocated': <xsl:value-of select="./@size"/>,              	      
	                	  },
	                	</xsl:when>	                	
	                	<xsl:when test="./@name='UDSA'">
	                	  'udsa': {
	                	  	'used': <xsl:value-of select="./@size - ./@stgfsize"/>,
	                	  	'free': <xsl:value-of select="./@stgfsize"/>,
	                	  	'allocated': <xsl:value-of select="./@size"/>,                	      
	                	  },
	                	</xsl:when>	
	                	
	                   <!-- ********** EDSA ********** -->
	                   
	                	<xsl:when test="./@name='ECDSA'">
	                	  'ecdsa': {
	                	  	'used': <xsl:value-of select="./@size - ./@stgfsize"/>,
	                	  	'free': <xsl:value-of select="./@stgfsize"/>,
	                	  	'allocated': <xsl:value-of select="./@size"/>,
	                	  	'total_limit': <xsl:value-of select="./@limit"/>       	      
	                	  },
	                	</xsl:when>
	                	<xsl:when test="./@name='ERDSA'">
	                	  'erdsa': {
	                	  	'used': <xsl:value-of select="./@size - ./@stgfsize"/>,
	                	  	'free': <xsl:value-of select="./@stgfsize"/>,
	                	  	'allocated': <xsl:value-of select="./@size"/>,          	      
	                	  },
	                	</xsl:when>
	                	<xsl:when test="./@name='ESDSA'">
	                	  'esdsa': {
	                	  	'used': <xsl:value-of select="./@size - ./@stgfsize"/>,
	                	  	'free': <xsl:value-of select="./@stgfsize"/>,
	                	  	'allocated': <xsl:value-of select="./@size"/>,                	      
	                	  },
	                	</xsl:when>	                	
	                	<xsl:when test="./@name='EUDSA'">
	                	  'eudsa': {
	                	  	'used': <xsl:value-of select="./@size - ./@stgfsize"/>,
	                	  	'free': <xsl:value-of select="./@stgfsize"/>,
	                	  	'allocated': <xsl:value-of select="./@size"/>,            	      
	                	  },
	                	</xsl:when>
	                	<xsl:when test="./@name='ETDSA'">
	                	  'etdsa': {
	                	  	'used': <xsl:value-of select="./@size - ./@stgfsize"/>,
	                	  	'free': <xsl:value-of select="./@stgfsize"/>,
	                	  	'allocated': <xsl:value-of select="./@size"/>,              	      
	                	  },
	                	</xsl:when>	                	
	                	
	                   <!-- ********** GDSA ********** -->
	                   
	                	<xsl:when test="./@name='GCDSA'">
	                	  'gcdsa': {
	                	  	'used': <xsl:value-of select="./@size - ./@stgfsize"/>,
	                	  	'free': <xsl:value-of select="./@stgfsize"/>,
	                	  	'allocated': <xsl:value-of select="./@size"/>            	      
	                	  },
	                	</xsl:when>
	                	<xsl:when test="./@name='GSDSA'">
	                	  'gsdsa': {
	                	  	'used': <xsl:value-of select="./@size - ./@stgfsize"/>,
	                	  	'free': <xsl:value-of select="./@stgfsize"/>,
	                	  	'allocated': <xsl:value-of select="./@size"/>,           	      
	                	  },
	                	</xsl:when>	                	
	                	<xsl:when test="./@name='GUDSA'">
	                	  'gudsa': {
	                	  	'used': <xsl:value-of select="./@size - ./@stgfsize"/>,
	                	  	'free': <xsl:value-of select="./@stgfsize"/>,
	                	  	'allocated': <xsl:value-of select="./@size"/>,                	      
	                	  },
	                	</xsl:when>
	                </xsl:choose>
		        </xsl:for-each>
	        }
        }
    </xsl:template>

</xsl:stylesheet>

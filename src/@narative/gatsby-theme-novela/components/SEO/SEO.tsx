import * as React from "react";

import DefaultSEO from "@narative/gatsby-theme-novela/src/components/SEO/SEO";

interface HelmetProps {
    articlepathName?: string;
    authorName?: string;
    authorsBio?: string;
    authorsSlug?: string;
    canonicalUrl?: string;
    dateforSEO?: string;
    description?: string;
    image?: string;
    isBlogPost: false;
    pathname: string;
    published?: string;
    timeToRead?: string;
    title: string;
    isSecret: false;
}

const SEO: React.FC<HelmetProps> = (props) => {
    return <DefaultSEO {...{
        ...props,
        timeToRead: undefined
    }}/>
}

export default SEO

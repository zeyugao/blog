import { GetServerSideProps } from 'next'
import { FC } from 'react'
import * as config from 'lib/config'
import { Feed } from 'feed'
import axios from 'axios'

const domain = `https://${config.domain}`


const generateRss = (posts: Post[]) => {
    const year = new Date().getFullYear()
    const feed = new Feed({
        id: domain,
        link: domain,
        title: "Elsa Ganger's Blog",
        description: "Blog's RSS",
        copyright: `All rights reserved ${year}, Elsa Granger`,
        image: `${domain}/favicon.png`,
        favicon: `${domain}/favicon.ico`,
        author: {
            name: 'Elsa Granger',
            link: 'https://www.elsagranger.com'
        }
    })

    posts.forEach(post => {
        console.log(post.Published)
        if (post.Published) {
            feed.addItem({
                title: post.Name,
                link: `${domain}/${post.id}`,
                description: post.Description,
                date: new Date(post.Published)
            })
        }
    })

    return feed.rss2()
}

interface Post {
    id: string
    Name: string
    Tags: string
    Published: string
    Description: string
}

const getAllPosts = async (): Promise<Post[]> => {
    return await axios.get(`https://notion-api.splitbee.io/v1/table/${config.rootNotionPageId}`).then(res => res.data)
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
    if (res) {
        const posts = await getAllPosts()
        console.log(posts);
        const xmlFeed = generateRss(posts)

        res.setHeader('Content-Type', 'text/xml')
        res.write(xmlFeed)
        res.end()
    }

    return {
        props: {}
    }
}

const FeedView: FC = () => null

export default FeedView
import * as React from 'react'
import styled from '@emotion/styled'
import NavBar from '../components/navbar'
import RoundedImg from '../components/rounded-img'

interface FriendsInterface {
  name: string
  url: string
  logoUrl: string
}

const friends: FriendsInterface[] = [
  {
    name: 'taoky',
    url: 'https://taoky.moe',
    logoUrl: 'https://secure.gravatar.com/avatar/6e349261285ec9c4a9b049d14793227f?s=256&d=identicon&r=g'
  },
  {
    name: 'loliw',
    url: 'https://loliw.moe',
    logoUrl: 'https://loliw.moe/assets/images/avatar.jpg'
  },
  {
    name: 'Totoro',
    url: 'https://yyw.moe',
    logoUrl: 'https://s.gravatar.com/avatar/4c1c1becddf4fbf657678220ee14095a?s=250'
  },
  {
    name: 'Zeka',
    url: 'https://flag.zeka.cloud',
    logoUrl: 'https://flag.zeka.cloud/static/images/avatar.jpg'
  }
]

const Layout = styled.div`
  max-width: 750px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 32px;
  padding-right: 32px;
`

const PersonInfo: React.FC<FriendsInterface> = detail => {
  return (
    <div style={{ paddingTop: '16px', paddingBottom: '16px' }}>
      <a href={detail.url} style={{ textDecoration: 'none', color: 'inherit' }}>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <RoundedImg
            height={80}
            width={80}
            src={detail.logoUrl}
            alt={`${detail.name}'s logo`}
            style={{ marginRight: '32px', marginBottom: '0' }}
          />
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <span style={{ fontSize: '1.6rem', fontWeight: 500, userSelect: 'text' }}>{detail.name}</span>
            <span style={{ fontSize: '1.2rem', fontWeight: 300 }}>{detail.url}</span>
          </div>
        </div>
      </a>
    </div>
  )
}

const FriendPage: React.FC = () => {
  const friendsDisplay = friends.map(val => PersonInfo(val))

  return (
    <>
      <NavBar showBlog showFriends={false} />
      <Layout>
        <span style={{ fontSize: '2rem', fontWeight: 600 }}>
          Friends
          <span style={{ marginLeft: '16px', fontSize: '1.0rem', fontWeight: 400 }}>(Unordered)</span>
        </span>
        {friendsDisplay}
      </Layout>
    </>
  )
}

export default FriendPage

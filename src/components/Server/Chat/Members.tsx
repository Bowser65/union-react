import React from 'react'
import { connect } from 'react-redux'
import { hot } from 'react-hot-loader'
import Scrollbars from 'react-custom-scrollbars'

import UnionStore, { UnionStoreMember } from '../../../store/store.interface'

const avatars = [
  require('../../../img/avatars/avatar.0.svg'),
  require('../../../img/avatars/avatar.1.svg'),
  require('../../../img/avatars/avatar.2.svg'),
  require('../../../img/avatars/avatar.3.svg')
]

const Members = ({ members, serverMembers }) => {
  const filteredMembers = serverMembers.map((memberId: string) => members.filter(member => member.id === memberId)[0])
  const sortedMembers = filteredMembers.sort(memberSorter)

  // @todo: Server roles
  const onlineMembers = sortedMembers.filter(member => member.online)
  const offlineMembers = sortedMembers.filter(member => !member.online)
  return <div className='server-members'>
    <Scrollbars>
      <div className='server-members-role'>Online - {onlineMembers.length}</div>
      {onlineMembers.map((member: UnionStoreMember) => <Member member={member}/>)}
      <div className='server-members-role'>Offline - {onlineMembers.length}</div>
      {offlineMembers.map((member: UnionStoreMember) => <Member member={member}/>)}
    </Scrollbars>
  </div>
}

const Member = ({ member }) => {
  const avatar = member.avatarUrl || avatars[member.discriminator % 4]
  return <div className='server-members-item' key={member.id}>
    <img className={'server-members-item-name ' + (member.online ? 'online' : 'offline')} src={avatar} alt=''/>
    <span className='server-members-item-name'>{member.username}</span>
  </div>
}

const memberSorter = (a: UnionStoreMember, b: UnionStoreMember) => {
  if (!a.online && b.online) return 1
  if (a.online && !b.online) return -1
  return a.username > b.username ? 1 : -1
}

const mapStateToProps = (store: UnionStore) => ({
  members: store.members
})

export default hot(module)(connect(mapStateToProps)(Members as any)) as any

import React from 'react'
import { hot } from 'react-hot-loader'

import './style.scss'
import UnionStore, { UnionStoreMember } from '../../store/store.interface'
import { connect } from 'react-redux'

const avatars = [
  require('../../img/avatars/avatar.0.svg'),
  require('../../img/avatars/avatar.1.svg'),
  require('../../img/avatars/avatar.2.svg'),
  require('../../img/avatars/avatar.3.svg')
]

interface IProps {
  user: UnionStoreMember
}

class Account extends React.Component<IProps> {

  constructor (props: any) {
    super(props)
  }

  render () {
    const avatar = this.props.user.avatarUrl || avatars[this.props.user.discriminator % 4]
    return <div className='sidebar-account'>
      <img className='sidebar-account-avatar online' src={avatar} alt='avatar'/>
      <div className='sidebar-account-info'>
        <div className='username'>{this.props.user.username}</div>
        <div className='discriminator'>#{this.props.user.discriminator}</div>
      </div>
      <div className='sidebar-account-actions'>
        <img src={require('../../img/settings.svg')} alt='settings'/>
        <img src={require('../../img/disconnected.svg')} alt='disconnected'/>
      </div>
    </div>
  }

}

const mapStateToProps = (store: UnionStore) => ({
  user: store.appState.self
})

export default hot(module)(
  connect(
    mapStateToProps
  )(Account as any) as any
)

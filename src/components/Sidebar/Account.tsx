import React from 'react'
import { hot } from 'react-hot-loader'
import { withRouter } from 'react-router'

import './style.scss'

interface IProps {
  serverName: string
  owner: boolean
}

class Account extends React.Component {

  constructor (props: any) {
    super(props)
  }

  render () {
    return <div className='sidebar-account'>
      <img className='sidebar-account-avatar online' src='https://bowser65.xyz/assets/img/avatar.jpg' alt='avatar'/>
      <div className='sidebar-account-info'>
        <div className='username'>Bowser65</div>
        <div className='discriminator'>#4680</div>
      </div>
      <div className='sidebar-account-actions'>
        <img src={require('../../img/settings.svg')} alt='settings'/>
        <img src={require('../../img/disconnected.svg')} alt='disconnected'/>
      </div>
    </div>
  }

}

export default hot(module)(Account as any)

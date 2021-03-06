import React from 'react'
import Tooltip from 'rc-tooltip'
import { connect } from 'react-redux'
import { hot } from 'react-hot-loader'
import { Link, NavLink } from 'react-router-dom'

import UnionStore, { UnionStoreServer } from '../../store/store.interface'
import UnionSvg from '../UnionSvg'

import './style.scss'

interface IProps {
  maxServers: number
  userId: string
  servers: UnionStoreServer[]
}

interface IState {
  displayCreate: boolean
  listener: any
}

class Servers extends React.Component<IProps, IState> {

  constructor (props: IProps) {
    super(props)
    this.state = {
      displayCreate: false,
      listener: null
    }
  }

  render () {
    return <div className='union-servers'>
      <Link to='/home' className='union-servers-logo'>
        <Tooltip placement='right' overlay='Home' mouseLeaveDelay={0}>
          <div>
            <UnionSvg className='union-servers-logo' fill='#fff'/>
          </div>
        </Tooltip>
      </Link>
      {this.props.servers.map(server =>
        <NavLink to={'/servers/' + server.id} className='union-servers-server' key={server.id}
                 activeClassName='selected'>
          <Tooltip placement='right' overlay={server.name} mouseLeaveDelay={0}>
            <img src={server.icon} alt={server.name + ' icon'}/>
          </Tooltip>
          {server.mentions > 0 && <span className='poke'>{server.mentions}</span>}
          {(server.mentions === 0 && server.messages[0] && server.messages[0].id !== server.lastRead) &&
          <span className='unread'/>}
        </NavLink>
      )}
      {this.props.servers.filter(s => s.owner === this.props.userId).length < this.props.maxServers &&
      <div className='union-servers-create'>
        {this.state.displayCreate ? <img src={require('../../img/add.svg')} alt='add'/>
          : <Tooltip placement='right' overlay='Create or join a server' mouseLeaveDelay={0}>
            <img src={require('../../img/add.svg')} onClick={() => this.popup()} alt='add'/>
          </Tooltip>}
        {this.state.displayCreate && <div className='union-servers-create-select'>
          <div onClick={() => this.create()}>
            <img src={require('../../img/create.svg')} alt='create'/>
            <span>Create a new server</span>
          </div>
          <div onClick={() => this.join()}>
            <img src={require('../../img/invite.svg')} alt='invite'/>
            <span>Join a server</span>
          </div>
        </div>}
      </div>}
    </div>
  }

  popup () {
    const listener = () => {
      document.body.removeEventListener('click', this.state.listener)
      setTimeout(() => this.setState({ listener: null, displayCreate: false }), 0)
    }
    document.body.addEventListener('click', listener)
    this.setState({ listener, displayCreate: true })
  }

  async create () {
    const serverName = prompt('Please enter server name')
    if (!serverName) return
    const iconUrl = prompt('Please enter server icon url', require('../../img/avatars/server.svg'))

    await fetch('/api/v2/servers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + localStorage.getItem('token')
      },
      body: JSON.stringify({
        name: serverName,
        iconUrl
      })
    })
  }

  async join () {
    let invite = prompt('Please enter invite code')
    if (!invite) return

    if (invite.includes('/i/')) invite = invite.split('/i/')[1]
    await fetch('/api/v2/invites/' + invite, {
      method: 'POST',
      headers: {
        Authorization: 'Basic ' + localStorage.getItem('token')
      }
    })
  }
}

const mapStateToProps = (store: UnionStore) => ({
  maxServers: store.api.appSettings.maxServersPerUser,
  servers: store.servers,
  userId: store.appState.self.id
})

export default hot(module)(connect(mapStateToProps)(Servers as any))

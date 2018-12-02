import React from 'react'
import { connect } from 'react-redux'
import { hot } from 'react-hot-loader'
import { Redirect, Switch, Route, withRouter } from 'react-router'
import UnionStore, { UnionStoreAPI } from '../store/store.interface'

import AsyncC from './AsyncComponent'
import Loader from './Loader'

const Login = () => import('./Login')
const Home = () => import('./Home')
const Server = () => import('./Server')
const Invite = () => import('./Server/Invite')

import './App.scss'
import ServerList from './Server/ServerList'

interface IProps {
  token: string
  api: UnionStoreAPI
}

class App extends React.Component<IProps> {

  componentDidCatch (error) {
    crashApp('An error occurred in a React component', error)
  }

  render () {
    if (!this.props.api) return <Loader/>
    if (this.props.api.apiVersion !== 2) return <div className='app-incompatible'>
      <img src='https://cdn.discordapp.com/emojis/400064206310998035.png' alt='blobcat'/>
      <p>Union API is incompatible with this version of union-react</p>
    </div>

    if (!this.props.token) return <AsyncC moduleProvider={Login}/>

    return <div className='union'>
      <ServerList/>
      <div className='union-container'>
        <Switch>
          {/* Union Home */}
          <Route path='/home' component={() => <AsyncC moduleProvider={Home}/>}/>

          {/* Union Chat */}
          <Route path='/servers/:id([0-9]+)' component={() => <AsyncC moduleProvider={Server}/>} exact/>

          {/* Misc */}
          <Route path='/' render={() => <Redirect to='/home'/>} exact/>
          <Route path='/i/:code([a-zA-Z0-9\-_]+)' component={() => <AsyncC moduleProvider={Invite}/>}/>
        </Switch>
      </div>
    </div>
  }
}

export default hot(module)(
  withRouter(connect((store: UnionStore) => ({
    token: store.appState.token,
    api: store.api
  }))(App as any) as any)
)

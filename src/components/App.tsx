import React from 'react'
import { connect } from 'react-redux'
import { hot } from 'react-hot-loader'
import { Redirect, Switch, Route as ReactRoute, withRouter } from 'react-router'
import UnionStore, { UnionStoreAPI } from '../store/store.interface'

import AsyncComponent from './AsyncComponent'
import Loader from './Loader'
import Route from './Route'

const Login = () => import('./Login')
const Home = () => import('./Server')
const Invite = () => import('./Invite')

import './App.scss'

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

    if (!this.props.token) return <AsyncComponent moduleProvider={Login}/>

    return <Switch>
      {/* Union Home */}
      {/* Union Chat */}
      <Route path='/servers' component={() => <AsyncComponent moduleProvider={Home}/>} allowed={this.props.token}/>
      {/* Misc */}
      <ReactRoute path='/' render={() => <Redirect to='/servers'/>} exact/>
      <Route path='/i/:code([a-zA-Z0-9\-_]+)' component={() => <AsyncComponent moduleProvider={Invite}/>} allowed={this.props.token}/>
    </Switch>
  }
}

export default hot(module)(
  withRouter(connect((store: UnionStore) => ({
    token: store.appState.token,
    api: store.api
  }))(App as any) as any)
)

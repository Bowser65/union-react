import React from 'react'
import { connect } from 'react-redux'
import { hot } from 'react-hot-loader'

import UnionStore from '../../store/store.interface'

import './style.scss'

interface IProps {
  username: string
}

class Home extends React.Component<IProps> {

  render () {
    return <div className='union-welcome'>
      <h1>Welcome to Union {this.props.username}!</h1>
      <div className='union-welcome-content'>
        Select a server, create a new fancy one or join some friends in the left sidebar
      </div>
      <a className='union-welcome-contribute' href='https://github.com/Union-Chat' target='_blank'>
        Help us improve Union on GitHub
      </a>
    </div>
  }
}

const mapStateToProps = (store: UnionStore) => ({
  username: store.appState.self.username
})

export default hot(module)(
  connect(
    mapStateToProps
  )(Home as any) as any
)

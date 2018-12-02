import React from 'react'
import { hot } from 'react-hot-loader'
import { withRouter } from 'react-router'

import Account from '../Account'

interface IProps {
  serverName: string
  owner: boolean
}

class Server extends React.Component {

  constructor (props: any) {
    super(props)
  }

  render () {
    return <div className='sidebar'>
      <div className='sidebar-header'>
        Server name
      </div>
      <div className='sidebar-channels'>
        <div className='sidebar-channels-category expended'>
          <div className='sidebar-channels-category-title'>Text Channels</div>
          <div className='sidebar-channels-category-item txt selected'>general</div>
        </div>
      </div>
      <Account/>
    </div>
  }

}

export default hot(module)(withRouter(Server as any))

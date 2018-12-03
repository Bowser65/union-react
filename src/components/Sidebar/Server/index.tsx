import React from 'react'
import { hot } from 'react-hot-loader'

import Account from '../Account'

interface IProps {
  serverName: string
}

class Server extends React.Component<IProps> {

  constructor (props: any) {
    super(props)
  }

  render () {
    return <div className='sidebar'>
      <div className='sidebar-header'>
        {this.props.serverName}
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

export default hot(module)(Server as any)

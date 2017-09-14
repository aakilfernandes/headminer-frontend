import React from 'react'
import navigo from '../lib/navigo'
import Articles from './Articles.jsx'

export default class Main extends React.Component {
  componentDidMount() {
    navigo.on({
      '/': () => {
        console.log('hot')
        this.setState({
          page: 'hot'
        })
      },
      '/jobs': () => {
        console.log('jobs')
        this.setState({
          page: 'jobs'
        })
      },
      '/influencers/:influencer_id/:influencer_screen_name': (params) => {
        console.log(params)
        this.setState({
          page: 'influencer',
          influencer_id: params.influencer_id
        })
        return (<h2>params.influencer_id</h2>)
      }
    }).resolve()
  }
  render() {
    console.log(this.state)
    if (!this.state) {
      return null
    }

    switch(this.state.page) {
      case 'hot':
        return <Articles />
      case 'jobs':
        return <h2>Jobs</h2>
      case 'jobs':
        return <h2>Jobs</h2>
    }
  }
}

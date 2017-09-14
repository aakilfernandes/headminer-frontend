import React from 'react'
import events from '../lib/events'
import slugify from 'slugify'

export default class TwitterInfluencerPopover extends React.Component {
  componentDidMount() {
    events.on('twitter-influencer-mouse-enter', (event) => {
      this.setState({
        influencer: event.influencer,
        bounding: event.element.getBoundingClientRect(),
        is_hidden: false
      })
    })
  }
  onMouseLeave() {
    this.setState({
      is_hidden: true
    })
  }
  render() {
    if (!this.state) {
      return null
    }
    const style = {
      display: this.state.is_hidden ? 'none': 'block',
      top: this.state.bounding.top + document.body.scrollTop,
      left: this.state.bounding.left + document.body.scrollLeft
    }

    const influencer = this.state.influencer

    const twitter_url = `https://twitter.com/${influencer.screen_name}`
    const name_slug = influencer.name ? slugify(influencer.name) : '-'
    const influencer_url = `/#!/influencers/${influencer.id}/${name_slug}`
    return (
      <div
        className="twitter-influencer-popover-wrapper"
        style={style}
        onMouseLeave={this.onMouseLeave.bind(this)}
      >
        <a className="twitter-influencer-popover-bridge" href={influencer_url} />
        <div className="twitter-influencer-popover-bridge-2" />
        <div className="twitter-influencer-popover">
          <a href={twitter_url} className="twitter-influencer-link">
            @{influencer.screen_name} ({influencer.name})
          </a>
          <p>{influencer.description}</p>
          <b>Adjusted Influence: {influencer.adjusted_influence.toFixed(2)}</b>
        </div>
      </div>
    )
  }
}

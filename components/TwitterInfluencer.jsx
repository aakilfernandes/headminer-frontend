import React from 'react'
import events from '../lib/events'
import slugify from 'slugify'

export default class TwitterInfluencer extends React.Component {
  render() {
    const image_style = {
      backgroundImage: `url(${this.props.influencer.profile_image_url})`
    }
    const href = `/!#/influencers/${this.props.influencer.id}/@${this.props.influencer.screen_name}`
    return (
      <a
        className="twitter-influencer"
        onMouseEnter={this.onMouseEnter.bind(this)}
        ref={(element) => { this.element = element }}
        href={href}
      >
        <div className="twitter-influencer-image" style={image_style}  />
      </a>
    )
  }
  onMouseEnter() {
    events.emit('twitter-influencer-mouse-enter', {
      influencer: this.props.influencer,
      element: this.element
    })
  }
}

import React from 'react'
import axios from 'axios'
import { Row, Col } from 'react-bootstrap'
import TwitterInfluencer from './TwitterInfluencer.jsx'
import timeago from 'timeago.js'

export default class Article extends React.Component {
  componentDidMount() {
    axios.get(`http://127.0.0.1:4001/articles/${this.props.id}`).then((result) => {

      const article = result.data
      const high_influencers = []
      const low_influencers = []

      article.influencers.forEach((influencer) => {
        if (
          influencer.adjusted_influence === null
          || Math.abs(influencer.adjusted_influence) < 1
        ) {
          return
        } else if (influencer.adjusted_influence > 0) {
          high_influencers.push(influencer)
        } else {
          low_influencers.unshift(influencer)
        }
      })

      this.setState({
        article,
        high_influencers,
        low_influencers
      })
    })
  }
  render() {
    if (!this.state) {
      return <Row/>
    }
    console.log(this.state.article)
    const low_influencer_elements = this.state.low_influencers.map((influencer) => {
      return <TwitterInfluencer influencer={influencer} key={influencer.id} />
    })
    const high_influencer_elements = this.state.high_influencers.map((influencer) => {
      return <TwitterInfluencer influencer={influencer} key={influencer.id}/>
    })
    const timeago_string = timeago().format(this.state.article.created_at)
    return (
      <Row className="article">
        <Col xs={3} sm={2}>
          <img src={this.state.article.image} className="article-image" />
          Heat: {this.state.article.heat}
        </Col>
        <Col xs={9} sm={10}>
          <h2 className="article-title">
            <a href={this.state.article.url.url}>#{this.state.article.id}: {this.state.article.title}</a>
          </h2>
          <p>{this.state.article.description}</p>
          <br/>
          {timeago_string}
          &nbsp;
          <a href={this.state.article.url.url}>{this.state.article.url.domain.domain}</a>
          &nbsp;
          <i className="fa fa-twitter-square" aria-hidden="true"></i>
          &nbsp;
          <a>({this.state.article.twitter_statuses_count})</a>
          &nbsp;
          <i className="fa fa-reddit-square" aria-hidden="true"></i>
          &nbsp;
          <a>({this.state.article.reddit_score}/{this.state.article.reddit_posts_count})</a>
          &nbsp;
          <i className="fa fa-facebook-square" aria-hidden="true"></i>
          &nbsp;
          <a>({this.state.article.facebook_share_count})</a>
        </Col>
        <Col xs={3} sm={2} />
        <Col xs={9} sm={10}>
          <table className="table article-twitter-influencers-table">
            <tbody>
              <tr>
                <td>{high_influencer_elements.length} High Influencers</td>
                <td>
                  <div className="article-twitter-influencers">
                    {high_influencer_elements}
                  </div>
                </td>
              </tr>
              <tr>
                <td>{low_influencer_elements.length} Low Influencers</td>
                <td>
                  <div className="article-twitter-influencers">
                    {low_influencer_elements}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </Col>
      </Row>
    )
  }
}

Article.propTypes = {
  id: React.PropTypes.number
}

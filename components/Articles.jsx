import React from 'react'
import axios from 'axios'
import Article from './Article.jsx'

export default class Articles extends React.Component {
  componentDidMount() {
    axios.get(`http://127.0.0.1:4001/hot/`).then((result) => {
      this.setState({
        article_ids: result.data
      })
    })
  }
  render() {
    const article_elements = this.state ? this.state.article_ids.map((id) => {
      return <Article id={id} key={id}/>
    }) : null

    return (
      <div className="container">
        {article_elements}
      </div>
    )
  }
}

import React from 'react'

import './styles.css';
class Card extends React.Component {
  render() {
    return(
        <div className="card__container">
            <div className={"img__container"}>
                <img alt="poster" src={this.props.poster_src} />    
            </div>
            <div className="info__container">
                <h4 className="title"> {this.props.title}</h4>
                {this.props.buttonText != null ?
                    (<button className="button" title = {this.props.title} id={this.props.id} onClick={this.props.onButtonClick}>
                        {this.props.buttonText}
                    </button>) : ''
                }
            </div>
        </div>
    )
  }
}

export default Card
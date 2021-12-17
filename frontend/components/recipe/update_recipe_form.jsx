import React from "react";
import { withRouter } from "react-router";
import UserNavContainer from "../user_nav/user_nav_container";

class UpdateRecipeForm extends React.Component {
  constructor(props) {
    super(props)
    let { preloadedInfo } = this.props
    this.state = preloadedInfo
    this.handleSubmit = this.handleSubmit.bind(this)
    this.changed = false
  }

  redirectToShow() {
    this.props.history.push(`/recipes/${this.state.id}`)
  }

  handleSubmit(e) {
    e.preventDefault()
    this.changed ? 
      this.props.action(this.state)
        .then(res => this.redirectToShow())
      : this.redirectToShow()
  }

  update(field) {
    this.changed = true
    return e => this.setState({
      [field]: e.target.value
    })
  }

  handleDelete() {
    let {deleteRecipe, currentRecipeId, history} = this.props
    deleteRecipe(currentRecipeId)
      .then(res => history.push('/feed'))
  }

  render() {
    let {author} = this.props
    return(
      <div className='recipe-form-div'>
        <div className='recipe-form-header'>
          <div className="recipe-form-header-left">
            <h2 className='logo'>Mediyum</h2>
            <p className="draft">Updating in {author.name}</p>
          </div>
          <div className="recipe-form-header-right">
            <div className='cancel-update' onClick={() => this.redirectToShow()}>Cancel</div>
            <input type="submit" form='story-form' className='publish-story' value='Update' />
            <button className='recipe-delete-button' onClick={() => this.handleDelete()}>
              Delete Recipe
            </button> 
            <UserNavContainer/>
          </div>
        </div>
        <form className='recipe-form' onSubmit={this.handleSubmit} id='story-form'>
            <input className='recipe-title' 
              type="text" 
              value={this.state.title} 
              onChange={this.update('title')} />
            <br />
            <textarea className='recipe-body'
              autoFocus
              type="text" 
              value={this.state.body} 
              onChange={this.update('body')} 
              onFocus={function(e) {
                let val = e.target.value;
                e.target.value = '';
                e.target.value = val;
              }}/>
            <br />
            {/* <button className='black-button' onClick={() => this.handleDelete()}>
              Delete Recipe
            </button>  */}
        </form>
      </div>
    )
  }
}

export default withRouter(UpdateRecipeForm)
import React from "react";
import { withRouter } from "react-router";
import CommentsIndexItemContainer from "./comments_index_item_container";
import CommentFormContainer from "./comment_form_container";

class CommentsModal extends React.Component {
  constructor(props) {
    super(props),
    this.state = {
      body: '',
      story_id: this.props.story.id,
      commenter_id: this.props.currentUserId
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.fetchComments()
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.createComment(this.state)
      .then(this.setState(this.state))
  }

  updateBody() {
    return e => this.setState({
      body: e.target.value
    })
  }

  filterComments() {
    let { comments } = this.props
    return comments.filter(comment => comment.story_id === this.state.story_id)
  }

  render() {
    let { modal, hideModal, comments, updateComment, deleteComment } = this.props
    const storyComments = this.filterComments()
    return !modal ? null : (
      <div className='comments-modal'>
        {<CommentFormContainer />}
        <ul className="comments-list">
          {
            storyComments.map((comment, i) => 
              <CommentsIndexItemContainer key={i} comment={comment} />
            )
          }
        </ul>
      </div>
    )
  }
}

export default withRouter(CommentsModal)
import PostList from "../components/PostList"

import {changeCounter} from "../redux/actions/counterActions";
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    posts: state.posts
  }
}

const VisiblePosts = connect(
  mapStateToProps
)(PostList)

export default VisiblePosts
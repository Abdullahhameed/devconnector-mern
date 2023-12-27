import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getPost } from '../../actions/post'
import Spinner from '../layout/Spinner'
import { Link, useParams } from 'react-router-dom'
import PostItem from '../posts/PostItem'
import CommentItem from '../post/CommentItem'
import CommentForm from './CommentForm'

const Post = ({ getPost, post: { post, loading } }) => {
    const { id } = useParams()

    useEffect(() => {
        getPost(id)
    }, [id])
    return (
        <section className='container'>
            {loading || post === null ? <Spinner /> : <>
                <Link to='/posts' className='btn'>Back to Post</Link>
                <PostItem post={post} showActions={false} />
                <CommentForm postId={post._id} />
                <div className="comments">
                    {post.comments.map(comment => (
                        <CommentItem key={comment._id} comment={comment} postId={post._id} />
                    ))}
                </div>
            </>}
        </section>
    )
}

Post.propTypes = {
    getPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    post: state.post
})

export default connect(mapStateToProps, { getPost })(Post)
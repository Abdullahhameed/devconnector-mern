import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const PrivateRoute = ({ component: Component, auth: { isAuthenticated, loading } }) => {
    return isAuthenticated && !loading ? <Component /> : <Navigate to="/login" replace />;
}

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);


// import React from 'react'
// import { Routes, Navigate } from 'react-router-dom'
// import { connect } from 'react-redux'
// import PropTypes from 'prop-types'

// const PrivateRoute = ({ component: Component, auth: { isAuthenticated, loading }, ...rest }) => (
//     <Routes {...rest} render={
//         props => !isAuthenticated && !loading
//             ? (<Navigate to='/login' replace />)
//             : (<Component {...props} />)
//     } />
// )

// PrivateRoute.propTypes = {
//     auth: PropTypes.object.isRequired
// }

// const mapStateToProps = (state) => ({
//     auth: state.auth
// })

// export default connect(mapStateToProps)(PrivateRoute)
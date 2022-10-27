import React from 'react'
import './NotFound.css'
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className='notFound'>
      <div className="four-zero-four-bg"></div>
      <div className="content_box_404">
        <h1>Look Like You're Lost</h1>
        <h3>The Page You Are Looking For Not Available!</h3>
        <Link to="/" className="link_404">Go To Home</Link>
      </div>
    </div>
  )
}

export default NotFound

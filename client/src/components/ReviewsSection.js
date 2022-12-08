import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";

export default function ReviewsSection() {
    const { user } = useAuth0();
    return (
      <>
      <div className={user == undefined ? "hidden" : ""}>
          <h2>Reviews</h2>
      </div>
      <div className={user == undefined ? "hidden" : ""}>
              <h3>Create Review</h3>
              <input id="listName" type="text" placeholder="List Name"/>
              <input id="rating" type="text" placeholder="Rating"/>
              <input id="comment" type="text" placeholder="Comment"/>
              <button onClick={() => createReview(user.email)} id="createNewReview">Create Review</button>
              <p>Input no more than 20 characters for name and numbers separated by commas for IDs</p>
        </div>
        <div className={user == undefined ? "hidden" : ""}>
              <h3>Update Review</h3>
              <input id="listName2" type="text" placeholder="List Name"/>
              <input id="rating2" type="text" placeholder="Rating"/>
              <input id="comment2" type="text" placeholder="Comment"/>
              <button onClick={() => updateReview(user.email)} id="updateReview">Update Review</button>
              <p>Input no more than 20 characters for name and numbers separated by commas for IDs</p>
        </div>
        <div className={user == undefined ? "hidden" : ""}>
              <h3>Delete Review</h3>
              <input id="listName3" type="text" placeholder="List Name"/>
              <button onClick={() => deleteReview(user.email)} id="deleteReview">Delete Review</button>
              <p>Input no more than 20 characters for name</p>
        </div>
        <div className={user == undefined ? "hidden" : ""}>
          <h2>My Reviews</h2>
          <button onClick={() => getMyReviews(user.email)}>View My Reviews</button>
        </div>
        <div className={user == undefined ? "hidden" : ""}>
          <ul id="userReviewList">
            <li><b>List Name | Rating | Comment</b></li>
          </ul>
        </div>
      </>
    )
  }

function createReview(email) {

}

function updateReview(email) {
    
}

function deleteReview(email) {
    
}

function getMyReviews(email) {
    
}
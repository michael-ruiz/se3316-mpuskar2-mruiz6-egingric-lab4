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
              <input id="listNameReview" type="text" placeholder="List Name"/>
              <input id="rating" type="text" placeholder="Rating"/>
              <input id="comment" type="text" placeholder="Comment"/>
              <button onClick={() => createReview(user.nickname)} id="createNewReview">Create Review</button>
              <p>Input no more than 20 characters for name and numbers separated by commas for IDs</p>
        </div>
        <div className={user == undefined ? "hidden" : ""}>
              <h3>Update Review</h3>
              <input id="listNameReview2" type="text" placeholder="List Name"/>
              <input id="rating2" type="text" placeholder="Rating"/>
              <input id="comment2" type="text" placeholder="Comment"/>
              <button onClick={() => updateReview(user.nickname)} id="updateReview">Update Review</button>
              <p>Input no more than 20 characters for name and numbers separated by commas for IDs</p>
        </div>
        <div className={user == undefined ? "hidden" : ""}>
              <h3>Delete Review</h3>
              <input id="listNameReview3" type="text" placeholder="List Name"/>
              <button onClick={() => deleteReview(user.nickname)} id="deleteReview">Delete Review</button>
              <p>Input no more than 20 characters for name</p>
        </div>
        <div className={user == undefined ? "hidden" : ""}>
          <h2>My Reviews</h2>
          <button onClick={() => getMyReviews(user.nickname)}>View My Reviews</button>
        </div>
        <div className={user == undefined ? "hidden" : ""}>
          <ul id="userReviewList">
            <li><b>List Name | Rating | Comment</b></li>
          </ul>
        </div>
      </>
    )
  }

function createReview(username) {
    let listName = document.getElementById('listNameReview');
    let filterName = listName.value;
    let rating = document.getElementById('rating');
    let ratingTxt = rating.value;
    let comment = document.getElementById('comment');
    let commentTxt = comment.value;
    let d1 = new Date();

    // Don't create list if fields are empty
    if (filterName == "" || ratingTxt == "" || commentTxt == ""){
        return;
    }
  
    // Ensure that the list name input is no more than 20 characters and that the ratings don't contain letters
    if ((filterName.length > 20) || containsLetter(ratingTxt)) {
        listName.value = "";
        rating.value = "";
        return;
    }

    if (ratingTxt < 0 || ratingTxt > 5) {
        rating.value = "";
        alert("Rating must be between 0 and 5");
        return;
    }
  
    if (commentTxt.length > 100) {
        comment.value = "";
        return;
    }
  
    let newReview = {
        rating: ratingTxt,
        comment: commentTxt,
        creator: username,
        visibility: "visible",
        lastChanged: d1
    }
  
    let path = '/reviews/' + filterName;
    if (window.confirm("Post review?")){
        fetch(path, {
            method: 'PUT',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(newReview)
        })
        .then(res => {
            if (res.ok) {
                res.json()
                .then()
                .catch(err => 'Failed to get json object')
            }
            else {
                alert("Error! Check:\nThe list name\nYou haven't already made a review for the list");
                console.log('Error:', res.status);
            }
        })
        .catch()
    }
  }

async function updateReview(username) {
    let listName = document.getElementById('listNameReview2');
    let filterName = listName.value;
    let rating = document.getElementById('rating2');
    let ratingTxt = rating.value;
    let comment = document.getElementById('comment2');
    let commentTxt = comment.value;
    let creator;
    let d1 = new Date();

    // Don't create list if fields are empty
    if (filterName == "" || ratingTxt == "" || commentTxt == ""){
        console.log("hello");
        return;
    }
  
    // Ensure that the list name input is no more than 20 characters and that the ratings don't contain letters
    if ((filterName.length > 20) || containsLetter(ratingTxt)) {
        listName.value = "";
        rating.value = "";
        return;
    }

    if (ratingTxt < 0 || ratingTxt > 5) {
        rating.value = "";
        alert("Rating must be between 0 and 5");
        return;
    }
  
    if (commentTxt.length > 100) {
        comment.value = "";
        return;
    }
  
    let newReview = {
        rating: ratingTxt,
        comment: commentTxt,
        creator: username,
        visibility: "visible",
        lastChanged: d1
    }
  
    let path = '/reviews/' + filterName;

    await fetch(path)
    .then(res2 => res2.json()
    .then(data1 => {
      creator = data1.creator;
    })
    )
    .catch(err => console.log('Failed to find list of that name'))

    if (username === creator){
        fetch(path, {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(newReview)
        })
        .then(res => {
            if (res.ok) {
                res.json()
                .then()
                .catch(err => 'Failed to get json object')
            }
            else {
                alert("Error! Check:\nThe list name\nYou have already made a review for the list");
                console.log('Error:', res.status);
            }
        })
        .catch()
    }
}

async function deleteReview(username) {
    let listName = document.getElementById('listNameReview3');
    let filterName = listName.value;
    let creator;
  
    // Don't create list if list name box is empty
    if (filterName == ""){
        return;
    }
  
    // Ensure that the list name input is no more than 20 characters
    if ((filterName.length > 20)) {
        listName.value = "";
        return;
    }
  
    let path = '/lists/' + filterName;
    if (window.confirm("Are you sure you want to delete this list?")){
    // Get creator from list and check that it matches logged in user first
    await fetch(path)
    .then(res2 => res2.json()
    .then(data1 => {
      creator = data1.creator;
    })
    )
    .catch(err => console.log('Failed to find list of that name'))
  
    if (username === creator){
      fetch(path, {
        method: 'DELETE',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify()
      })
      .then(res => {
        if (res.ok) {
            res.json()
            .then()
            .catch(err => 'Failed to get json object')
        }
        else {
            alert("List does not exist!");
            console.log('Error:', res.status);
        }
      })
      .catch()
    }
    else {
      alert("Cannot delete another user's list!");
    }
    }
}

function getMyReviews(username) {

    while (document.getElementById("userReviewList").firstChild != document.getElementById("userReviewList").lastChild){
      document.getElementById("userReviewList").removeChild(document.getElementById("userReviewList").lastChild);
    }
  
    fetch('/lists/all/lists')
    .then(res => res.json()
    .then(data => {
        console.log(data);
  
        for (let i = 0; i < data.length; i++){
          if (data[i].creator === username){
            for (let j = 0; j < data[i].reviews.length; j++){
                let review = data[i].reviews[j];
                let list = document.getElementById('userReviewList');
                let li = document.createElement('li');
                let p = document.createElement('p');
                p.innerText = data[i].name + " | " + review.rating + " | " + review.comment;

                li.appendChild(p);
                list.appendChild(li);
            }
          }
      }
    })
    )
}

function containsLetter(str) {
    return ((/[a-z]/.test(str)) || (/[A-Z]/.test(str)));
}
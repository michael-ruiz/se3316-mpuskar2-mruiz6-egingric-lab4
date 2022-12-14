import React from 'react'
import './App.css'
import Title from './components/Title'
import TracksSection from './components/TracksSection'
import ListsSection, {ListsSectionLogin} from './components/ListsSection'
import ReviewsSection from './components/ReviewsSection'

function App() {
  return (
    <>
    <Title/>
    <TracksSection/>
    <ListsSection/>
    <ListsSectionLogin/>
    <ReviewsSection/>
    </>
  )
}

export default App
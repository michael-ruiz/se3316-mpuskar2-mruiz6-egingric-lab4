import React from 'react'
import './App.css'
import Title from './components/Title'
import TracksSection from './components/TracksSection'
import ArtistsSection from './components/ArtistsSection'
import ListsSection, {ListsSectionLogin} from './components/ListsSection'
import ReviewsSection from './components/ReviewsSection'

function App() {
  return (
    <>
    <Title/>
    <TracksSection/>
    <ArtistsSection/>
    <ListsSection/>
    <ListsSectionLogin/>
    <ReviewsSection/>
    </>
  )
}

export default App
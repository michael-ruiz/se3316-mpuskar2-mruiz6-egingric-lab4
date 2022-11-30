import React from 'react'
import './App.css'
import Title from './components/Title'
import TracksSection from './components/TracksSection'
import ArtistsSection from './components/ArtistsSection'
import ListsSection from './components/ListsSection'
import GenresSection from './components/GenresSection'

function App() {
  return (
    <>
    <Title/>
    <TracksSection/>
    <ArtistsSection/>
    <ListsSection/>
    <GenresSection/>
    </>
  )
}

export default App
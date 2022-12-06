import React from 'react'
import './App.css'
import Title from './components/Title'
import TracksSection from './components/TracksSection'
import ArtistsSection from './components/ArtistsSection'
import ListsSection, {ListsSectionLogin} from './components/ListsSection'

function App() {
  return (
    <>
    <Title/>
    <TracksSection/>
    <ArtistsSection/>
    <ListsSection/>
    <ListsSectionLogin/>
    </>
  )
}

export default App
import { useState } from 'react'
// import moodyExpression from './components/FaceExpression'
import './App.css'
import FaceExpression from './components/FaceExpression'
import MusicFeature from './components/MusicFeature'

function App() {

  const [songs,setSongs] =useState([])
     return (
    <>
      <div>
        <nav className='w-full p-5 shadow-md'><h1 className='text-3xl pl-10 font-bold'>Moody Playerr</h1></nav>

        <FaceExpression setSongs={setSongs}/>
        <MusicFeature songs={songs}/>
      </div>
      
    </>
  )
}

export default App

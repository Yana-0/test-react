import './App.css'
import { useEffect, useState } from 'react'


function App () {
  const resultNumber = 8
  const resultList = []
  const [result, setResult] = useState([])
  const handleData = async () => {
    for (let i = 0; i < resultNumber; i++) {
      await fetch('https://random.dog/woof.json')
        .then((response) => response.json())
        .then((data) => {
          Object.assign(data, { id: i })
          resultList.push(data)
        })
    }
    setResult(resultList)
  }
  useEffect(() => {
    handleData()
    console.log(result)
  }, [])
  const clickHandler = () => {
    window.location.reload()
  }
  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-4 gap-4 place-items-center py-4 px-4'>
        {result && result.map(item => {
          return (
            item.url.slice(-3) === 'mp4' ?
              <video key={item.id} className='w-48' src={item.url} autoPlay muted loop></video>
              :
              <img key={item.id} className='w-48' src={item.url}></img>
          )
        })}</div>
      <div className='py-4 px-4 flex justify-center items-center'>
        <button className='w-1/2 md:w-1/3 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-4 px-4 border border-blue-500 hover:border-transparent rounded' onClick={clickHandler}>update</button>
      </div>
    </>
  )
}

export default App

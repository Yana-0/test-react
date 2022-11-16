import './App.css'
import { useEffect, useState } from 'react'


function App () {
  const resultNumber = 8
  const resultList = []
  const [result, setResult] = useState([])
  const [loading, setLoading] = useState(false)
  const handleData = async () => {
    setLoading(true)
    for (let i = 0; i < resultNumber; i++) {
      await fetch('https://random.dog/woof.json')
        .then((response) => response.json())
        .then((data) => {
          let url = data.url.slice(-3)
          if (url === 'mp4' || url === 'jpg' || url === 'gif' || url === 'png') {
            Object.assign(data, { id: i })
            resultList.push(data)
          } else {
            i--
          }
        })
        .catch((error) => {
          setLoading(false)
          console.log(error)
        })
    }
    setLoading(false)
    setResult(resultList)
  }
  useEffect(() => {
    handleData()
  }, [])
  const clickHandler = () => {
    window.location.reload()
  }
  return (
    <>
      {loading ? (
        <div className="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-4" role="alert">
          <p className="font-bold">Loading ...</p>
          <p className="text-sm">Please wait for a second.</p>
        </div>
      ) : <div></div>}
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

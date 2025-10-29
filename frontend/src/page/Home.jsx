import Leftbar from '../components/leftbar/Leftbar'
import Slide from '../components/layouts/Slide'
import Catalog from '../components/catalogs/Catalog'

function Home() {
  
  return (
    <>
    <div className='max-w-screen-xl flex mx-2 lg:mx-auto gap-6 relative'>
        <Leftbar/>
        <Slide/>
    </div>
    <Catalog/>
    </>
  )
}

export default Home
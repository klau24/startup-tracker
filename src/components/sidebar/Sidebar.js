import { Link } from 'react-router-dom'
import { SidebarData } from './SidebarData'

function Sidebar() {
   return (
      <div className="h-screen w-1/6 font-mono bg-stone-100">
         <ul className="h-auto w-full p-0">
            {SidebarData.map((item, key) => {
               return (
                  <Link
                     className="w-full h-14 m-0 flex flex-row list-none justify-center items-center hover:bg-white hover:cursor-pointer"
                     to="/dashboard"
                     key={key}
                  >
                     {item.title}
                  </Link>
               )
            })}
         </ul>
      </div>
   )
}

export default Sidebar

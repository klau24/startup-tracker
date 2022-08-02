import { Link } from 'react-router-dom'
import { SidebarData } from './SidebarData'

function Sidebar() {
   return (
      <nav className="h-screen w-1/6 font-mono bg-stone-100">
         <ul className="h-auto w-full p-0 text-center">
            {SidebarData.map((item, key) => {
               return (
                  <Link
                     className="w-full h-14 m-0 flex flex-row list-none justify-center text-left items-center hover:bg-white hover:cursor-pointer"
                     to={item.link}
                     key={key}
                  >
                     {item.title}
                  </Link>
               )
            })}
         </ul>
      </nav>
   )
}

export default Sidebar

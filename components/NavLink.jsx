import Link from 'next/link'
import { useRouter } from 'next/router'


const NavLink = ({ href, children }) => {
  const router = useRouter();
  const isActive = router.pathname === href;

  return (
    <Link className={`hover:bg-gray-800 hover:bg-opacity-40 py-1 px-3 inline-flex border border-dashed border-transparent transition-all rounded mr-1 ${isActive && 'border-indigo-500 bg-gray-800 bg-opacity-40 '}`} href={href}>{children}</Link>
  )
}



export default NavLink
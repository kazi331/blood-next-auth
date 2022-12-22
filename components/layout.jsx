import LoginButton from './Login.btn';
import NavLink from './NavLink';

export default function Layout({ children }) {

  return (
    <>
      {/* header content  */}
      <header className='bg-gray-700 bg-opacity-80 py-2 sticky top-0 backdrop-blur mb-4 z-10'>
        <nav className='container mx-auto px-3 flex items-center justify-between'>
          <div>
            <NavLink href="/">Home</NavLink>
            {/* <NavLink href="/register">Register</NavLink> */}
            <NavLink href="/private">Private</NavLink>
            <NavLink href="/secret">Secret</NavLink>
          </div>
          <LoginButton />
        </nav>
      </header>
      {/* main page containers  */}
      <main className='container mx-auto px-3'>{children}</main>
      {/* footer content  */}
      <footer className='bg-gray-700 bg-opacity-80 py-2 sticky top-0 backdrop-blur mt-4 z-10'>
        <div className='container mx-auto text-center py-6 px-3'>
          <p>Copyright &copy; 2022 | Made with Love by Sayem Khan</p>
        </div>
      </footer>


    </>
  )
}

import NavLink from './navLink/NavLink'

export const Links = () => {
    const session = false
    const isAdmin = false
    const links = [
        {
            title: "Review",
            path: "/review",
        },
    ]
  return (
    <div className='flex gap-3'>
        {links.map((link =>  
            <NavLink item={link} key={link.title}/>
        ))}{
            session ? (
                <>
                    {isAdmin && <NavLink item={{title:"Admin", path: "/admin"}} />}
                    <button className='h-12 border-2 p-2.5 bg-[#7fbc8c] hover:bg-[#6a9f75] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:bg-[#6a9f75]'>Log Out</button>
                </>
            ) : (
                <>
                    <button className='h-12 border-2 p-2.5 bg-[#7fbc8c] hover:bg-[#6a9f75] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:bg-[#6a9f75]'>Log In</button>
                </>
            )
        }
    </div>
  )
}

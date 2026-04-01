import type { FooterContentProps } from "../../../lib/type"

const Footer = () => {
  const footerContent:FooterContentProps[] = [
    {
      name:"Contact Us",
      links:[
        {
          email:"yassinbenkacem12@gmail.com",
          phone:"+212 610833077"
        }
      ]
    },
    {
      name:"Quick Links",
      links:[
        {
          name:"About Us",
          link:"/about us"
        },
        {
          name:"Courses",
          link:"/courses"
        },
        {
          name:"Blog",
          link:"/blog"
        }
      ]
    },
    {
      name:"Terms & Services",
      links:[
        {
          name:"Privacy Policy",
        },
        {
          name:"Terms of Service",
        }
        ]
    },
    {
      name:"Social Media",
      links:[
        {
          name:"Instagram",
          link:"/instagram"
        },
        {
          name:"LinkedIn",
          link:"/linkedin"
        },
    ]
    }
  ] 
  return (
    <footer className='w-full py-10 z-10 px-20 bg-stone-900'>
      <h1 className="font-bold text-[10rem] text-center w-full text-yellow-50">
        Focus<span className="text-orange-500">Pro</span>
      </h1>
      <div className="flex justify-around gap-10">
        {
          footerContent.map((content, index) => (
            <div key={index} className="flex flex-col text-stone-300 gap-5">
              <h1 className="text-3xl font-semibold">{content.name}</h1>
              {content.links.map((link, linkIndex) => (
                <div key={linkIndex} className="text-xl hover:text-orange-500 cursor-pointer">
                  {link.name && <a href={link.link || "#"}>{link.name}</a>}
                  {link.email && <p>Email: {link.email}</p>}
                  {link.phone && <p>Phone: {link.phone}</p>}
                </div>
              ))}
            </div>
          ))
        }
      </div>
      <div className="w-full h-0.5 bg-yellow-50/50 mt-10 "/>
     <div className="flex items-center mt-4 w-full justify-center gap-10">
        <p className="text-center text-xl text-stone-300">
          &copy; {new Date().getFullYear()} FocusPro. All rights reserved.
        </p>
        <p className="text-stone-300 text-xl">
          Created by Yassine Benkacem
        </p>
     </div>
    </footer>
  )
}

export default Footer
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Menu } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Main Navbar */}
        <div className="w-full p-4 flex justify-between items-center bg-white shadow-md backdrop-blur-md">
            <div className="logo flex items-center justify-center gap-3">
                <a href="/" className="h-12">
                <img src="https://www.svgrepo.com/show/501875/lighthouse-lighthouse.svg" alt="Logo" className="h-12" />
                </a>

                <h1 className="text-black hidden md:flex text-xl">Admin Dashboard</h1>
            </div>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-6">
                <Link to="/" target='blank' className="font-bold text-xl relative after:block after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-current after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100" >Preview</Link>
                <a href="/services" className="font-bold text-xl relative after:block after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-current after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100" >Slides</a>
                <a href="/preachings" className="font-bold text-xl relative after:block after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-current after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100" >Services</a>
                <Link to="/cards" className="font-bold text-xl relative after:block after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-current after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100" >Cards</Link>
                <a href="/preachings" className="font-bold text-xl relative after:block after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-current after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100" >Quotes</a>
                <a href="/preachings" className="font-bold text-xl relative after:block after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-current after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100" >Service Notes</a>
            </div>


        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(true)}>
          <Menu size={32} />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex flex-col justify-center items-center z-50">
          <button className="absolute top-5 right-5 text-white" onClick={() => setIsOpen(false)}>
            <X size={32} />
          </button>
          <nav className="flex flex-col items-center space-y-8 text-white text-2xl font-bold">
            <Link to="/" target='blank' onClick={() => setIsOpen(false)}>Preview</Link>
            <a href="/services" onClick={() => setIsOpen(false)}>Slides</a>
            <a href="/preachings" onClick={() => setIsOpen(false)}>Services</a>
            <Link to="/cards" onClick={() => setIsOpen(false)}>Cards</Link>
            <a href="/preachings" onClick={() => setIsOpen(false)}>Quotes</a>
            <a href="/preachings" onClick={() => setIsOpen(false)}>Service Notes</a>
          </nav>
        </div>
      )}
    </>
  );
};

export default Navbar;

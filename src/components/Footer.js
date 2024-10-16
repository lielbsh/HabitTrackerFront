import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-background-lightPurple p-4">
        <div className="container mx-auto text-center">
          <p className="text-white">
            &copy; {new Date().getFullYear()} Habit Tracker. All rights reserved.
          </p>
        </div>
    </footer>
  )
}

export default Footer
import React from 'react'
import { Outlet } from 'react-router-dom'
import TopBar from '../topbar/TopBar'

export default function Layout() {
  return (
    <section>
      <TopBar />
      <Outlet />
    </section>
  )
}

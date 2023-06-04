import React from 'react'
import Header from './header'

export default function MainLayout(props) {
  return (
    <>
    <Header />
    {props.children}
    </>
  )
}

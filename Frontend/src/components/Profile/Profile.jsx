import React from 'react'

export default function Profile({userData}) {
  return (
    <>
    <div className="container p-5">
        <h1>Name: {userData?.name}</h1>
    </div>
    </>
  )
}

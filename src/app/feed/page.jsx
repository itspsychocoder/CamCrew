"use client"
import { useUserStore } from '@/store/store';
import React from 'react'

function page() {
    const { loggedInUser, setLoggedInUser } = useUserStore();
  return (
    <div>
      <h1>{loggedInUser?.name}</h1>
      <h1>{loggedInUser?.email}</h1>
      <h1>{loggedInUser?.$id}</h1>
      <h1>{loggedInUser?.role}</h1>
    </div>
  )
}

export default page

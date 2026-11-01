"use client"
import React from "react"
import ActionModal from "../ActionModal"

const ClientProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <ActionModal />
    </>
  )
}

export default ClientProvider

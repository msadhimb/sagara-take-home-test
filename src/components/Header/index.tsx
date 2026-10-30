import React from "react"

const Header = ({ title, subTitle }: { title: string; subTitle: string }) => {
  return (
    <div className="space-y-5">
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="text-lg font-normal">{subTitle}</p>
    </div>
  )
}

export default Header

import Logo from "@/components/Icons/logo"

interface FooterBrandProps {
  description?: string
}

const FooterBrand = ({ description }: FooterBrandProps) => {
  return (
    <div className="col-span-2 mb-8 lg:mb-0">
      <div className="flex items-center lg:justify-start">
        <Logo />
      </div>
      <p className="mt-4 text-sm font-medium text-muted-foreground">
        {description}
      </p>
    </div>
  )
}

export default FooterBrand

import FormInput from "@/components/Form/FormInput"
import Logo from "@/components/Icons/logo"
import { Button } from "@/components/ui/button"

interface FooterBrandProps {
  description?: string
}

const FooterBrand = ({ description }: FooterBrandProps) => {
  return (
    <div className="col-span-2 mb-8 space-y-5 lg:mb-0">
      <div>
        <div className="flex items-center lg:justify-start">
          <Logo />
        </div>
        <p className="mt-4 text-sm font-medium text-muted-foreground">
          {description}
        </p>
      </div>
      <div className="flex w-[25rem] items-center gap-3">
        <FormInput placeholder="Email address" className="" />
        <Button className="mt-2 rounded-sm px-4 py-5">SUBSCRIBE</Button>
      </div>
    </div>
  )
}

export default FooterBrand

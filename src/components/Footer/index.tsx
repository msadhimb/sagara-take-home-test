import { cn } from "cn"
import { FooterProps, Props } from "./type"
import FooterBrand from "./components/FooterBrand"
import FooterSectionColumn from "./components/FooterSectionColumn"
import FooterLegal from "./components/FooterLegal"

const defaultProps: FooterProps = {
  description: "Finely crafted blocks built with Sagara.",
  sections: [
    {
      title: "Product",
      links: [
        { name: "Overview", href: "#" },
        { name: "Pricing", href: "#" },
        { name: "Marketplace", href: "#" },
        { name: "Features", href: "#" },
        { name: "Integrations", href: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About", href: "#" },
        { name: "Team", href: "#" },
        { name: "Blog", href: "#" },
        { name: "Careers", href: "#" },
        { name: "Contact", href: "#" },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "Help center", href: "#" },
        { name: "Documentation", href: "#" },
        { name: "Status", href: "#" },
        { name: "Community", href: "#" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Guides", href: "#" },
        { name: "Templates", href: "#" },
        { name: "Sales", href: "#" },
        { name: "Advertise", href: "#" },
      ],
    },
  ],
  copyright: "© 2026 Sagara. All rights reserved.",
  legalLinks: [
    { name: "Terms and Conditions", href: "#" },
    { name: "Privacy Policy", href: "#" },
  ],
}

const MAX_SECTIONS = 4

const Footer = (props: Props) => {
  const { description, sections, copyright, legalLinks, className } = {
    ...defaultProps,
    ...props,
  }

  const visibleSections = (sections ?? []).slice(0, MAX_SECTIONS)

  return (
    <section
      className={cn("pt-16 pb-24 md:pt-24 lg:pt-32 lg:pb-10", className)}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <footer>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6">
            <FooterBrand description={description} />
            {visibleSections.map((section, sectionIdx) => (
              <FooterSectionColumn key={sectionIdx} section={section} />
            ))}
          </div>
          <FooterLegal copyright={copyright} legalLinks={legalLinks} />
        </footer>
      </div>
    </section>
  )
}

export default Footer

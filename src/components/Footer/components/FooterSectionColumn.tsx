import { FooterSection } from "../type"

const FooterSectionColumn = ({ section }: { section: FooterSection }) => {
  return (
    <div>
      <h3 className="mb-4 text-sm font-semibold tracking-tight">
        {section.title}
      </h3>
      <ul className="space-y-4 text-sm text-muted-foreground">
        {section.links.map((link, linkIdx) => (
          <li key={linkIdx} className="font-medium hover:text-primary">
            <a href={link.href}>{link.name}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FooterSectionColumn

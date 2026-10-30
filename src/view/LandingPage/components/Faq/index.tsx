import { MessageCircle } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"

const faqs = [
  {
    question: "What types of office spaces does CEO SUITE offer?",
    answer:
      "We provide a variety of office spaces including private offices, co-working spaces, meeting rooms, and virtual offices. Whether you need a dedicated workspace or flexible hot-desking options, we have a solution to fit your needs.",
  },
  {
    question: "What amenities are included with a CEO SUITE membership?",
    answer: "Tulis jawaban di sini.",
  },
  {
    question: "Can I customize my office space?",
    answer: "Tulis jawaban di sini.",
  },
  {
    question: "How do I book meeting rooms?",
    answer: "Tulis jawaban di sini.",
  },
  {
    question:
      "Are there any additional costs for using meeting rooms or other facilities?",
    answer: "Tulis jawaban di sini.",
  },
  {
    question: "What is included in the administrative support services?",
    answer: "Tulis jawaban di sini.",
  },
  {
    question: "How can I access CEO SUITE's high-speed internet?",
    answer: "Tulis jawaban di sini.",
  },
  {
    question: "Can I use CEO SUITE's facilities for events?",
    answer: "Tulis jawaban di sini.",
  },
  {
    question: "What are the operating hours for CEO SUITE locations?",
    answer: "Tulis jawaban di sini.",
  },
  {
    question: "How can I contact CEO SUITE for more information or support?",
    answer: "Tulis jawaban di sini.",
  },
]

const Faq = () => {
  return (
    <section className="grid grid-cols-1 gap-10 lg:grid-cols-5">
      <div className="flex flex-col justify-between gap-10 lg:col-span-2">
        <div className="space-y-2">
          <h2 className="text-2xl leading-tight font-semibold sm:text-3xl lg:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-neutral-500 lg:text-base">
            Everything You Need to Know About CEO SUITE Services &amp;
            Facilities!
          </p>
        </div>

        <div className="relative flex min-h-28 w-full max-w-xs flex-col justify-between space-y-3 overflow-hidden rounded-xl bg-primary/10 px-5 py-4 sm:py-3">
          <p className="text-sm font-medium text-primary">
            Haven&apos;t answered your question?
          </p>
          <Button className="w-fit bg-primary text-xs hover:bg-primary/90">
            <MessageCircle className="size-3.5" />
            Contact Us
          </Button>

          <MessageCircle
            className="absolute top-0 -right-2 size-20 text-primary/10"
            aria-hidden
          />
        </div>
      </div>

      <Accordion
        type="single"
        collapsible
        defaultValue="faq-0"
        className="lg:col-span-3"
      >
        {faqs.map((faq, index) => (
          <AccordionItem key={faq.question} value={`faq-${index}`}>
            <AccordionTrigger className="text-base font-medium hover:no-underline lg:text-lg">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="py-4 text-sm leading-relaxed text-neutral-500 lg:py-5 lg:text-base">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}

export default Faq

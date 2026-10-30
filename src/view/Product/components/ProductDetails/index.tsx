interface ProductDetailsProps {
  description: string
}

const ProductDetails = ({ description }: ProductDetailsProps) => {
  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold">Details</h2>
      <p className="text-sm leading-relaxed text-neutral-700">{description}</p>
    </div>
  )
}

export default ProductDetails

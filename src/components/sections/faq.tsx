export default function Faq() {
  const items = [
    {
      q: "Which cryptocurrencies do you support?",
      a: "We support major cryptocurrencies including BTC, ETH, USDT, USDC, and more across multiple chains like Ethereum, Polygon, and BSC.",
    },
    {
      q: "How quickly are payments processed?",
      a: "Most payments are confirmed within 5–15 minutes, depending on the blockchain confirmations (typically 1–3 blocks).",
    },
    {
      q: "Do you charge transaction fees?",
      a: "We operate on a transparent fee structure. Contact us for detailed pricing based on your volume.",
    },
    {
      q: "Is the integration difficult?",
      a: "No. We provide comprehensive documentation and SDKs. Most developers can integrate within hours.",
    },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 space-y-8">
        <div className="mx-auto flex max-w-3xl flex-col text-left md:text-center">
          <h2 className="mb-3 font-extralight text-3xl tracking-tight md:mb-4 lg:mb-6 lg:text-4xl">Frequently asked questions</h2>
          <p className="text-white/75 lg:text-lg font-light leading-relaxed tracking-tight">
            Find answers to common questions about our crypto payment platform.
          </p>
        </div>
        <div className="mx-auto w-full lg:max-w-3xl divide-y divide-white/10">
          {items.map((item, idx) => (
            <details key={idx} className="group py-4">
              <summary className="flex cursor-pointer items-center justify-between text-left text-lg font-light tracking-tight">
                {item.q}
                <span className="ml-4">+</span>
              </summary>
              <div className="mt-2 text-black/75 dark:text-white/75 lg:text-lg font-light leading-relaxed tracking-tight">
                {item.a}
              </div>
            </details>
          ))}
        </div>
        <div className="mx-auto flex max-w-4xl flex-col items-center rounded-lg bg-accent p-6 text-center md:rounded-xl lg:p-8">
          <div className="relative flex items-center justify-center gap-6">
            <img className="size-16 rounded-full bg-white border" src="/avatar/2.png" alt="Avatar 2" />
            <img className="size-16 rounded-full bg-white border" src="/avatar/5.png" alt="Avatar 5" />
            <img className="size-16 rounded-full bg-white border" src="/avatar/4.png" alt="Avatar 4" />
          </div>
          <h3 className="mt-4 mb-2 max-w-3xl font-light lg:text-lg tracking-tight">Need more support?</h3>
          <p className="mb-6 max-w-3xl text-black/75 dark:text-white/75 lg:text-lg font-light leading-relaxed tracking-tight">
            Our dedicated support team is here to help you with integration questions and technical concerns.
          </p>
          <a className="rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm hover:bg-primary/90" href="#contact">Contact Support</a>
        </div>
      </div>
    </section>
  );
}



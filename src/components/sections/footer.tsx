export default function Footer() {
  const sections = [
    {
      title: "Services",
      links: [
        { name: "Buy Crypto", href: "#buy-crypto" },
        { name: "Trade", href: "#trade" },
        { name: "Payments", href: "#payments" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "FAQ", href: "#faq" },
      ],
    },
  ];

  const legalLinks = [
    { name: "Terms and Conditions", href: "#" },
    { name: "Privacy Policy", href: "#" },
  ];

  return (
    <section className="py-32">
      <div className="container mx-auto px-4">
        <div className="flex w-full flex-col justify-between gap-10 lg:flex-row lg:items-start lg:text-left">
          <div className="flex w-full flex-col justify-between gap-6 lg:items-start">
            <div className="flex items-center lg:justify-start">
              <a href="#">
                <img src="/images/onepay.png" alt="logo" title="OnePay" className="h-12" />
              </a>
            </div>
            <p className="max-w-[70%] text-muted-foreground text-sm">
              Advanced Web3 payment infrastructure enabling seamless cryptocurrency transactions for modern businesses.
            </p>
            <ul className="flex items-center space-x-6 text-muted-foreground">
              {/* Social links placeholder */}
            </ul>
          </div>
          <div className="grid w-full gap-6 md:grid-cols-3 lg:gap-20">
            {sections.map((section) => (
              <div key={section.title}>
                <h3 className="mb-4 font-bold">{section.title}</h3>
                <ul className="space-y-3 text-muted-foreground text-sm">
                  {section.links.map((link) => (
                    <li key={link.name} className="font-medium hover:text-primary">
                      <a href={link.href}>{link.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8 flex flex-col justify-between gap-4 border-t py-8 font-medium text-muted-foreground text-xs md:flex-row md:items-center md:text-left">
          <p className="order-2 lg:order-1">© 2025 OnePay. All rights reserved.</p>
          <ul className="order-1 flex flex-col gap-2 md:order-2 md:flex-row">
            {legalLinks.map((link) => (
              <li key={link.name} className="hover:text-primary">
                <a href={link.href}> {link.name}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}



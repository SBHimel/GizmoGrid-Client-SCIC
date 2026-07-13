import { FiCheckCircle } from 'react-icons/fi';

export default function ReviewsAndFAQ() {
  const reviews = [
    { name: "Alex K.", role: "Full Stack Developer", review: "The Next.js framework deployment gear I ordered arrived within 24 hours. The condition was flawless." },
    { name: "Sarah M.", role: "UI/UX Specialist", review: "Incredible user experience both on the interface and during physical delivery. Descriptions match perfectly." },
    { name: "Rahat H.", role: "Tech Enthusiast", review: "GizmoGrid has become my primary trusted source for ecosystem gadgets. Flawless filtered sorting." }
  ];

  const faqs = [
    { q: "Are all products hosted on GizmoGrid authentic?", a: "Yes, every listing goes through strict inventory validation checks before dropping live onto the dashboard pipelines." },
    { q: "How long does shipping normally take?", a: "Metro areas take between 24-48 hours. Nationwide addresses are resolved securely within 3-5 working days." }
  ];

  return (
    <>
      {/* Testimonials */}
      <section className="bg-slate-900 border-t border-slate-800 py-16 mt-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-black uppercase tracking-tight border-b-4 border-emerald-500 pb-2 mb-12 inline-block">
            Verified Buyer Reviews
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {reviews.map((t, i) => (
              <div key={i} className="p-6 bg-slate-950 rounded-xl border border-slate-800 flex flex-col justify-between">
                <p className="text-sm font-medium text-slate-300 italic leading-relaxed mb-6">"{t.review}"</p>
                <div className="flex items-center space-x-3 pt-4 border-t border-slate-900">
                  <div className="h-8 w-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-black uppercase text-xs text-cyan-400">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-white uppercase tracking-wide">{t.name}</h4>
                    <p className="text-xs text-slate-500 font-bold">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black uppercase tracking-tight border-b-4 border-amber-500 pb-2 inline-block">
            Frequently Asked Questions
          </h2>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="p-5 bg-slate-900 border border-slate-800 rounded-xl">
              <h3 className="text-md font-black text-white uppercase flex items-center mb-2 tracking-wide">
                <FiCheckCircle className="text-amber-400 mr-2 flex-shrink-0" /> {faq.q}
              </h3>
              <p className="text-sm font-medium text-slate-400 pl-6 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
"use client";

export default function FAQSection() {
  const faqs = [
    {
      question: "GizmoGrid কি সম্পূর্ণ ফ্রিতে ব্যবহার করা যাবে?",
      answer:
        "হ্যাঁ! বায়ার এবং সেলার হিসেবে অ্যাকাউন্ট তৈরি করা সম্পূর্ণ ফ্রি। যে কেউ প্রোডাক্ট লিস্টিং বা অর্ডার দেখতে পারেন।",
    },
    {
      question: "আমরা কীভাবে প্রোডাক্ট আপলোড করতে পারি?",
      answer:
        "প্রথমে একটি অ্যাকাউন্ট তৈরি করে Profile এ গিয়ে 'Become Seller' করতে হবে। এরপর 'Add Product' সেকশন থেকে ছবি, টাইটেল এবং প্রাইস দিয়ে প্রোডাক্ট আপলোড করা যাবে।",
    },
    {
      question: "ডাটাবেজ ও সিকিউরিটি কতটা নিরাপদ?",
      answer:
        "GizmoGrid এ Better Auth ব্যবহার করা হয়েছে এবং ব্যাকএন্ডে JWT Token Verification-এর মাধ্যমে API সুরক্ষিত রাখা হয়েছে।",
    },
  ];

  return (
    <section className="space-y-6">
      <div className="border-l-4 border-yellow-500 pl-4">
        <h2 className="text-xl font-black uppercase tracking-tight text-white">
          Frequently Asked Questions
        </h2>
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
          Frequently asked operational inquiries
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <details
            key={index}
            className="group rounded-2xl border border-slate-800 bg-slate-900/20 p-5"
          >
            <summary className="cursor-pointer list-none font-bold text-white flex justify-between items-center">
              {faq.question}
              <span className="transition-transform group-open:rotate-45 text-cyan-400 text-xl">
                +
              </span>
            </summary>

            <p className="mt-4 text-sm leading-7 text-slate-400">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
// frontend/src/app/contact/page.tsx
export default function ContactPage() {
  return (
    <section className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
      <form className="max-w-md">
        <input 
          type="text" 
          placeholder="Name" 
          className="w-full p-2 mb-4 border rounded"
        />
        <input 
          type="email" 
          placeholder="Email" 
          className="w-full p-2 mb-4 border rounded"
        />
        <textarea 
          placeholder="Message" 
          className="w-full p-2 mb-4 border rounded h-32"
        />
        <button 
          type="submit" 
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Send
        </button>
      </form>
    </section>
  );
}
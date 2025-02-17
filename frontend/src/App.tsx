import Navbar from './components/Navbar'
import Footer from "./components/Footer";

function App() {
  return (
      <div className="min-h-screen bg-gray-100">
        <Navbar/>
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold">Welcome to X-kom Clone</h1>
          {/* Add more content to enable scrolling */}
          {Array.from({length: 20}).map((_, i) => (
              <p key={i} className="my-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
          ))}
        </div>
      <Footer/>
</div>
)
}

export default App

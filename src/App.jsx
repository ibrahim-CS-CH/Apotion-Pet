import { createRoot } from 'react-dom/client';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
// import Pet from './components/Pet';
import SearchParams from './pages/SearchParams';
import Details from './pages/Details';
import NotFound from './pages/NotFound';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import AdoptedPetContext from './contexts/AdoptedPetContext';

const queryClient = new QueryClient( {
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity
    },
  }, 
});
const App = () => { 

  const adoptedPet= useState(null)
  return (
    <BrowserRouter>
      <AdoptedPetContext.Provider value={adoptedPet}>
        <QueryClientProvider client={queryClient}>
          <header>
            <Link to="/">Adopt Me!</Link>
            {/* <button style={{ height:"30px", marginLeft:"30px", marginTop:"40px"}} onClick={()=>toggleTheme()}>Mode</button> */}
          </header>
          <Routes>
            <Route path="/details/:id" element={<Details />} />
            <Route path="/" element={<SearchParams  />} /> 
            <Route path="*" element={<NotFound />} />
          </Routes>
          <ReactQueryDevtools initialIsOpen={false}/>
        </QueryClientProvider>  
        </AdoptedPetContext.Provider> 
    </BrowserRouter>
  );
};
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);

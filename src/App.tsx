import { BrowserRouter, Route, Routes } from 'react-router-dom'

import HashScroll from '@/components/HashScroll'
import PageCurtain from '@/components/PageCurtain'
import SiteFooter from '@/components/SiteFooter'
import SiteHeader from '@/components/SiteHeader'
import SiteMotion from '@/components/SiteMotion'
import AboutPage from '@/pages/AboutPage'
import HomePage from '@/pages/HomePage'
import InsightDetailPage from '@/pages/InsightDetailPage'
import InsightsPage from '@/pages/InsightsPage'
import VacanciesPage from '@/pages/VacanciesPage'
import VacancyDetailPage from '@/pages/VacancyDetailPage'
import WhatWeDoPage from '@/pages/WhatWeDoPage'

export default function App() {
  return (
    <BrowserRouter>
      <div className="site-shell">
        <HashScroll />
        <PageCurtain />
        <SiteMotion />
        <SiteHeader />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/what-we-do" element={<WhatWeDoPage />} />
          <Route path="/what-we-do/:unit" element={<WhatWeDoPage />} />
          <Route path="/insights" element={<InsightsPage />} />
          <Route path="/insights/:id" element={<InsightDetailPage />} />
          <Route path="/vacancies" element={<VacanciesPage />} />
          <Route path="/vacancies/:id" element={<VacancyDetailPage />} />
        </Routes>
        <SiteFooter />
      </div>
    </BrowserRouter>
  )
}

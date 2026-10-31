import { BrowserRouter, Navigate, Route, Routes, useParams } from 'react-router-dom'

import HashScroll from '@/components/HashScroll'
import PageCurtain from '@/components/PageCurtain'
import SiteFooter from '@/components/SiteFooter'
import SiteHeader from '@/components/SiteHeader'
import SiteMotion from '@/components/SiteMotion'
import AboutPage from '@/pages/AboutPage'
import ContactPage from '@/pages/ContactPage'
import HomePage from '@/pages/HomePage'
import IndustriesPage from '@/pages/IndustriesPage'
import IndustryDetailPage from '@/pages/IndustryDetailPage'
import InsightDetailPage from '@/pages/InsightDetailPage'
import InsightKindPage from '@/pages/InsightKindPage'
import VacanciesPage from '@/pages/VacanciesPage'
import VacancyDetailPage from '@/pages/VacancyDetailPage'
import WhatWeDoPage from '@/pages/WhatWeDoPage'

function RedirectCaseStudy() {
  const { id } = useParams()
  return <Navigate to={id ? `/insights/${id}` : '/insights/stories'} replace />
}

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
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutPage />} />
          <Route path="/what-we-do" element={<Navigate to="/what-we-do/hcm" replace />} />
          <Route path="/what-we-do/industries" element={<IndustriesPage />} />
          <Route path="/what-we-do/industries/:slug" element={<IndustryDetailPage />} />
          <Route path="/what-we-do/:unit/:section" element={<WhatWeDoPage />} />
          <Route path="/what-we-do/:unit" element={<WhatWeDoPage />} />
          <Route path="/case-studies" element={<Navigate to="/insights/stories" replace />} />
          <Route path="/case-studies/:id" element={<RedirectCaseStudy />} />
          <Route path="/insights" element={<Navigate to="/insights/articles" replace />} />
          <Route path="/insights/articles" element={<InsightKindPage kind="article" />} />
          <Route path="/insights/news" element={<InsightKindPage kind="news" />} />
          <Route path="/insights/stories" element={<InsightKindPage kind="story" />} />
          <Route path="/insights/:id" element={<InsightDetailPage />} />
          <Route path="/vacancies" element={<VacanciesPage />} />
          <Route path="/vacancies/:id" element={<VacancyDetailPage />} />
        </Routes>
        <SiteFooter />
      </div>
    </BrowserRouter>
  )
}

import { BrowserRouter, Route, Routes } from 'react-router-dom'

import HashScroll from '@/components/HashScroll'
import PageCurtain from '@/components/PageCurtain'
import SiteFooter from '@/components/SiteFooter'
import SiteHeader from '@/components/SiteHeader'
import SiteMotion from '@/components/SiteMotion'
import AboutPage from '@/pages/AboutPage'
import CaseStudiesPage from '@/pages/CaseStudiesPage'
import CaseStudyDetailPage from '@/pages/CaseStudyDetailPage'
import HomePage from '@/pages/HomePage'
import InsightDetailPage from '@/pages/InsightDetailPage'
import InsightKindPage from '@/pages/InsightKindPage'
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
          <Route path="/case-studies" element={<CaseStudiesPage />} />
          <Route path="/case-studies/:id" element={<CaseStudyDetailPage />} />
          <Route path="/insights" element={<InsightsPage />} />
          <Route path="/insights/articles" element={<InsightKindPage kind="article" />} />
          <Route path="/insights/news" element={<InsightKindPage kind="news" />} />
          <Route path="/insights/:id" element={<InsightDetailPage />} />
          <Route path="/vacancies" element={<VacanciesPage />} />
          <Route path="/vacancies/:id" element={<VacancyDetailPage />} />
        </Routes>
        <SiteFooter />
      </div>
    </BrowserRouter>
  )
}

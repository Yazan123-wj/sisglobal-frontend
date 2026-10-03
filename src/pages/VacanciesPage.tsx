import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

import heroNetworkImage from '@/assets/sis-global-network-hero.png'
import { vacancies, vacancyLocations } from '@/data/vacancies'

export default function VacanciesPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') ?? '')
  const [location, setLocation] = useState(searchParams.get('location') ?? '')

  const appliedQuery = searchParams.get('q') ?? ''
  const appliedLocation = searchParams.get('location') ?? ''

  const results = useMemo(() => {
    const needle = appliedQuery.trim().toLowerCase()
    return vacancies.filter((vacancy) => {
      const matchesQuery = !needle
        || vacancy.title.toLowerCase().includes(needle)
        || vacancy.unit.toLowerCase().includes(needle)
        || vacancy.summary.toLowerCase().includes(needle)
        || vacancy.overview.toLowerCase().includes(needle)
      const matchesLocation = !appliedLocation || vacancy.location === appliedLocation
      return matchesQuery && matchesLocation
    })
  }, [appliedQuery, appliedLocation])

  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const next = new URLSearchParams()
    if (query.trim()) next.set('q', query.trim())
    if (location) next.set('location', location)
    setSearchParams(next)
  }

  const clearFilters = () => {
    setQuery('')
    setLocation('')
    setSearchParams({})
  }

  return (
    <main className="vacancies-page">
      <section className="about-hero vacancies-hero" aria-labelledby="vacancies-title">
        <div className="about-hero-visual" style={{ backgroundImage: `url(${heroNetworkImage})` }} aria-hidden="true" />
        <div className="container about-hero-inner">
          <div className="about-hero-copy">
            <p className="eyebrow light">Careers</p>
            <h1 id="vacancies-title">Find your next role at SIS Global.</h1>
            <p>Search open vacancies by job title or keyword, then filter by the office location that works for you.</p>
          </div>
        </div>
      </section>

      <form className="vacancy-search" onSubmit={submitSearch} role="search">
        <div className="container vacancy-search-inner">
          <label className="vacancy-field">
            <span>Job title or keyword</span>
            <input
              name="q"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Field engineer, payroll, ICT…"
            />
          </label>
          <label className="vacancy-field">
            <span>Location</span>
            <select name="location" value={location} onChange={(event) => setLocation(event.target.value)}>
              <option value="">All locations</option>
              {vacancyLocations.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </label>
          <button className="button button-navy" type="submit">Search</button>
        </div>
      </form>

      <section className="section vacancy-results">
        <div className="container">
          <div className="vacancy-results-head">
            <p>{results.length} {results.length === 1 ? 'vacancy' : 'vacancies'}</p>
            {(appliedQuery || appliedLocation) ? (
              <button type="button" className="text-link" onClick={clearFilters}>Clear filters</button>
            ) : null}
          </div>
          {results.length ? (
            <ul className="vacancy-list">
              {results.map((vacancy) => (
                <li key={vacancy.id}>
                  <article className="vacancy-card">
                    <div>
                      <p className="vacancy-meta">{vacancy.unit} · {vacancy.type}</p>
                      <h2>{vacancy.title}</h2>
                      <p>{vacancy.summary}</p>
                      <p className="vacancy-place">{vacancy.location}</p>
                    </div>
                    <Link className="button button-navy" to={`/vacancies/${vacancy.id}`}>Learn More</Link>
                  </article>
                </li>
              ))}
            </ul>
          ) : (
            <p className="vacancy-empty">No vacancies match that search. Try another title, keyword or location.</p>
          )}
        </div>
      </section>
    </main>
  )
}

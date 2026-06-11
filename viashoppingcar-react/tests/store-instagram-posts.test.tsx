import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { StoreDetailPage } from '../src/pages/store-detail-page'
import { storesCatalog } from '../src/site-data'

describe('Store Instagram Posts Feature', () => {
  const pulseCar = storesCatalog.find((store) => store.slug === 'pulse-car')

  it('renders Instagram posts when store has posts', () => {
    render(
      <MemoryRouter initialEntries={[`/lojas/${pulseCar?.slug}`]}>
        <Routes>
          <Route path="/lojas/:slug" element={<StoreDetailPage />} />
        </Routes>
      </MemoryRouter>
    )

    // Check for Instagram title
    expect(screen.getByText('Instagram da Pulse Car')).toBeTruthy()
    
    // Check for Instagram description
    expect(screen.getByText('Acompanhe as novidades e promoções do Pulse Car no Instagram')).toBeTruthy()
    
    // Check for post content
    expect(screen.getByAltText('Toyota Corolla em destaque')).toBeTruthy()
    expect(screen.getByText('124')).toBeTruthy()
    expect(screen.getByText('8')).toBeTruthy()
  })

  it('displays Instagram post cards with correct data', () => {
    render(
      <MemoryRouter initialEntries={[`/lojas/${pulseCar?.slug}`]}>
        <Routes>
          <Route path="/lojas/:slug" element={<StoreDetailPage />} />
        </Routes>
      </MemoryRouter>
    )

    if (pulseCar?.posts && pulseCar.posts.length > 0) {
      const firstPost = pulseCar.posts[0]

      expect(screen.getByAltText(firstPost.alt)).toBeTruthy()
      expect(screen.getByText(firstPost.likes.toString())).toBeTruthy()
      expect(screen.getByText(firstPost.comments.toString())).toBeTruthy()
    }
  })

  it('posts link to Instagram profile when present', () => {
    render(
      <MemoryRouter initialEntries={[`/lojas/${pulseCar?.slug}`]}>
        <Routes>
          <Route path="/lojas/:slug" element={<StoreDetailPage />} />
        </Routes>
      </MemoryRouter>
    )

    const instagramLink = screen.getByRole('link', { name: /Instagram/i })
    expect(instagramLink.getAttribute('href')).toBeTruthy()
    expect(instagramLink.getAttribute('target')).toBe('_blank')
  })
})
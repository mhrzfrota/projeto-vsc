import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="container page-hero-wrap reveal">
          <p className="eyebrow">Erro 404</p>
          <h1>Página não encontrada</h1>
          <p>
            O endereço que você tentou acessar não existe ou foi movido. Volte para a home e
            continue navegando pelo Via Shopping Car.
          </p>
          <div className="page-hero-actions">
            <Link className="btn btn-primary" to="/">
              <ArrowLeft size={16} /> Voltar para a home
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

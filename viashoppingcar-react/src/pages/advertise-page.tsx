import { type FormEvent, useState } from 'react'
import { ArrowRight, CarFront, Megaphone, Repeat, Search } from 'lucide-react'
import { createWhatsappLink } from '../site-data'

type RequestType = 'vender' | 'trocar' | 'anunciar' | 'procurar'

const requestOptions: Array<{
  description: string
  label: string
  value: RequestType
}> = [
  {
    value: 'vender',
    label: 'Vender meu veículo',
    description: 'Receba uma avaliação e converse com a equipe sobre as melhores condições.',
  },
  {
    value: 'trocar',
    label: 'Trocar por outro carro',
    description: 'Informe seu veículo atual e o tipo de carro que você procura.',
  },
  {
    value: 'anunciar',
    label: 'Anunciar no site',
    description: 'Envie os dados para entender como colocar seu veículo na vitrine.',
  },
  {
    value: 'procurar',
    label: 'Solicitar um carro',
    description: 'Conte qual modelo você quer encontrar no Via Shopping Car.',
  },
]

const requestLabels: Record<RequestType, string> = {
  vender: 'Vender meu veículo',
  trocar: 'Trocar por outro carro',
  anunciar: 'Anunciar no site',
  procurar: 'Solicitar um carro',
}

export function AdvertisePage() {
  const [requestType, setRequestType] = useState<RequestType>('vender')
  const [hasConsent, setHasConsent] = useState(false)
  const [feedback, setFeedback] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!hasConsent) {
      setFeedback('Confirme a autorização de contato para enviar a solicitação.')
      return
    }

    const form = new FormData(event.currentTarget)
    const name = String(form.get('name') ?? '').trim()
    const phone = String(form.get('phone') ?? '').trim()
    const brand = String(form.get('brand') ?? '').trim()
    const model = String(form.get('model') ?? '').trim()
    const year = String(form.get('year') ?? '').trim()
    const mileage = String(form.get('mileage') ?? '').trim()
    const expectedValue = String(form.get('expectedValue') ?? '').trim()
    const message = String(form.get('message') ?? '').trim()

    const whatsappMessage = [
      'Olá! Quero fazer uma solicitação pelo site do Via Shopping Car.',
      '',
      `Tipo de solicitação: ${requestLabels[requestType]}`,
      `Nome: ${name}`,
      `WhatsApp: ${phone}`,
      brand && `Marca: ${brand}`,
      model && `Modelo: ${model}`,
      year && `Ano: ${year}`,
      mileage && `Quilometragem: ${mileage}`,
      expectedValue && `Valor esperado: ${expectedValue}`,
      message && `Observações: ${message}`,
    ]
      .filter(Boolean)
      .join('\n')

    setFeedback('Abrindo WhatsApp com sua solicitação preenchida.')
    window.open(createWhatsappLink(whatsappMessage), '_blank', 'noopener,noreferrer')
  }

  return (
    <main>
      <section className="advertise-hero">
        <div className="container advertise-hero-content reveal">
          <p className="eyebrow">Anuncie aqui</p>
          <h1>Venda, troque ou anuncie seu veículo no Via Shopping Car</h1>
          <p>
            Sua proposta começa em uma vitrine feita para quem já está procurando carro em
            Fortaleza.
          </p>
          <a className="btn btn-primary" href="#anuncie-form">
            Começar solicitação <ArrowRight size={16} />
          </a>
        </div>
      </section>

      <section className="advertise section">
        <div className="container advertise-grid">
          <div className="advertise-copy reveal">
            <p className="eyebrow eyebrow-dark">Como podemos ajudar?</p>
            <h2>Quer vender seu veículo com segurança e agilidade?</h2>
            <div className="advertise-option-list">
              {requestOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={`advertise-option${requestType === option.value ? ' is-active' : ''}`}
                  onClick={() => setRequestType(option.value)}
                >
                  <span className="advertise-option-icon">{renderRequestIcon(option.value)}</span>
                  <span>
                    <strong>{option.label}</strong>
                    <small>{option.description}</small>
                  </span>
                </button>
              ))}
            </div>
          </div>

          <form id="anuncie-form" className="advertise-form reveal delay-1" onSubmit={handleSubmit}>
            <div className="advertise-form-heading">
              <p className="eyebrow eyebrow-dark">Formulário</p>
              <h2>{requestLabels[requestType]}</h2>
            </div>

            <label>
              Nome completo
              <input name="name" type="text" placeholder="Seu nome" required />
            </label>

            <label>
              WhatsApp
              <input name="phone" type="tel" placeholder="(85) 99999-9999" required />
            </label>

            <div className="advertise-form-row">
              <label>
                Marca
                <input name="brand" type="text" placeholder="Ex: Toyota" />
              </label>
              <label>
                Modelo
                <input name="model" type="text" placeholder="Ex: Corolla" />
              </label>
            </div>

            <div className="advertise-form-row">
              <label>
                Ano
                <input name="year" type="text" inputMode="numeric" placeholder="Ex: 2021" />
              </label>
              <label>
                Quilometragem
                <input name="mileage" type="text" placeholder="Ex: 45.000 km" />
              </label>
            </div>

            <label>
              Valor esperado
              <input name="expectedValue" type="text" placeholder="Opcional" />
            </label>

            <label>
              Mensagem adicional
              <textarea
                name="message"
                rows={4}
                placeholder="Conte detalhes do veículo, troca desejada ou carro que você procura."
              />
            </label>

            <label className="checkbox-row advertise-consent">
              <input
                type="checkbox"
                checked={hasConsent}
                onChange={(event) => {
                  setHasConsent(event.target.checked)
                  setFeedback('')
                }}
              />
              <span>Autorizo o contato da equipe do Via Shopping Car pelo WhatsApp informado.</span>
            </label>

            <button type="submit" className="btn btn-primary full-width">
              Enviar solicitação <ArrowRight size={16} />
            </button>

            {feedback && <p className="advertise-feedback">{feedback}</p>}
          </form>
        </div>
      </section>
    </main>
  )
}

function renderRequestIcon(type: RequestType) {
  if (type === 'trocar') return <Repeat size={20} />
  if (type === 'anunciar') return <Megaphone size={20} />
  if (type === 'procurar') return <Search size={20} />
  return <CarFront size={20} />
}

import { useMemo, useState } from 'react'
import { Car, Clock, Search, SlidersHorizontal } from 'lucide-react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { createWhatsappLink, stores as allStores, vehicles } from '../site-data'

type InventorySort = 'recent' | 'price-low' | 'price-high' | 'km-low'

export function InventoryPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const [keyword, setKeyword] = useState('')
  const [brand, setBrand] = useState(searchParams.get('brand') ?? '')
  const [model, setModel] = useState(searchParams.get('model') ?? '')
  const [store, setStore] = useState(searchParams.get('store') ?? '')
  const [year, setYear] = useState(searchParams.get('yearFrom') ?? '')
  const [type, setType] = useState(searchParams.get('type') ?? '')
  const [transmission, setTransmission] = useState('')
  const [fuel, setFuel] = useState('')
  const [color, setColor] = useState('')
  const [sort, setSort] = useState<InventorySort>('recent')

  const brands = useMemo(
    () => [...new Set(vehicles.map((vehicle) => vehicle.brand))].sort(),
    [],
  )

  const models = useMemo(
    () =>
      [
        ...new Set(
          vehicles
            .filter((vehicle) => !brand || vehicle.brand === brand)
            .map((vehicle) => vehicle.model),
        ),
      ],
    [brand],
  )

  const stores = useMemo(
    () => [...new Set([...allStores, ...vehicles.map((vehicle) => vehicle.store)])].sort(),
    [],
  )

  const years = useMemo(
    () => [...new Set(vehicles.map((vehicle) => String(vehicle.year)))].sort().reverse(),
    [],
  )

  const transmissions = useMemo(
    () => [...new Set(vehicles.map((vehicle) => vehicle.transmission))].sort(),
    [],
  )

  const fuels = useMemo(
    () => [...new Set(vehicles.map((vehicle) => vehicle.fuel))].sort(),
    [],
  )

  const colors = useMemo(
    () => [...new Set(vehicles.map((vehicle) => vehicle.color))].sort(),
    [],
  )

  const filteredVehicles = useMemo(() => {
    const normalizedKeyword = keyword.trim().toLowerCase()

    const refined = vehicles.filter((vehicle) => {
      const matchesKeyword =
        !normalizedKeyword ||
        `${vehicle.brand} ${vehicle.model} ${vehicle.subtitle} ${vehicle.color} ${vehicle.store}`
          .toLowerCase()
          .includes(normalizedKeyword)

      const matchesBrand = !brand || vehicle.brand === brand
      const matchesModel = !model || vehicle.model === model
      const matchesStore = !store || vehicle.store === store
      const matchesYear = !year || String(vehicle.year) === year
      const matchesType = !type || vehicle.type === type
      const matchesTransmission = !transmission || vehicle.transmission === transmission
      const matchesFuel = !fuel || vehicle.fuel === fuel
      const matchesColor = !color || vehicle.color === color

      return (
        matchesKeyword &&
        matchesBrand &&
        matchesModel &&
        matchesStore &&
        matchesYear &&
        matchesType &&
        matchesTransmission &&
        matchesFuel &&
        matchesColor
      )
    })

    return refined.sort((first, second) => {
      if (sort === 'price-low') {
        return first.price - second.price
      }

      if (sort === 'price-high') {
        return second.price - first.price
      }

      if (sort === 'km-low') {
        return first.km - second.km
      }

      return second.year - first.year || first.km - second.km
    })
  }, [brand, color, fuel, keyword, model, sort, store, transmission, type, year])

  function handleResetFilters() {
    setKeyword('')
    setBrand('')
    setModel('')
    setStore('')
    setYear('')
    setType('')
    setTransmission('')
    setFuel('')
    setColor('')
    setSort('recent')
  }

  function handleBackToHome() {
    navigate({
      pathname: '/',
      hash: '#estoque',
    })
  }

  return (
    <main className="inventory-page">
      <section className="inventory-page-section">
        <div className="container">
          <div className="inventory-page-heading">
            <div>
              <p className="eyebrow eyebrow-dark">Showroom</p>
              <h2>Encontre seu carro ou sua moto</h2>
            </div>
            <button type="button" className="btn btn-secondary" onClick={handleBackToHome}>
              Voltar para a home
            </button>
          </div>

          <div className="inventory-page-layout">
            <aside className="inventory-panel">
              <div className="inventory-panel-card inventory-panel-count">
                <strong>{filteredVehicles.length}</strong>
                <span>veículos a caminho</span>
                <button type="button" className="inventory-clear" onClick={handleResetFilters}>
                  Limpar filtros
                </button>
              </div>

              <div className="inventory-panel-card">
                <h3>Busca por palavra-chave</h3>
                <label className="inventory-search">
                  <Search size={16} />
                  <input
                    type="search"
                    value={keyword}
                    onChange={(event) => setKeyword(event.target.value)}
                    placeholder="Digite marca, modelo, cor ou loja"
                  />
                </label>
              </div>

              <div className="inventory-panel-card inventory-filter-card">
                <div className="inventory-filter-title">
                  <h3>Refine sua busca</h3>
                  <SlidersHorizontal size={16} />
                </div>

                <label className="inventory-field">
                  <span>Lojas</span>
                  <select value={store} onChange={(event) => setStore(event.target.value)}>
                    <option value="">Todas</option>
                    {stores.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="inventory-field">
                  <span>Marca</span>
                  <select
                    value={brand}
                    onChange={(event) => {
                      setBrand(event.target.value)
                      setModel('')
                    }}
                  >
                    <option value="">Todas</option>
                    {brands.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="inventory-field">
                  <span>Modelo</span>
                  <select value={model} onChange={(event) => setModel(event.target.value)}>
                    <option value="">Todos</option>
                    {models.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="inventory-field">
                  <span>Ano</span>
                  <select value={year} onChange={(event) => setYear(event.target.value)}>
                    <option value="">Todos</option>
                    {years.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="inventory-field">
                  <span>Câmbio</span>
                  <select
                    value={transmission}
                    onChange={(event) => setTransmission(event.target.value)}
                  >
                    <option value="">Todos</option>
                    {transmissions.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="inventory-field">
                  <span>Combustível</span>
                  <select value={fuel} onChange={(event) => setFuel(event.target.value)}>
                    <option value="">Todos</option>
                    {fuels.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="inventory-field">
                  <span>Cor</span>
                  <select value={color} onChange={(event) => setColor(event.target.value)}>
                    <option value="">Todas</option>
                    {colors.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </aside>

            <div className="inventory-results">
              <div className="inventory-results-toolbar">
                <div className="inventory-results-copy">
                  <strong>{filteredVehicles.length} veículos em breve</strong>
                  <span>novos carros e motos estão chegando ao showroom</span>
                </div>
                <div className="inventory-toolbar-actions">
                  <label className="inventory-sort">
                    Ordenar por
                    <select
                      value={sort}
                      onChange={(event) => setSort(event.target.value as InventorySort)}
                    >
                      <option value="recent">Ano</option>
                      <option value="price-low">Preço menor</option>
                      <option value="price-high">Preço maior</option>
                      <option value="km-low">Km menor</option>
                    </select>
                  </label>
                </div>
              </div>

              {filteredVehicles.length > 0 ? (
                <div className="inventory-list">
                  {filteredVehicles.map((vehicle) => (
                    <article key={vehicle.id} className="inventory-row inventory-row-soon">
                      <div className="inventory-row-media inventory-row-media-soon">
                        <Car size={34} />
                        <span>Em breve</span>
                      </div>

                      <div className="inventory-row-content">
                        <div className="inventory-row-heading">
                          <div>
                            <h3>Em breve</h3>
                            <p>Novo veículo chegando ao estoque</p>
                          </div>
                          <span className="inventory-row-badge inventory-row-badge-soon">
                            <Clock size={13} /> Em breve
                          </span>
                        </div>

                        <p className="inventory-row-soon-text">
                          Estamos preparando este veículo para você. Em breve os detalhes
                          completos estarão disponíveis aqui.
                        </p>

                        <div className="inventory-row-actions">
                          <a
                            className="btn btn-primary"
                            href={createWhatsappLink(
                              'Olá! Quero ser avisado quando novos veículos entrarem no estoque do Via Shopping Car.',
                            )}
                            target="_blank"
                            rel="noreferrer"
                          >
                            Quero ser avisado
                          </a>
                        </div>
                      </div>

                      <div className="inventory-row-contact">
                        <strong>Em breve</strong>
                        <h4>Disponível em breve</h4>
                        <p>Aguarde novidades</p>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="inventory-browser-empty">
                  <p>Nenhum veículo encontrado com esses refinamentos.</p>
                  <button type="button" className="btn btn-primary" onClick={handleResetFilters}>
                    Limpar filtros
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

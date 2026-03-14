import { useMemo, useState } from 'react'
import {
  ArrowRight,
  CalendarDays,
  CarFront,
  Fuel,
  Gauge,
  Search,
  SlidersHorizontal,
} from 'lucide-react'
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom'
import {
  createWhatsappLink,
  formatCurrency,
  mapsLink,
  vehicles,
  type Vehicle,
} from '../site-data'

type InventorySort = 'recent' | 'price-low' | 'price-high' | 'km-low'

export function InventoryPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const [keyword, setKeyword] = useState('')
  const [brand, setBrand] = useState(searchParams.get('brand') ?? '')
  const [model, setModel] = useState(searchParams.get('model') ?? '')
  const [store, setStore] = useState('')
  const [year, setYear] = useState(searchParams.get('yearFrom') ?? '')
  const [transmission, setTransmission] = useState('')
  const [fuel, setFuel] = useState('')
  const [color, setColor] = useState('')
  const [sort, setSort] = useState<InventorySort>('recent')
  const [focusedVehicleId, setFocusedVehicleId] = useState<number | null>(() => {
    const focus = searchParams.get('focus')
    return focus ? Number(focus) : null
  })
  const [comparedVehicleIds, setComparedVehicleIds] = useState<number[]>([])

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
    () => [...new Set(vehicles.map((vehicle) => vehicle.store))].sort(),
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
      const matchesTransmission = !transmission || vehicle.transmission === transmission
      const matchesFuel = !fuel || vehicle.fuel === fuel
      const matchesColor = !color || vehicle.color === color

      return (
        matchesKeyword &&
        matchesBrand &&
        matchesModel &&
        matchesStore &&
        matchesYear &&
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
  }, [brand, color, fuel, keyword, model, sort, store, transmission, year])

  const comparedVehicles = useMemo(
    () => vehicles.filter((vehicle) => comparedVehicleIds.includes(vehicle.id)),
    [comparedVehicleIds],
  )

  function handleResetFilters() {
    setKeyword('')
    setBrand('')
    setModel('')
    setStore('')
    setYear('')
    setTransmission('')
    setFuel('')
    setColor('')
    setSort('recent')
    setComparedVehicleIds([])
    setFocusedVehicleId(null)
  }

  function handleToggleCompare(vehicleId: number) {
    setComparedVehicleIds((current) => {
      if (current.includes(vehicleId)) {
        return current.filter((item) => item !== vehicleId)
      }

      if (current.length === 2) {
        return [...current.slice(1), vehicleId]
      }

      return [...current, vehicleId]
    })
  }

  function handleSelectVehicle(vehicleId: number) {
    setFocusedVehicleId(vehicleId)
  }

  function handleBackToHome() {
    navigate({
      pathname: '/',
      hash: '#estoque',
    })
  }

  return (
    <main className="inventory-page">
      <section className="inventory-page-hero">
        <div className="inventory-page-hero-overlay" />
        <div className="container inventory-page-hero-content">
          <p className="inventory-page-hero-icon">
            <CarFront size={24} />
          </p>
          <h1>Estoque de veículos</h1>
          <p>Uma página dedicada ao showroom com a mesma lógica da referência, em uma leitura mais atual.</p>
        </div>
      </section>

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
                <span>carros encontrados</span>
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
                  <strong>{filteredVehicles.length} oportunidades</strong>
                  <span>selecione até dois veículos para comparar lado a lado</span>
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
                  <button
                    type="button"
                    className="btn btn-secondary inventory-compare-trigger"
                    disabled={comparedVehicles.length < 2}
                  >
                    Comparar {comparedVehicles.length}/2
                  </button>
                </div>
              </div>

              {comparedVehicles.length > 0 && (
                <div className="inventory-compare-panel">
                  {comparedVehicles.map((vehicle) => (
                    <div key={vehicle.id} className="inventory-compare-card">
                      <strong>
                        {vehicle.brand} {vehicle.model}
                      </strong>
                      <span>{formatCurrency(vehicle.price)}</span>
                      <p>
                        {vehicle.year} • {vehicle.km.toLocaleString('pt-BR')} km • {vehicle.color}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {filteredVehicles.length > 0 ? (
                <div className="inventory-list">
                  {filteredVehicles.map((vehicle) => {
                    const isFocused = focusedVehicleId === vehicle.id
                    const isCompared = comparedVehicleIds.includes(vehicle.id)

                    return (
                      <InventoryRow
                        key={vehicle.id}
                        isCompared={isCompared}
                        isFocused={isFocused}
                        vehicle={vehicle}
                        onInterested={() =>
                          window.open(
                            createWhatsappLink(
                              `Olá! Tenho interesse no ${vehicle.brand} ${vehicle.model} ${vehicle.year}.`,
                            ),
                            '_blank',
                            'noopener,noreferrer',
                          )
                        }
                        onSelect={() => handleSelectVehicle(vehicle.id)}
                        onToggleCompare={() => handleToggleCompare(vehicle.id)}
                      />
                    )
                  })}
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

type InventoryRowProps = {
  vehicle: Vehicle
  isCompared: boolean
  isFocused: boolean
  onInterested: () => void
  onSelect: () => void
  onToggleCompare: () => void
}

function InventoryRow({
  vehicle,
  isCompared,
  isFocused,
  onInterested,
  onSelect,
  onToggleCompare,
}: InventoryRowProps) {
  const detailParams = createSearchParams({
    focus: String(vehicle.id),
  })

  return (
    <article className={`inventory-row${isFocused ? ' is-focused' : ''}`}>
      <button type="button" className="inventory-row-media" onClick={onSelect}>
        <img src={vehicle.image} alt={`${vehicle.brand} ${vehicle.model}`} />
        <span>{vehicle.photos} fotos</span>
      </button>

      <div className="inventory-row-content">
        <div className="inventory-row-heading">
          <div>
            <h3>
              {vehicle.year} {vehicle.brand} {vehicle.model}
            </h3>
            <p>{vehicle.subtitle}</p>
          </div>
          {isFocused && <span className="inventory-row-badge">Selecionado</span>}
        </div>

        <div className="inventory-row-specs">
          <span>
            <Gauge size={16} />
            {vehicle.km.toLocaleString('pt-BR')} km
          </span>
          <span>
            <CalendarDays size={16} />
            {vehicle.color}
          </span>
          <span>
            <CarFront size={16} />
            {vehicle.transmission}
          </span>
          <span>
            <Fuel size={16} />
            {vehicle.fuel}
          </span>
        </div>

        <div className="inventory-row-actions">
          <button type="button" className="btn btn-secondary" onClick={onSelect}>
            Ver detalhes
          </button>
          <button type="button" className="btn btn-primary" onClick={onInterested}>
            Estou interessado
          </button>
        </div>

        {isFocused && (
          <div className="inventory-row-detail">
            <p>{vehicle.description}</p>
            <a className="inventory-inline-link" href={`/estoque?${detailParams.toString()}`}>
              Manter este veículo em foco <ArrowRight size={15} />
            </a>
          </div>
        )}
      </div>

      <div className="inventory-row-contact">
        <strong>{formatCurrency(vehicle.price)}</strong>
        <h4>Consulte-nos</h4>
        <p>{vehicle.store}</p>
        <span>{vehicle.city}</span>
        <a href={`tel:${vehicle.phone.replace(/\D/g, '')}`}>{vehicle.phone}</a>
        <a href={mapsLink} target="_blank" rel="noreferrer">
          Ver no mapa
        </a>
        <button
          type="button"
          className={`inventory-compare${isCompared ? ' is-active' : ''}`}
          onClick={onToggleCompare}
        >
          {isCompared ? 'Na comparação' : 'Comparar'}
        </button>
      </div>
    </article>
  )
}

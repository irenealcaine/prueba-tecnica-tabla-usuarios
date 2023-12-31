
import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import { SortBy, type User } from './types.d'
import { UsersList } from './Components/UsersList'

function App() {

  const [users, setUsers] = useState<User[]>([])
  const [showColors, setShowColors] = useState(false)
  // const [sortByCountry, setSortByCountry] = useState(false)
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE)
  const [filterCountry, setFilterCountry] = useState<string | null>(null)

  const originalUsers = useRef<User[]>([])

  const toggleColors = () => {
    setShowColors(!showColors)
  }

  const toggleSortByCountry = () => {
    // setSortByCountry(!sortByCountry)

    const newSortingValue = sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE
    setSorting(newSortingValue)
  }

  const handleReset = () => {
    setUsers(originalUsers.current)
  }

  const handleDelete = (email: string) => {
    const filteredUsers = users.filter((user) => user.email !== email)
    setUsers(filteredUsers)
  }

  const handleChangeSort = (sort: SortBy) => {
    setSorting(sort)
  }

  useEffect(() => {

    fetch("https://randomuser.me/api?results=100")
      .then(async res => await res.json())
      .then(res => {
        const results = res.results || [];
        setUsers(results);
        originalUsers.current = results;
      })
      .catch(
        err => console.error("No se pudieron obtener los datos: " + err)
      )
  }, [])

  const filteredUsers = useMemo(() => {
    return filterCountry !== null && filterCountry.length > 0
      ? users.filter((user => {
        return user.location.country.toLowerCase().includes(filterCountry.toLowerCase())
      }))
      : users
  }, [users, filterCountry])

  // const sortedUsers = sortByCountry
  //   ? [...users].sort((a, b) => {
  //     return a.location.country.localeCompare(b.location.country)
  //   })
  //   : users

  // const sortedUsers = sortByCountry
  //   ? filteredUsers.toSorted((a, b) => {
  //     return a.location.country.localeCompare(b.location.country)
  //   })
  //   : filteredUsers

  const sortedUsers = useMemo(() => {

    if (sorting === SortBy.NONE) return filteredUsers
    if (sorting === SortBy.COUNTRY) {
      return filteredUsers.toSorted(
        (a, b) => a.location.country.localeCompare(b.location.country)
      )
    }
    if (sorting === SortBy.NAME) {
      return filteredUsers.toSorted(
        (a, b) => a.name.first.localeCompare(b.name.first)
      )
    }
    if (sorting === SortBy.LAST) {
      return filteredUsers.toSorted(
        (a, b) => a.name.last.localeCompare(b.name.last)
      )
    }

    // return sorting === SortBy.COUNTRY
    //   ? filteredUsers.toSorted((a, b) => {
    //     return a.location.country.localeCompare(b.location.country)
    //   })
    //   : filteredUsers
  }, [filteredUsers, sorting])


  return (
    <div className='App'>
      <h1>Prueba técnica</h1>
      <header>
        <button onClick={toggleColors}>
          Colorea filas
        </button>
        <button onClick={toggleSortByCountry}>
          {sorting === SortBy.COUNTRY ? "No  ordenar por país" : "Ordenar por país"}
        </button>

        <button onClick={handleReset}>
          Resetear
        </button>

        <input type="text" placeholder='Filtrar por pais' onChange={(e) => {
          setFilterCountry(e.target.value)
        }

        } />
      </header>
      <main>

        <UsersList changeSorting={handleChangeSort} deleteUser={handleDelete} showColors={showColors} users={sortedUsers} />
      </main>
    </div>
  )
}

export default App

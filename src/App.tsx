
import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import { type User } from './types.d'
import { UsersList } from './Components/UsersList'

function App() {

  const [users, setUsers] = useState<User[]>([])
  const [showColors, setShowColors] = useState(false)
  const [sortByCountry, setSortByCountry] = useState(false)
  const [filterCountry, setFilterCountry] = useState<string | null>(null)

  const originalUsers = useRef<User[]>([])

  const toggleColors = () => {
    setShowColors(!showColors)
  }

  const toggleSortByCountry = () => {
    setSortByCountry(!sortByCountry)
  }

  const handleReset = () => {
    setUsers(originalUsers.current)
  }

  const handleDelete = (email: string) => {
    const filteredUsers = users.filter((user) => user.email !== email)
    setUsers(filteredUsers)
  }

  useEffect(() => {

    fetch("https://randomuser.me/api?results=100")
      .then(async res => await res.json())
      .then(res => {
        setUsers(res.results)
        originalUsers.current = res.results
      })
      .catch(
        err => console.error("No se pudieron obtener los datos: " + err)
      )
  }, [])

  const filteredUsers = useMemo(() => {
    console.log("AAAAAAAA")
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
    console.log("EEEEEEEEE")

    return sortByCountry
      ? filteredUsers.toSorted((a, b) => {
        return a.location.country.localeCompare(b.location.country)
      })
      : filteredUsers
  }, [filteredUsers, sortByCountry])


  return (
    <div className='App'>
      <h1>Prueba técnica</h1>
      <header>
        <button onClick={toggleColors}>
          Colorea filas
        </button>
        <button onClick={toggleSortByCountry}>
          Ordenar por pais
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

        <UsersList deleteUser={handleDelete} showColors={showColors} users={sortedUsers} />
      </main>
    </div>
  )
}

export default App

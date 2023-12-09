import { SortBy, type User } from "../types.d"

interface Props {
  changeSorting: (sort: SortBy) => void
  deleteUser: (email: string) => void
  showColors: boolean,
  users: User[]
}

export function UsersList({ changeSorting, deleteUser, showColors, users }: Props) {
  return (
    <table>
      <thead>
        <tr>
          <th>Foto</th>
          <th onClick={() => changeSorting(SortBy.NAME)}>Nombre</th>
          <th onClick={() => changeSorting(SortBy.LAST)}>Apellido</th>
          <th onClick={() => changeSorting(SortBy.COUNTRY)}>País</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody className={showColors ? "colored-table" : ""}>
        {users.map((user) => {

          // const backgoundColor = index % 2 === 0 ? "#333" : "#555"
          // const color = showColors ? backgoundColor : "transparent"

          return (
            <tr key={user.email}
            // style={{ backgroundColor: color }}
            >
              <td><img src={user.picture.thumbnail} alt="" /></td>
              <td>{user.name.first}</td>
              <td>{user.name.last}</td>
              <td>{user.location.country}</td>
              <td>
                <button onClick={() => {
                  deleteUser(user.email)
                }}>Eliminar</button>
              </td>
            </tr>
          )


        })}
      </tbody>
    </table>
  )
}

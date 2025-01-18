
type Props = {
  title: string;
  headers: string[];
  firstColumn: string[] | number[];
  secondColumn?: string[] | number[];
}

const Table = ({ title, headers, firstColumn, secondColumn = [] }: Props) => {
  return (
    <div className="w-11/12 md:w-10/12 border-b border-bottom border-primary pb-6">
      <h3 className="font-bold text-2xl !mb-5">{title}</h3>
      <div className="overflow-x-auto max-h-80">
        <table className="table table-xs table-pin-rows">
          <thead>
            <tr className="bg-base-200 text-base-300">
              {headers.map((item, index) => (
                <th key={index}>{item}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {firstColumn.map((item, index) => (
              <tr key={index} className="hover">
                <td>{item}</td>
                {secondColumn.length > 0 && <td>{secondColumn[index]}</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Table
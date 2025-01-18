
type Props = {
  title: string;
  detail: {
    title: string;
    data: string | number | undefined;
  }[]
}

const Summary = ({ title, detail }: Props) => {
  return (
    <div className="w-11/12 md:w-10/12 border-b border-bottom border-primary pb-6">
      <h3 className="font-bold text-2xl !mb-5">{title}</h3>
      <div className="flex flex-wrap justify-between w-full gap-3">
        {detail.map((item, index) => (
          <p key={index} className="w-5/12 font-medium">{item.title}<span className="font-semibold bg-primary text-base-100 py-1 px-2 rounded">{item.data}</span></p>
        ))}
      </div>
    </div>
  )
}

export default Summary
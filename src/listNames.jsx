export function ListOfNames({ list }) {
  return (
    list.map((item, index, items) => {
      if (index + 1 === items.length || items.length === 1)
        return <span key={index}>{item} </span>;
      return <span key={index}>{item} , </span>;
    }) ?? "none"
  );
}

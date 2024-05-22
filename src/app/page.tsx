import Image from "next/image";

type dataPost = {"Title": string, "IsComplete": boolean}
var dados = {};


async function getData() {
  const res = await fetch('https://caiohalbert.bsite.net/todoitems')
  
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
 
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
  dados = res;
  return res.json()
}

async function postData(data:dataPost){
  const res = await fetch('https://caiohalbert.bsite.net/todoitems', {
    method:'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then((response) => response.json())
  .then((data) => console.log(data));
}
 
export default async function Page() {
  var dados:dataPost = {Title:"lavar roupa", IsComplete:false}
  postData(dados)
  const data = await getData();
  console.log(data)
  return (
    <main>
      <h1>
        {data.title}
        
        <form className="flex flex-col justify-between h-8 w-80">
          <input className="mt-5 " type="text"/>
          <input className="mt-5 " type="text"/>
          <button className="mt-5 " type="submit">Criar tarefa</button>
        </form>
      </h1>
    </main>
  )
    
}
